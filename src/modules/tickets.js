/**
 * modules/tickets.js — Tickets List Page
 *
 * The big one. Combines fetch + render + search + filter + sort + paginate.
 *
 * Expected HTML elements (you design these in public/tickets.html):
 *   - <input id="search-input">              search box
 *   - <select id="filter-status">            status dropdown
 *   - <select id="filter-priority">          priority dropdown
 *   - <select id="filter-assignee">          assignee dropdown (load options from /users)
 *   - <select id="sort-by">                  sort dropdown
 *   - <table id="tickets-table"> (or list)   render rows here
 *   - <div id="pagination">                  prev / page numbers / next
 *   - <button id="new-ticket-btn">           opens create modal
 *   - <div id="loading">, <div id="error">   states
 *
 * Suggested local state shape:
 *   const state = {
 *     search: "",
 *     status: "",        // "" = all
 *     priority: "",
 *     assignee: "",
 *     sortBy: "createdAt",
 *     order: "desc",
 *     page: 1,
 *     limit: 10,
 *     items: [],
 *     total: 0,
 *     loading: false,
 *   };
 *
 * TODO:
 *   [ ] initTicketsList()
 *       - read filters/page from URL (so refresh keeps state — stretch goal)
 *       - wire up all event listeners (search uses debounce!)
 *       - call refresh() on every change
 *   [ ] refresh() — fetch with current filters and re-render
 *   [ ] renderTable(items)
 *   [ ] renderPagination(total, page, limit)
 *   [ ] openCreateModal() — show form, on submit call api.createTicket, then refresh
 */

// import { listTickets } from "../api/tickets.js";
// import { debounce } from "../utils/debounce.js";
// import { showToast, showLoader, hideLoader } from "./ui.js";
// import { requireAuth } from "./auth.js";

// const state = {
//   search: "", status: "", priority: "", assignee: "",
//   sortBy: "createdAt", order: "desc",
//   page: 1, limit: 10,
//   items: [], total: 0, loading: false,
// };



// async function refresh() { /* TODO */ }
// function renderTable(items) { /* TODO */ }
// function renderPagination(total, page, limit) { /* TODO */ }
// function openCreateModal() { /* TODO */ }



import { listTickets } from "../api/tickets.js";
import { get } from "../api/client.js";
import { debounce } from "../utils/debounce.js";
import { requireAuth, initLogout } from "./auth.js";
import { formatDate } from "../utils/formatDate.js";

const state = {
  search: "",
  status: "",
  priority: "",
  assignee: "",
  sortBy: "createdAt",
  order: "desc",
  page: 1,
  limit: 10,
  items: [],
  total: 0,
};

let usersCache = null;
let usersLoadPromise = null;
let userMap = new Map();

function setTicketsErrorMessage(err) {
  const el = document.getElementById("error-text");
  if (!el) return;

  const msg = err?.message ?? "";
  const isNetwork =
    err?.name === "NetworkError" ||
    /network error|failed to fetch|load failed/i.test(msg);

  el.textContent = isNetwork
    ? "Cannot reach the API. Make sure json-server is running (npm run dev or npm run api on port 3001), then retry."
    : msg || "Something went wrong loading tickets.";
}

function readFiltersFromUrl() {
  const sp = new URLSearchParams(window.location.search);

  const q = sp.get("q");
  if (q != null) state.search = q.trim();

  const st = sp.get("status");
  if (st != null) state.status = st;

  const pr = sp.get("priority");
  if (pr != null) state.priority = pr;

  const as = sp.get("assignee");
  if (as != null) state.assignee = as;

  const so = sp.get("sort");
  if (so != null) state.sortBy = so;

  const pg = sp.get("page");
  if (pg != null) {
    const n = Number.parseInt(pg, 10);
    if (Number.isFinite(n) && n >= 1) state.page = n;
  }
}

function applyStateToDom(searchInput, statusEl, priorityEl, assigneeEl, sortEl) {
  searchInput.value = state.search;
  statusEl.value = state.status;
  priorityEl.value = state.priority;
  const sortOk = [...sortEl.options].some((o) => o.value === state.sortBy);
  if (!sortOk) state.sortBy = "createdAt";
  sortEl.value = state.sortBy;
  assigneeEl.value = state.assignee;
}

function syncUrlFromState() {
  const params = new URLSearchParams();

  if (state.search) params.set("q", state.search);
  if (state.status) params.set("status", state.status);
  if (state.priority) params.set("priority", state.priority);
  if (state.assignee) params.set("assignee", state.assignee);
  if (state.sortBy && state.sortBy !== "createdAt") params.set("sort", state.sortBy);
  if (state.page > 1) params.set("page", String(state.page));

  const qs = params.toString();
  const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  if (next !== `${window.location.pathname}${window.location.search}`) {
    history.replaceState(null, "", next);
  }
}

async function loadAssigneeOptions() {
  const select = document.getElementById("filter-assignee");
  if (!select) return;

  const users = await loadUsersOnce();

  const current = state.assignee;
  select.replaceChildren();

  const allOpt = document.createElement("option");
  allOpt.value = "";
  allOpt.textContent = "All Assignees";
  select.appendChild(allOpt);

  for (const u of users) {
    const opt = document.createElement("option");
    opt.value = String(u.id);
    opt.textContent = u.name;
    select.appendChild(opt);
  }

  if (current && [...select.options].some((o) => o.value === current)) {
    select.value = current;
  } else {
    select.value = "";
    state.assignee = "";
  }
}


export function renderTable(items) {
  const tbody = document.getElementById("tickets-tbody");
  if (!tbody) return;

  tbody.replaceChildren();

  if (!Array.isArray(items) || items.length === 0) {
    return;
  }

  const frag = document.createDocumentFragment();

  for (const ticket of items) {
    const tr = document.createElement("tr");
  
    const tdId = document.createElement("td");
    tdId.textContent = String(ticket.id ?? "");
  
    const tdTitle = document.createElement("td");
    const titleLink = document.createElement("a");
    titleLink.href = `ticket-detail.html?id=${encodeURIComponent(ticket.id)}`;
    titleLink.textContent = ticket.title ?? "";
    tdTitle.appendChild(titleLink);
  
    const tdCustomer = document.createElement("td");
    tdCustomer.textContent = ticket.customerName ?? "";
  
    const tdPriority = document.createElement("td");
    tdPriority.textContent = ticket.priority ?? "";
  
    const tdStatus = document.createElement("td");
    tdStatus.textContent = ticket.status ?? "";
  
    const tdAssignee = document.createElement("td");
    const aid = ticket.assignedTo;
    tdAssignee.textContent =
      aid == null ? "—" : userMap.get(aid) ?? `#${aid}`;
  
    const tdCreated = document.createElement("td");
    tdCreated.textContent = ticket.createdAt
      ? formatDate(ticket.createdAt)
      : "";
  
    tr.append(
      tdId,
      tdTitle,
      tdCustomer,
      tdPriority,
      tdStatus,
      tdAssignee,
      tdCreated
    );
    frag.appendChild(tr);
  }

  tbody.appendChild(frag);
}

function getTotalPages() {
  return Math.max(1, Math.ceil(state.total / state.limit));
}

/** Build page indices to show: compact when many pages. */
function getVisiblePageNumbers(current, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = new Set([1, totalPages, current, current - 1, current + 1]);
  for (const p of [...pages]) {
    if (p < 1 || p > totalPages) pages.delete(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    if (i > 0 && p - sorted[i - 1] > 1) out.push(null); // null = ellipsis gap
    out.push(p);
  }
  return out;
}

export function renderPagination() {
  const nav = document.getElementById("pagination");
  if (!nav) return;

  nav.replaceChildren();

  if (state.total === 0) return;

  const totalPages = getTotalPages();
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;

  const start = (state.page - 1) * state.limit + 1;
  const end = Math.min(state.page * state.limit, state.total);

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "pagination-btn pagination-prev";
  prev.textContent = "Prev";
  prev.disabled = state.page <= 1;
  prev.setAttribute("aria-label", "Previous page");

  const pagesWrap = document.createElement("div");
  pagesWrap.className = "pagination-pages";

  const nums = getVisiblePageNumbers(state.page, totalPages);
  let prevNum = null;
  for (const n of nums) {
    if (n === null) continue;
    if (prevNum !== null && n - prevNum > 1) {
      const ell = document.createElement("span");
      ell.className = "pagination-ellipsis";
      ell.textContent = "…";
      ell.setAttribute("aria-hidden", "true");
      pagesWrap.appendChild(ell);
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pagination-btn pagination-page";
    if (n === state.page) {
      btn.classList.add("is-current");
      btn.setAttribute("aria-current", "page");
    }
    btn.textContent = String(n);
    btn.dataset.page = String(n);
    btn.setAttribute("aria-label", `Page ${n}`);
    pagesWrap.appendChild(btn);
    prevNum = n;
  }

  const next = document.createElement("button");
  next.type = "button";
  next.className = "pagination-btn pagination-next";
  next.textContent = "Next";
  next.disabled = state.page >= totalPages;
  next.setAttribute("aria-label", "Next page");

  const summary = document.createElement("span");
  summary.className = "pagination-summary";
  summary.textContent = `Showing ${start}–${end} of ${state.total}`;

  nav.append(prev, pagesWrap, next, summary);
}

function wirePaginationOnce() {
  const nav = document.getElementById("pagination");
  if (!nav || nav.dataset.wired === "1") return;
  nav.dataset.wired = "1";

  nav.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const btn = t.closest("button.pagination-btn");
    if (!btn || btn.disabled) return;

    if (btn.classList.contains("pagination-prev")) {
      state.page -= 1;
      refresh();
      return;
    }
    if (btn.classList.contains("pagination-next")) {
      state.page += 1;
      refresh();
      return;
    }
    if (btn.classList.contains("pagination-page") && btn.dataset.page) {
      const p = Number(btn.dataset.page);
      if (!Number.isNaN(p) && p >= 1) {
        state.page = p;
        refresh();
      }
    }
  });
}

let ticketsPopstateWired = false;

/** Browser back/forward: re-read query string, sync form, reload list. */
function wirePopstateOnce() {
  if (ticketsPopstateWired) return;
  ticketsPopstateWired = true;

  window.addEventListener("popstate", () => {
    void (async () => {
      readFiltersFromUrl();
      const si = document.getElementById("search-input");
      const st = document.getElementById("filter-status");
      const pr = document.getElementById("filter-priority");
      const as = document.getElementById("filter-assignee");
      const so = document.getElementById("sort-by");
      if (!si || !st || !pr || !as || !so) return;

      applyStateToDom(si, st, pr, as, so);
      try {
        await loadAssigneeOptions();
      } catch {
        /* assignee list failed; still try to refresh tickets */
      }
      await refresh();
    })();
  });
}

export async function refresh() {
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const emptyEl = document.getElementById("empty-state");
  const table = document.getElementById("tickets-table");
  const pagEl = document.getElementById("pagination");
  const ticketsSection = document.querySelector(".tickets-section");

  if (emptyEl) emptyEl.hidden = true;
  if (loadingEl) loadingEl.hidden = false;
  if (errorEl) errorEl.hidden = true;
  if (ticketsSection) ticketsSection.classList.add("is-loading");

  if (table) table.setAttribute("aria-busy", "true");

  try {
    const { items, total } = await listTickets(state);

    state.items = Array.isArray(items) ? items : [];
    state.total = typeof total === "number" ? total : state.items.length;

    const totalPages = Math.max(1, Math.ceil(state.total / state.limit));
    if (state.total > 0 && state.page > totalPages) {
      state.page = totalPages;
      await refresh();
      return;
    }

    renderTable(state.items);

    if (emptyEl) emptyEl.hidden = state.items.length > 0;

    renderPagination();
    syncUrlFromState();
  } catch (err) {
      console.error(err);
      setTicketsErrorMessage(err);
      if (errorEl) errorEl.hidden = false;
      state.items = [];
      state.total = 0;
      renderTable([]);
      if (emptyEl) emptyEl.hidden = true; /* don't show "no tickets" when the API failed */
      if (pagEl) pagEl.replaceChildren();
  } finally {
      if (loadingEl) loadingEl.hidden = true;
      if (table) table.removeAttribute("aria-busy");
      if (ticketsSection) ticketsSection.classList.remove("is-loading");
  }
}

async function loadUsersOnce() {
  if (usersCache) return usersCache;
  if (!usersLoadPromise) {
    usersLoadPromise = get("/users")
      .then((users) => {
        usersCache = users;
        userMap = new Map(users.map((u) => [u.id, u.name]));
        return users;
      })
      .finally(() => {
        usersLoadPromise = null;
      });
  }
  return usersLoadPromise;
}

export async function initTicketsList() {
  if (!requireAuth()) return;

  initLogout("#logout-btn");

  const searchInput = document.getElementById("search-input");
  const statusEl = document.getElementById("filter-status");
  const priorityEl = document.getElementById("filter-priority");
  const assigneeEl = document.getElementById("filter-assignee");
  const sortEl = document.getElementById("sort-by");

  if (!searchInput || !statusEl || !priorityEl || !assigneeEl || !sortEl) {
    console.error("tickets.js: required DOM nodes missing");
    return;
  }

  readFiltersFromUrl();
  applyStateToDom(searchInput, statusEl, priorityEl, assigneeEl, sortEl);

  const errorRetry = document.getElementById("error-retry");
  if (errorRetry) {
    errorRetry.addEventListener("click", () => {
      refresh();
    });
  }

  wirePaginationOnce();
  wirePopstateOnce();

  const debouncedRefresh = debounce(refresh, 300);

  searchInput.addEventListener("input", () => {
    state.search = searchInput.value.trim();
    state.page = 1;
    debouncedRefresh();
  });

  statusEl.addEventListener("change", () => {
    state.status = statusEl.value;
    state.page = 1;
    refresh();
  });

  priorityEl.addEventListener("change", () => {
    state.priority = priorityEl.value;
    state.page = 1;
    refresh();
  });

  assigneeEl.addEventListener("change", () => {
    state.assignee = assigneeEl.value;
    state.page = 1;
    refresh();
  });

  sortEl.addEventListener("change", () => {
    state.sortBy = sortEl.value;
    state.page = 1;
    refresh();
  });


  try {
    await loadAssigneeOptions();
  } catch (e) {
    console.error(e);
    setTicketsErrorMessage(e);
    document.getElementById("error")?.removeAttribute("hidden");
    return; /* don't refresh tickets until users load, or clear cache and retry */
  }
  await refresh();
}