/**
 * modules/ticketDetail.js — Ticket Detail Page
 *
 * Reads ticket id from URL (e.g., ticket.html?id=12), shows full info,
 * allows status/priority/assignee changes and comment thread.
 *
 * Expected HTML elements (you design these):
 *   - <h1 id="ticket-title">, <p id="ticket-description">, etc.
 *   - <select id="status-select">    — change status
 *   - <select id="priority-select">  — change priority
 *   - <select id="assignee-select">  — change assignee
 *   - <ul id="comments-list">        — render existing comments
 *   - <textarea id="new-comment">    — add a comment
 *   - <button id="add-comment-btn">
 *   - <button id="delete-btn">       — delete ticket (with confirmation)
 *
 * TODO:
 *   [ ] initTicketDetail()
 *       - parse id from URL (URLSearchParams)
 *       - load ticket + comments in parallel (Promise.all)
 *       - render everything
 *       - wire up status/priority/assignee changes → updateTicket
 *       - wire up add-comment → addComment + re-render comments
 *       - wire up delete with confirm() → deleteTicket → redirect
 *   [ ] Show user-friendly error if ticket id is invalid or missing
 *   [ ] Optional: optimistic update on status changes (stretch goal)
 */

// import { getTicket, updateTicket, deleteTicket, listComments, addComment } from "../api/tickets.js";
// import { getCurrentUser, requireAuth } from "../api/auth.js";
// import { showToast } from "./ui.js";

// export async function initTicketDetail() {
//   requireAuth();
//   // TODO
// }

// function renderTicket(ticket, users) { /* TODO */ }
// function renderComments(comments, users) { /* TODO */ }


/**
 * modules/ticketDetail.js — Ticket detail page
 *
 * Expects ticket-detail.html with ids documented in that file.
 */

import {
    getTicket,
    updateTicket,
    deleteTicket,
    listComments,
    addComment,
  } from "../api/tickets.js";
  import { get } from "../api/client.js";
  import { getCurrentUser } from "../api/auth.js";
  import { requireAuth, initLogout } from "./auth.js";
  import { formatDateTime } from "../utils/formatDate.js";
  import { showToast, confirmDialog } from "./ui.js";
  
  let usersCache = null;
  let usersLoadPromise = null;
  
  async function loadUsersOnce() {
    if (usersCache) return usersCache;
    if (!usersLoadPromise) {
      usersLoadPromise = get("/users")
        .then((users) => {
          usersCache = Array.isArray(users) ? users : [];
          return usersCache;
        })
        .finally(() => {
          usersLoadPromise = null;
        });
    }
    return usersLoadPromise;
  }
  
  function userNameMap(users) {
    return new Map(users.map((u) => [u.id, u.name]));
  }
  
  function parseTicketId() {
    const idStr = new URLSearchParams(window.location.search).get("id");
    if (idStr == null || idStr === "") return null;
    const n = Number(idStr);
    if (!Number.isInteger(n) || n < 1) return null;
    return n;
  }
  
  function setError(message) {
    const text = document.getElementById("error-text");
    const box = document.getElementById("error");
    if (text) text.textContent = message;
    if (box) box.hidden = false;
  }
  
  function renderTicket(ticket) {
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val == null || val === "" ? "—" : String(val);
    };
  
    setText("ticket-id", `#${ticket.id}`);
    document.title = `DeskHub — ${ticket.title ?? "Ticket"}`;
  
    const title = document.getElementById("ticket-title");
    if (title) title.textContent = ticket.title ?? "";
  
    setText("ticket-customer", ticket.customerName);
    setText("ticket-customer-email", ticket.customerEmail);
    setText("ticket-category", ticket.category);
    setText("ticket-created", formatDateTime(ticket.createdAt));
    setText("ticket-updated", formatDateTime(ticket.updatedAt));
  
    const desc = document.getElementById("ticket-description");
    if (desc) desc.textContent = ticket.description ?? "—";
  
    const statusEl = document.getElementById("status-select");
    if (statusEl) statusEl.value = ticket.status ?? "open";
  
    const priEl = document.getElementById("priority-select");
    if (priEl) priEl.value = ticket.priority ?? "medium";
  
    const asEl = document.getElementById("assignee-select");
    if (asEl) {
      const v = ticket.assignedTo == null ? "" : String(ticket.assignedTo);
      if ([...asEl.options].some((o) => o.value === v)) asEl.value = v;
      else asEl.value = "";
    }
  }
  
  function fillAssigneeSelect(selectEl, users, assignedTo) {
    const want = assignedTo == null ? "" : String(assignedTo);
    selectEl.replaceChildren();
  
    const un = document.createElement("option");
    un.value = "";
    un.textContent = "Unassigned";
    selectEl.appendChild(un);
  
    for (const u of users) {
      const o = document.createElement("option");
      o.value = String(u.id);
      o.textContent = u.name;
      selectEl.appendChild(o);
    }
  
    if (want && [...selectEl.options].some((o) => o.value === want)) {
      selectEl.value = want;
    } else {
      selectEl.value = "";
    }
  }
  
  function renderComments(comments, nameByUserId) {
    const ul = document.getElementById("comments-list");
    if (!ul) return;
  
    ul.replaceChildren();
    const sorted = [...comments].sort((a, b) =>
      String(a.createdAt ?? "").localeCompare(String(b.createdAt ?? ""))
    );
  
    for (const c of sorted) {
      const li = document.createElement("li");
      li.className = "comment-item";
  
      const head = document.createElement("div");
      head.className = "comment-head";
      const author = nameByUserId.get(c.authorId) ?? `User #${c.authorId}`;
      head.textContent = `${author} · ${formatDateTime(c.createdAt)}`;
  
      const body = document.createElement("p");
      body.className = "comment-body";
      body.textContent = c.content ?? "";
  
      li.append(head, body);
      ul.appendChild(li);
    }
  }
  
  export async function initTicketDetail() {
    if (!requireAuth()) return;
    initLogout("#logout-btn");
  
    const ticketId = parseTicketId();
    const loading = document.getElementById("loading");
    const errBox = document.getElementById("error");
    const shell = document.getElementById("ticket-shell");
    const commentsShell = document.getElementById("comments-shell");
  
    if (ticketId == null) {
      setError("Missing or invalid ticket id. Open a ticket from the tickets list.");
      if (loading) loading.hidden = true;
      return;
    }
  
    async function loadAll() {
      if (loading) loading.hidden = false;
      if (errBox) errBox.hidden = true;
      if (shell) shell.hidden = true;
      if (commentsShell) commentsShell.hidden = true;
  
      try {
        const [users, ticket, commentsRaw] = await Promise.all([
            loadUsersOnce(),
            getTicket(ticketId),
            listComments(ticketId),
          ]);
  
        const nameByUserId = userNameMap(users);
        const comments = Array.isArray(commentsRaw) ? commentsRaw : [];
  
        const assigneeSelect = document.getElementById("assignee-select");
        if (assigneeSelect) fillAssigneeSelect(assigneeSelect, users, ticket.assignedTo);
  
        renderTicket(ticket);
        renderComments(comments, nameByUserId);
  
        if (shell) shell.hidden = false;
        if (commentsShell) commentsShell.hidden = false;
      } catch (err) {
        console.error(err);
        setError(err?.message || "Could not load this ticket.");
      } finally {
        if (loading) loading.hidden = true;
      }
    }
  
    await loadAll();
  
    const statusSelect = document.getElementById("status-select");
    const prioritySelect = document.getElementById("priority-select");
    const assigneeSelect = document.getElementById("assignee-select");
  
    async function patchTicket(partial) {
      try {
        await updateTicket(ticketId, partial);
        await loadAll();
        if (Object.prototype.hasOwnProperty.call(partial, "status")) {
          showToast("Status updated", "success");
        }
        if (Object.prototype.hasOwnProperty.call(partial, "priority")) {
          showToast("Priority updated", "success");
        }
        if (Object.prototype.hasOwnProperty.call(partial, "assignedTo")) {
            showToast("Assignee updated", "success");
          }
      } catch (err) {
        console.error(err);
        window.alert(err?.message || "Update failed.");
        await loadAll();
      }
    }
  
    statusSelect?.addEventListener("change", () => {
      patchTicket({ status: statusSelect.value });
    });
  
    prioritySelect?.addEventListener("change", () => {
      patchTicket({ priority: prioritySelect.value });
    });
  
    assigneeSelect?.addEventListener("change", () => {
      const v = assigneeSelect.value;
      patchTicket({
        assignedTo: v === "" ? null : Number(v),
      });
    });
  
    document.getElementById("add-comment-btn")?.addEventListener("click", async () => {
      const ta = document.getElementById("new-comment");
      const content = (ta?.value ?? "").trim();
      if (!content) return;
  
      const me = getCurrentUser();
      if (!me?.id) {
        window.alert("You must be signed in to comment.");
        return;
      }
  
      try {
        await addComment({
          ticketId,
          authorId: me.id,
          content,
        });
        if (ta) ta.value = "";
        await loadAll();
      } catch (err) {
        console.error(err);
        window.alert(err?.message || "Could not post comment.");
      }
    });
  
    document.getElementById("delete-btn")?.addEventListener("click", async () => {
      const ok = await confirmDialog(
        "Delete this ticket permanently? This cannot be undone.",
        {
          title: "Delete ticket",
          okText: "Delete",
          cancelText: "Cancel",
        }
      );
      if (!ok) return;
      try {
        await deleteTicket(ticketId);
        showToast("Ticket deleted", "success");
        window.location.href = "tickets.html";
      } catch (err) {
        console.error(err);
        showToast(err?.message || "Delete failed.", "error");
      }
    });
  }