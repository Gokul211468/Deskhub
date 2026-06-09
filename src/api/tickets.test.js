import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./client.js", () => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  del: vi.fn(),
  getWithTotal: vi.fn(),
}));

import {
  buildQueryString,
  listTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  listComments,
  addComment,
} from "./tickets.js";
import { get, post, patch, del, getWithTotal } from "./client.js";

describe("tickets — buildQueryString", () => {
  it("returns empty string for empty state (only default sort/order)", () => {
    const qs = buildQueryString({});
    expect(qs).toBe("_sort=createdAt&_order=desc");
  });

  it("includes trimmed status and priority", () => {
    const qs = buildQueryString({
      status: "  open  ",
      priority: " urgent ",
    });
    expect(qs).toContain("status=open");
    expect(qs).toContain("priority=urgent");
  });

  it("omits status when empty after trim", () => {
    const qs = buildQueryString({ status: "   " });
    expect(qs).not.toContain("status=");
  });

  it("includes assignedTo when assignee is set", () => {
    expect(buildQueryString({ assignee: 3 })).toContain("assignedTo=3");
    expect(buildQueryString({ assignee: "7" })).toContain("assignedTo=7");
  });

  it("omits assignedTo when assignee is null, undefined, or empty string", () => {
    expect(buildQueryString({ assignee: null })).not.toContain("assignedTo");
    expect(buildQueryString({ assignee: undefined })).not.toContain("assignedTo");
    expect(buildQueryString({ assignee: "" })).not.toContain("assignedTo");
  });

  it("includes search as q when trimmed non-empty", () => {
    expect(buildQueryString({ search: " login " })).toContain("q=login");
  });

  it("uses sortBy when sort is missing", () => {
    const qs = buildQueryString({ sortBy: "title", order: "asc" });
    expect(qs).toContain("_sort=title");
    expect(qs).toContain("_order=asc");
  });

  it("includes page and limit when present", () => {
    const qs = buildQueryString({ page: 2, limit: 20 });
    expect(qs).toContain("_page=2");
    expect(qs).toContain("_limit=20");
  });
});


describe("tickets — API wrappers (mocked client)", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it("listTickets calls get with /tickets when not paginated", async () => {
      get.mockResolvedValue([]);
      const result = await listTickets({});
      expect(get).toHaveBeenCalledWith(
        "/tickets?_sort=createdAt&_order=desc"
      );
      expect(getWithTotal).not.toHaveBeenCalled();
      expect(result).toEqual({ items: [], total: 0 });
    });
  
    it("listTickets uses getWithTotal when page and limit are positive", async () => {
      getWithTotal.mockResolvedValue({ items: [{ id: 1 }], total: 99 });
      const result = await listTickets({ page: 1, limit: 10, status: "open" });
      expect(getWithTotal).toHaveBeenCalledTimes(1);
      expect(get).not.toHaveBeenCalled();
      const path = getWithTotal.mock.calls[0][0];
      expect(path).toMatch(/^\/tickets\?/);
      expect(path).toContain("status=open");
      expect(path).toContain("_page=1");
      expect(path).toContain("_limit=10");
      expect(result.items).toEqual([{ id: 1 }]);
      expect(result.total).toBe(99);
    });
  
    it("listTickets falls back to get when page is 0 (not paginated branch)", async () => {
      get.mockResolvedValue([]);
      await listTickets({ page: 0, limit: 10 });
      expect(getWithTotal).not.toHaveBeenCalled();
      expect(get).toHaveBeenCalled();
    });
  
    it("getTicket calls get with encoded id", async () => {
      get.mockResolvedValue({ id: "a/b" });
      await getTicket("a/b");
      expect(get).toHaveBeenCalledWith("/tickets/a%2Fb");
    });
  
    it("createTicket posts merged body with timestamps", async () => {
      post.mockResolvedValue({ id: 1 });
      const iso = "2020-01-01T00:00:00.000Z";
      const spy = vi.spyOn(Date.prototype, "toISOString").mockReturnValue(iso);
      try {
        await createTicket({ title: "Hi" });
      } finally {
        spy.mockRestore();
      }
      expect(post).toHaveBeenCalledWith(
        "/tickets",
        expect.objectContaining({
          title: "Hi",
          createdAt: iso,
          updatedAt: iso,
        })
      );
    });
  
    it("updateTicket patches with encoded id and updatedAt", async () => {
      patch.mockResolvedValue({ id: 2 });
      const iso = "2020-06-01T12:00:00.000Z";
      const spy = vi.spyOn(Date.prototype, "toISOString").mockReturnValue(iso);
      try {
        await updateTicket("2", { status: "closed" });
      } finally {
        spy.mockRestore();
      }
      expect(patch).toHaveBeenCalledWith(
        "/tickets/2",
        expect.objectContaining({ status: "closed", updatedAt: iso })
      );
    });
  
    it("deleteTicket calls del with encoded id", async () => {
      del.mockResolvedValue(undefined);
      await deleteTicket("x y");
      expect(del).toHaveBeenCalledWith("/tickets/x%20y");
    });
  
    it("listComments calls get with ticketId query", async () => {
      get.mockResolvedValue([]);
      await listComments("5");
      expect(get).toHaveBeenCalledWith("/comments?ticketId=5");
    });
  
    it("addComment posts body with createdAt", async () => {
      post.mockResolvedValue({ id: 9 });
      const iso = "2021-01-01T00:00:00.000Z";
      const spy = vi.spyOn(Date.prototype, "toISOString").mockReturnValue(iso);
      try {
        await addComment({ ticketId: 1, content: "ok" });
      } finally {
        spy.mockRestore();
      }
      expect(post).toHaveBeenCalledWith(
        "/comments",
        expect.objectContaining({
          ticketId: 1,
          content: "ok",
          createdAt: iso,
        })
      );
    });
  });