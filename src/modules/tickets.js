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

function syncStateFromDom() {
  const searchInput = document.getElementById("search-input");
  const statusEl = document.getElementById("filter-status");
  const priorityEl = document.getElementById("filter-priority");
  const assigneeEl = document.getElementById("filter-assignee");
  const sortEl = document.getElementById("sort-by");

  if (searchInput) state.search = searchInput.value.trim();
  if (statusEl) state.status = statusEl.value;
  if (priorityEl) state.priority = priorityEl.value;
  if (assigneeEl) state.assignee = assigneeEl.value;
  if (sortEl) state.sortBy = sortEl.value;
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
    const assigneeParam =
      state.assignee === "" ? undefined : state.assignee;

    const { items, total } = await listTickets({
      status: state.status || undefined,
      priority: state.priority || undefined,
      assignee: assigneeParam,
      search: state.search || undefined,
      sort: state.sortBy,
      order: state.order,
      page: state.page,
      limit: state.limit,
    });

    state.items = Array.isArray(items) ? items : [];
    state.total = typeof total === "number" ? total : state.items.length;

    renderTable(state.items);

    if (emptyEl) emptyEl.hidden = state.items.length > 0;

    if (pagEl) {
      if (state.total === 0) {
        pagEl.textContent = "";
      } else {
        const start = (state.page - 1) * state.limit + 1;
        const end = Math.min(state.page * state.limit, state.total);
        pagEl.textContent = `Showing ${start}–${end} of ${state.total}`;
      }
    }
  } catch (err) {
      console.error(err);
      setTicketsErrorMessage(err);
      if (errorEl) errorEl.hidden = false;
      state.items = [];
      state.total = 0;
      renderTable([]);
      if (emptyEl) emptyEl.hidden = true; /* don't show "no tickets" when the API failed */
      if (pagEl) pagEl.textContent = "";
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

  const errorRetry = document.getElementById("error-retry");
  if (errorRetry) {
    errorRetry.addEventListener("click", () => {
      refresh();
    });
  }

  syncStateFromDom();


  const onSearch = debounce(() => {
    state.search = searchInput.value.trim();
    state.page = 1;
    refresh();
  }, 300);

  searchInput.addEventListener("input", onSearch);

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