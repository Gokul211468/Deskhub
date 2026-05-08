<style>
pre code .hljs-string, pre code .hljs-attr { color: #FFB86C !important; }
pre code .hljs-number, pre code .hljs-literal { color: #FF79C6 !important; }
pre code .hljs-keyword, pre code .hljs-built_in { color: #BD93F9 !important; }
pre code .hljs-comment { color: #6272A4 !important; font-style: italic; }
pre code .hljs-title.function_, pre code .hljs-built_in { color: #8BE9FD !important; }
pre code { color: #F8F8F2 !important; }
pre { background: #282A36 !important; }
body { font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; background: #0D0D14; color: #F1F5F9; max-width: 920px; margin: auto; padding: 20px; line-height: 1.55; }
h1 { color: #818CF8; border-bottom: 3px solid #6366F1; padding-bottom: 8px; }
h2 { color: #818CF8; margin-top: 28px; border-left: 4px solid #6366F1; padding-left: 10px; }
h3 { color: #F1F5F9; margin-top: 20px; }
p, li, td, th { color: #E2E8F0; }
code { background: #1E1E2E; padding: 2px 6px; border-radius: 3px; font-size: 0.92em; color: #A6E3A1; }
pre { background: #12121A !important; color: #CDD6F4 !important; padding: 16px; border-radius: 6px; font-size: 0.95em; line-height: 1.55; border: 1px solid #2E2E42; overflow-x: auto; margin: 14px 0; }
pre code { background: transparent; color: inherit; padding: 0; }
table { border-collapse: collapse; width: 100%; margin: 14px 0; background: #16161F; }
th { background: #6366F1; color: #FFFFFF; padding: 10px 12px; text-align: left; font-size: 0.9em; font-weight: 700; }
td { padding: 10px 12px; border-bottom: 1px solid #2E2E42; font-size: 0.92em; color: #E2E8F0; vertical-align: top; }
tr:nth-child(even) td { background: #1A1A26; }
.cover { background: linear-gradient(135deg, #312E81 0%, #6366F1 100%); padding: 38px 30px; margin-bottom: 28px; border-radius: 6px; }
.cover h1 { color: #FFFFFF; font-size: 2.4em; border: none; margin: 0; padding: 0; }
.cover .sub { color: #C7D2FE; font-size: 1.05em; margin: 10px 0 14px; }
.cover .end-badge { display: inline-block; background: #FBBF24; color: #0D0D14; padding: 4px 14px; border-radius: 3px; font-size: 0.72em; font-weight: 700; letter-spacing: 1.2px; margin-bottom: 18px; }
.meta-cards { display: flex; gap: 14px; flex-wrap: wrap; }
.meta-cards > div { background: rgba(255,255,255,0.12); padding: 10px 18px; border-radius: 4px; min-width: 100px; }
.meta-cards strong { color: #FBBF24; font-size: 1.4em; display: block; }
.meta-cards span { color: #E0E7FF; font-size: 0.72em; letter-spacing: 1px; }
.part-banner { background: rgba(99,102,241,0.15); color: #818CF8; text-align: center; padding: 10px; border-radius: 4px; font-weight: 700; font-size: 0.9em; letter-spacing: 1px; margin: 25px 0 15px; border: 1px solid #6366F1; }
.part-amber { background: rgba(251,191,36,0.15); color: #FBBF24; border-color: #FBBF24; }
.part-mint { background: rgba(45,212,191,0.15); color: #2DD4BF; border-color: #2DD4BF; }
.topic { background: #312E81; color: #FFFFFF; padding: 12px 16px; border-radius: 6px; margin: 24px 0 15px; font-weight: 700; }
.topic .n { background: rgba(0,0,0,0.25); padding: 2px 8px; border-radius: 3px; margin-right: 8px; font-size: 0.85em; color: #E0E7FF; }
.topic .sub { float: right; opacity: 0.85; font-weight: 400; font-size: 0.88em; }
.card { background: #16161F; border: 1px solid #2E2E42; border-radius: 6px; padding: 14px 18px; margin: 12px 0; }
.card.indigo { border-left: 4px solid #6366F1; }
.card.amber { border-left: 4px solid #FBBF24; }
.card.red { border-left: 4px solid #FF4D6D; }
.phase-card { background: #16161F; padding: 16px 20px; margin: 14px 0; border-radius: 4px; border-left: 4px solid #6366F1; }
.phase-card.p1 { border-left-color: #4D9FFF; }
.phase-card.p2 { border-left-color: #2DD4BF; }
.phase-card.p3 { border-left-color: #FBBF24; }
.phase-card.p4 { border-left-color: #FF8C42; }
.phase-card.p5 { border-left-color: #C084FC; }
.phase-card .ph-title { font-weight: 700; margin-bottom: 8px; font-size: 1.05em; }
.phase-card.p1 .ph-title { color: #4D9FFF; }
.phase-card.p2 .ph-title { color: #2DD4BF; }
.phase-card.p3 .ph-title { color: #FBBF24; }
.phase-card.p4 .ph-title { color: #FF8C42; }
.phase-card.p5 .ph-title { color: #C084FC; }
.phase-card .ph-meta { color: #9CA3AF; font-size: 0.82em; margin-bottom: 10px; }
.phase-card ul { margin: 6px 0; padding-left: 22px; }
.phase-card li { color: #E2E8F0; margin: 4px 0; line-height: 1.5; }
.tip-box { background: rgba(99,102,241,0.12); border: 1px solid #6366F1; color: #C7D2FE; padding: 12px 14px; border-radius: 3px; font-size: 0.92em; margin: 12px 0; }
.warn-box { background: rgba(255,77,109,0.12); border: 1px solid #FF4D6D; color: #FCA5A5; padding: 12px 14px; border-radius: 3px; font-size: 0.92em; margin: 12px 0; }
.rubric { background: #16161F; border: 1px solid #2E2E42; border-radius: 4px; padding: 4px; margin: 12px 0; }
.rubric table { margin: 0; }
hr { border: none; border-top: 1px solid #2E2E42; margin: 30px 0; }
.tree { background: #12121A; border: 1px solid #2E2E42; border-radius: 4px; padding: 14px 18px; font-family: 'Courier New', monospace; font-size: 0.88em; color: #CDD6F4; line-height: 1.55; white-space: pre; overflow-x: auto; }
</style>

<div class="cover">
<div class="end-badge">★ CAPSTONE PROJECT — END OF TRAINING</div>
<h1>DeskHub — Support Ticket Dashboard</h1>
<div class="sub">A vanilla-JS, ES-module, real-API capstone for the JavaScript training program</div>
<div class="meta-cards">
<div><strong>5 days</strong><span>SUGGESTED</span></div>
<div><strong>Vanilla JS</strong><span>NO FRAMEWORK</span></div>
<div><strong>ES Modules</strong><span>ARCHITECTURE</span></div>
<div><strong>json-server</strong><span>FAKE BACKEND</span></div>
</div>
</div>

## Why this project

Service-based work for global clients is mostly internal tools, dashboards, and CRUD admin panels — list-detail views with search, filter, sort, pagination, and form-heavy create/edit screens against REST APIs. A todo list doesn't touch most of that surface. A support ticket dashboard does — and it's the same shape as the first ticket you'll be assigned in your first client project.

By the end of this build you'll have produced a portfolio-grade, hireable artifact that exercises every concept from the 27-session program, from variables (Day 1) all the way to debounce and security (Day 27).

<div class="card indigo">
<strong>The fictional brief:</strong> "DeskHub" is a support ticketing app for an Indian SaaS company. Customers from across India submit support tickets; agents triage, comment, and resolve them. Admins see everything. You're building the agent/admin web app.
</div>

---

## Tech stack

| Layer | Tool | Why |
|---|---|---|
| Backend | `json-server` over `db.json` | Real REST endpoints, zero backend code |
| HTTP | `fetch` + `async/await` | What every modern app uses |
| Architecture | ES modules (`import`/`export`) | Day 12 + Day 24 callback |
| State | Plain JS objects + localStorage | No Redux — yet |
| UI | Hand-written HTML + CSS | Practice your fundamentals |
| Build | None | No bundler, no transpiler — just open the file |
| Dev runtime | `live-server` | Auto-reload on save |

<div class="tip-box">
<strong>Why no framework?</strong> Frameworks hide the JavaScript. This project forces you to use the language directly — and once you understand it, picking up React in week one of your client project is easy.
</div>

---

## Setup

```bash
# Clone the starter repo
git clone <repo-url> deskhub
cd deskhub

# Install dev dependencies
npm install

# Run API + UI together
npm run dev
```

Two services start:

| Service | URL | What |
|---|---|---|
| `json-server` | http://localhost:3001 | Fake REST API |
| `live-server` | http://localhost:8080 | Static site, auto-reloads on save |

Open http://localhost:8080/ in your browser. (You'll need to create `public/index.html` first — see Phase 1.)

---

## Folder structure

The starter gives you everything below except the `public/` folder. **You build `public/` from scratch — every HTML and CSS file.**

<div class="tree">
deskhub-starter/
├── package.json          ← given
├── db.json               ← given (5 users, 30 tickets, 20 comments)
├── README.md             ← given (you'll edit it)
├── PROJECT_GUIDE.md      ← given (this file)
│
├── public/               ← YOU build everything here
│   ├── index.html        ← login page
│   ├── dashboard.html
│   ├── tickets.html
│   ├── ticket-detail.html
│   └── styles/main.css
│
└── src/                  ← stubs given — fill the TODOs
    ├── main.js
    ├── api/
    │   ├── client.js     ← fetch wrapper
    │   ├── tickets.js    ← ticket CRUD
    │   └── auth.js       ← fake login
    ├── modules/
    │   ├── auth.js       ← login UI wiring
    │   ├── tickets.js    ← list page logic
    │   ├── ticketDetail.js
    │   ├── form.js       ← validation
    │   └── ui.js         ← toast / modal / loader
    └── utils/
        ├── debounce.js   ← Day 27 callback
        ├── formatDate.js ← Intl APIs
        └── storage.js    ← localStorage wrapper
</div>

<div class="card amber">
<strong>Module loading note</strong> — In your HTML, load <code>main.js</code> with <code>&lt;script type="module" src="../src/main.js"&gt;&lt;/script&gt;</code>. ES modules require this attribute. Without it, you'll get "Cannot use import statement outside a module".
</div>

---

## API cheatsheet

`json-server` gives you a full REST API. Combine query params freely.

```bash
# Tickets
GET    /tickets                              # list all
GET    /tickets?status=open                  # filter by exact match (any field)
GET    /tickets?status=open&priority=urgent  # combine filters
GET    /tickets?_sort=createdAt&_order=desc  # sort
GET    /tickets?_page=1&_limit=10            # paginate (also returns X-Total-Count header)
GET    /tickets?q=login                      # full-text search across all fields
GET    /tickets/12                           # single ticket
POST   /tickets                              # create (auto-assigns id)
PATCH  /tickets/12                           # partial update
DELETE /tickets/12                           # delete

# Comments (filter by ticket)
GET    /comments?ticketId=12&_sort=createdAt&_order=asc
POST   /comments

# Users (for fake login)
GET    /users?email=priya@deskhub.in
```

<div class="warn-box">
<strong>X-Total-Count</strong> — When you paginate, json-server returns the total in the <code>X-Total-Count</code> response header. You need this for pagination UI ("Page 2 of 7"). Read it via <code>response.headers.get("X-Total-Count")</code>. <strong>Note:</strong> in your fetch wrapper, return both <code>data</code> AND headers, or pull it inline before calling <code>.json()</code>.
</div>

---

<div class="part-banner">PHASE PLAN — 5 PHASES</div>

<div class="phase-card p1">
<div class="ph-title">Phase 1 — Foundations &amp; Login</div>
<div class="ph-meta">Goal: get the dev loop running, build the login flow end-to-end</div>
<ul>
<li>Run <code>npm run dev</code>, confirm both services are up</li>
<li>Create <code>public/index.html</code> (login page) — semantic form, basic CSS</li>
<li>Implement <code>utils/storage.js</code> — get / set / remove / clear with prefix</li>
<li>Implement <code>api/client.js</code> — request, get, post, patch, del</li>
<li>Implement <code>api/auth.js</code> — login, logout, getCurrentUser, isAuthenticated</li>
<li>Implement <code>modules/auth.js</code> — wire up the form, redirect on success</li>
<li>On wrong creds: show inline error, button stays enabled</li>
<li>On success: store token + user, navigate to <code>dashboard.html</code></li>
</ul>
<strong>Done when:</strong> you can log in with <code>priya@deskhub.in / demo123</code> and reach a (placeholder) dashboard. Reload — still logged in.
</div>

<div class="phase-card p2">
<div class="ph-title">Phase 2 — Tickets List + API Client</div>
<div class="ph-meta">Goal: build the main page — fetch and render all tickets</div>
<ul>
<li>Create <code>public/tickets.html</code> with a table or card grid placeholder</li>
<li>Implement <code>api/tickets.js</code> — listTickets, getTicket, createTicket, updateTicket, deleteTicket, listComments, addComment</li>
<li>Implement <code>modules/tickets.js</code> — initTicketsList, refresh, renderTable</li>
<li>Implement <code>utils/formatDate.js</code> — formatDate, formatDateTime, formatRelative</li>
<li>Show loading spinner while fetching (use ui.js stub later, or a placeholder div for now)</li>
<li>Display: ID, title, customer, priority, status, assignee name, created date</li>
<li>Empty state: "No tickets found" message</li>
<li>Error state: friendly message + retry button</li>
</ul>
<strong>Done when:</strong> tickets.html shows all 30 tickets in a clean table with proper formatting and loading/error states.
</div>

<div class="phase-card p3">
<div class="ph-title">Phase 3 — Search, Filter, Sort, Paginate</div>
<div class="ph-meta">Goal: make the list usable at scale</div>
<ul>
<li>Add search input — debounced 300ms (use <code>utils/debounce.js</code>)</li>
<li>Add status / priority / assignee dropdowns — populate dynamically from <code>/users</code></li>
<li>Add sort dropdown — by createdAt, priority, status</li>
<li>Add pagination — prev / next + page numbers, 10 per page</li>
<li>Read <code>X-Total-Count</code> header to compute total pages</li>
<li>Reset page to 1 whenever a filter changes</li>
<li><em>Stretch:</em> reflect filters in URL query string so refresh keeps state</li>
</ul>
<strong>Done when:</strong> you can search for "login", filter to status=open, sort by priority, paginate, and the table updates correctly. No double-fetches on rapid typing (debounce works).
</div>

<div class="phase-card p4">
<div class="ph-title">Phase 4 — Detail View + Create Form</div>
<div class="ph-meta">Goal: full CRUD with proper form validation</div>
<ul>
<li>Create <code>public/ticket-detail.html</code> — read <code>?id=N</code> from URL</li>
<li>Implement <code>modules/ticketDetail.js</code> — load ticket + comments in parallel</li>
<li>Add status / priority / assignee dropdowns that PATCH on change</li>
<li>Build the create-ticket modal (use <code>modules/ui.js</code>)</li>
<li>Implement <code>modules/form.js</code> — validators + validateField + validateForm</li>
<li>Validation rules:
<ul>
<li>title: required, 5–100 chars</li>
<li>description: required, min 10 chars</li>
<li>customerName: required</li>
<li>customerEmail: required + email format</li>
<li>priority: required, oneOf valid values</li>
<li>category: required, oneOf valid values</li>
</ul>
</li>
<li>Inline errors on blur, re-validate on submit, disabled submit when invalid</li>
<li>On submit: POST, close modal, refresh list, show toast</li>
</ul>
<strong>Done when:</strong> you can click any ticket → see details → change status → see toast → reload page → status persisted. New tickets can be created with full validation.
</div>

<div class="phase-card p5">
<div class="ph-title">Phase 5 — Comments, Polish, README</div>
<div class="ph-meta">Goal: ship a polished artifact</div>
<ul>
<li>Add comments thread on detail page — list existing, add new</li>
<li>Implement <code>modules/ui.js</code> properly — toast (auto-dismiss 3s), modal (Esc/click-outside), confirmDialog</li>
<li>Delete ticket button — confirmDialog, then DELETE, then redirect</li>
<li>Add the dashboard page with 4 stat cards + recent 5 tickets</li>
<li>Polish CSS — consistent spacing, decent typography, responsive at 768px+</li>
<li>Empty states everywhere they apply</li>
<li>Update <code>README.md</code> — your own setup notes, screenshots, architecture decisions, known limitations, what you'd add next</li>
<li>Final check: log in, create ticket, edit, comment, delete — full flow with no errors</li>
</ul>
<strong>Done when:</strong> you'd be happy to put this on your CV. README is a real document, not the template.
</div>

---

## Acceptance criteria

A finished submission must have:

| # | Criterion |
|---|---|
| 1 | `npm run dev` works on a fresh clone — no manual setup steps |
| 2 | Login + logout work; session survives page reload |
| 3 | Tickets list shows real data with at least 5 columns |
| 4 | Search input is debounced (no fetch on every keystroke) |
| 5 | At least 3 working filters (status, priority, assignee) |
| 6 | Pagination shows total pages and current page |
| 7 | Create-ticket form has inline validation; bad input is rejected |
| 8 | Detail view loads ticket + comments in one render (parallel fetch) |
| 9 | Status / priority / assignee changes persist (PATCH works) |
| 10 | Comments can be added and appear immediately |
| 11 | Loading and error states are handled visibly on every page |
| 12 | All `fetch` calls are wrapped in try/catch — no unhandled promise rejections |
| 13 | Code organised into ES modules — no single 500-line file |
| 14 | README explains setup, architecture, decisions, and known issues |

---

## Evaluation rubric

<div class="rubric">

| Area | Weight | What we look for |
|---|---|---|
| Functionality | 30% | All 14 acceptance criteria pass |
| Code organisation | 20% | ES modules used; clear separation api ↔ modules ↔ utils; no copy-paste |
| Async + error handling | 15% | try/catch everywhere; loading states visible; user-friendly errors |
| Form validation | 10% | Inline UX; both blur and submit validation; sensible messages |
| UI quality | 10% | Looks professional, responsive, accessible-ish (labels, focus states) |
| README + git hygiene | 10% | Clear setup; meaningful commits; explains decisions |
| Stretch goals | 5% | Beyond the spec — see next section |

</div>

A 15-minute walkthrough call accompanies the rubric. Each dev demos and is asked one or two "why did you do it this way" questions per area. That conversation matters as much as the score.

---

## Stretch goals

Tackle ANY of these to push from "good submission" to "standout":

| Stretch | Difficulty |
|---|---|
| URL-driven filters — `?status=open&page=2` reflects in URL, refresh-safe | Medium |
| Optimistic status updates — UI changes instantly, rolls back on API failure | Medium |
| Keyboard shortcuts — `/` focus search, `n` new ticket, `j`/`k` next/prev row | Easy |
| Dark mode toggle — persisted in localStorage | Easy |
| Bulk actions — select multiple tickets, change status in one go | Hard |
| CSV export of current filtered list | Medium |
| Activity log on detail page — timeline of all changes | Hard |
| Real-time poll — auto-refresh list every 30s, indicate new tickets | Medium |
| Accessibility audit — passes WAVE / axe with zero errors | Medium |
| Toast queue — show multiple toasts stacked, dismiss in order | Easy |

---

## Submission

1. Push your repo to GitHub. Public, with a real README.
2. Tag a release: <code>v1.0.0</code> with a short release-note describing what shipped vs. what's pending.
3. Send the trainer:
   - GitHub URL
   - One screenshot of the tickets list page
   - One paragraph: <em>"What was hardest, what would I do differently next time?"</em>
4. Be ready for the 15-minute walkthrough call.

---

<div class="part-banner part-amber">PROGRAM RECAP — WHERE EVERYTHING SHOWS UP</div>

Each part of this project exercises specific days from the 27-session program. If something feels rough, revisit that day's cheatsheet.

| Project area | Days exercised |
|---|---|
| Variables, types, operators, template literals | Days 1–3 |
| Conditionals, loops | Days 4–5 |
| Functions, callbacks | Day 6 |
| Arrays — `.map`, `.filter`, `.find`, `.reduce` | Day 7 |
| Objects — destructuring, spread | Day 8 |
| ES6+ — modules, default params, optional chaining | Day 9, 12 |
| DOM manipulation | Day 10 |
| Events, delegation | Day 11 |
| try/catch around `await` | Day 12, 19 |
| Closures (debounce, factory) | Day 14 |
| `this` in event handlers / methods | Day 15 |
| Classes (optional — for ui.js modal) | Day 17 |
| `fetch`, async/await, error handling | Days 18–19 |
| Event loop intuition (loading state during fetch) | Day 20 |
| ES modules architecture | Day 24 |
| Pure functions, immutability (filter/sort logic) | Day 25 |
| Module / observer / factory patterns | Day 26 |
| Debounce, security (textContent vs innerHTML), perf | Day 27 |

---

<div class="card indigo">
<strong>One last note.</strong> The point of this project isn't to ship something perfect. It's to make every concept from the training stick by building real software. Lean on the cheatsheets, ask each other questions, and write code you'd be proud to walk a senior engineer through.
<br><br>
Build something you'd be happy to show in an interview. Then go ace your first client project.
</div>
