<style>
pre code .hljs-string, pre code .hljs-attr { color: #FFB86C !important; }
pre code .hljs-number, pre code .hljs-literal { color: #FF79C6 !important; }
pre code .hljs-keyword, pre code .hljs-built_in { color: #BD93F9 !important; }
pre code .hljs-comment { color: #6272A4 !important; font-style: italic; }
pre code { color: #F8F8F2 !important; }
pre { background: #282A36 !important; }
body { font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; background: #0D0D14; color: #F1F5F9; max-width: 920px; margin: auto; padding: 20px; line-height: 1.55; }
h1 { color: #818CF8; border-bottom: 3px solid #6366F1; padding-bottom: 8px; }
h2 { color: #818CF8; margin-top: 28px; }
h3 { color: #F1F5F9; margin-top: 20px; }
p, li, td, th { color: #E2E8F0; }
code { background: #1E1E2E; padding: 2px 6px; border-radius: 3px; font-size: 0.92em; color: #A6E3A1; }
pre { background: #12121A !important; color: #CDD6F4 !important; padding: 14px; border-radius: 6px; font-size: 0.9em; line-height: 1.55; border: 1px solid #2E2E42; overflow-x: auto; margin: 12px 0; }
pre code { background: transparent; color: inherit; padding: 0; }
table { border-collapse: collapse; width: 100%; margin: 12px 0; background: #16161F; }
th { background: #6366F1; color: #FFFFFF; padding: 8px 12px; text-align: left; font-size: 0.88em; font-weight: 700; }
td { padding: 8px 12px; border-bottom: 1px solid #2E2E42; font-size: 0.9em; color: #E2E8F0; vertical-align: top; }
tr:nth-child(even) td { background: #1A1A26; }
.cover { background: linear-gradient(135deg, #312E81 0%, #6366F1 100%); padding: 32px 28px; margin-bottom: 24px; border-radius: 6px; }
.cover h1 { color: #FFFFFF; font-size: 2.1em; border: none; margin: 0; padding: 0; }
.cover .sub { color: #C7D2FE; font-size: 1em; margin: 8px 0 12px; }
.cover .end-badge { display: inline-block; background: #FBBF24; color: #0D0D14; padding: 3px 12px; border-radius: 3px; font-size: 0.7em; font-weight: 700; letter-spacing: 1.2px; margin-bottom: 14px; }
.cover .meta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px; }
.cover .meta div { background: rgba(255,255,255,0.12); padding: 8px 14px; border-radius: 4px; min-width: 90px; }
.cover .meta strong { color: #FBBF24; font-size: 1.2em; display: block; }
.cover .meta span { color: #E0E7FF; font-size: 0.7em; letter-spacing: 0.8px; }
.day { background: #16161F; padding: 18px 22px; margin: 22px 0; border-radius: 6px; border-left: 5px solid #6366F1; }
.day.d1 { border-left-color: #4D9FFF; }
.day.d2 { border-left-color: #2DD4BF; }
.day.d3 { border-left-color: #FBBF24; }
.day.d4 { border-left-color: #FF8C42; }
.day.d5 { border-left-color: #C084FC; }
.day .head { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap; }
.day .num { font-size: 1.4em; font-weight: 700; color: #FFFFFF; }
.day.d1 .num { color: #4D9FFF; }
.day.d2 .num { color: #2DD4BF; }
.day.d3 .num { color: #FBBF24; }
.day.d4 .num { color: #FF8C42; }
.day.d5 .num { color: #C084FC; }
.day .pill { background: rgba(255,255,255,0.08); color: #C7D2FE; padding: 3px 10px; border-radius: 12px; font-size: 0.72em; font-weight: 600; letter-spacing: 0.5px; }
.day .final-pill { background: #FBBF24; color: #0D0D14; }
.day .topic { color: #F1F5F9; font-size: 1.15em; font-weight: 600; margin: 4px 0 4px; }
.day .goal { color: #9CA3AF; font-size: 0.92em; font-style: italic; margin-bottom: 14px; }
.day .section-title { color: #C7D2FE; font-size: 0.78em; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin: 16px 0 6px; border-bottom: 1px solid #2E2E42; padding-bottom: 4px; }
.day ul.tasks { list-style: none; padding-left: 0; margin: 6px 0; }
.day ul.tasks li { color: #E2E8F0; margin: 5px 0; padding-left: 26px; position: relative; line-height: 1.5; font-size: 0.93em; }
.day ul.tasks li::before { content: "☐"; position: absolute; left: 0; top: 0; color: #6366F1; font-size: 1.1em; font-weight: 700; }
.day.d1 ul.tasks li::before { color: #4D9FFF; }
.day.d2 ul.tasks li::before { color: #2DD4BF; }
.day.d3 ul.tasks li::before { color: #FBBF24; }
.day.d4 ul.tasks li::before { color: #FF8C42; }
.day.d5 ul.tasks li::before { color: #C084FC; }
.day .done-when { background: rgba(34,197,94,0.1); border-left: 3px solid #22C55E; padding: 10px 14px; margin: 10px 0; border-radius: 3px; font-size: 0.9em; }
.day .done-when strong { color: #4ADE80; }
.day .pitfalls { background: rgba(255,77,109,0.1); border-left: 3px solid #FF4D6D; padding: 10px 14px; margin: 10px 0; border-radius: 3px; font-size: 0.88em; }
.day .pitfalls strong { color: #FCA5A5; }
.day .pitfalls ul { padding-left: 18px; margin: 6px 0 0; }
.day .pitfalls li { color: #FCA5A5; margin: 3px 0; }
.day .next { color: #9CA3AF; font-size: 0.85em; margin-top: 14px; padding-top: 10px; border-top: 1px solid #2E2E42; font-style: italic; }
.day .ship { color: #FBBF24; font-size: 0.9em; font-weight: 600; margin-top: 14px; padding-top: 10px; border-top: 1px solid #2E2E42; }
hr { border: none; border-top: 1px solid #2E2E42; margin: 26px 0; }
</style>

<div class="cover">
<div class="end-badge">★ DESKHUB CAPSTONE — DAILY CHECKLIST</div>
<h1>Days 28 → 32 — Daily Tasks</h1>
<div class="sub">Tick off each item. Refer to PROJECT_GUIDE.md for the full spec.</div>
<div class="meta">
<div><strong>5 days</strong><span>POST-TRAINING</span></div>
<div><strong>~3 hrs</strong><span>PER DAY</span></div>
<div><strong>Day 32</strong><span>FINAL DAY</span></div>
</div>
</div>

> **How to use this file:** each morning, open the day's card. Read the goal. Work through the tasks one by one. Verify the "Done when" criteria before moving on. Skim the pitfalls — they're real bugs we've seen others hit. End-of-day, push your code.

---

<div class="day d1">
<div class="head">
<span class="num">Day 28</span>
<span class="pill">Project Day 1 of 5</span>
<span class="pill">Foundations</span>
</div>
<div class="topic">Foundations &amp; Login</div>
<div class="goal">Get the dev loop running. Build the login flow end-to-end. Token persists across reloads.</div>

<div class="section-title">Tasks</div>
<ul class="tasks">
<li>Run <code>npm install</code> then <code>npm run dev</code>; confirm both <code>:3001</code> and <code>:8080</code> are up</li>
<li>Verify the API works — hit <code>http://localhost:3001/tickets</code> in a browser, see JSON</li>
<li>Create <code>public/index.html</code> — login form (email, password, submit, error span). Semantic HTML.</li>
<li>Create <code>public/styles/main.css</code> — basic reset + clean form styling</li>
<li>Implement <code>src/utils/storage.js</code> — <code>get</code>, <code>set</code>, <code>remove</code>, <code>clear</code> (with <code>deskhub:</code> prefix)</li>
<li>Implement <code>src/api/client.js</code> — <code>request</code> + <code>get</code>/<code>post</code>/<code>patch</code>/<code>del</code> shorthands; throw on non-2xx</li>
<li>Implement <code>src/api/auth.js</code> — <code>login</code>, <code>logout</code>, <code>getCurrentUser</code>, <code>isAuthenticated</code></li>
<li>Implement <code>src/modules/auth.js</code> — wire up form submit, redirect on success</li>
<li>Wire <code>src/main.js</code> to dispatch by <code>document.body.dataset.page</code></li>
<li>Build a placeholder <code>public/dashboard.html</code> with just "You're in!" and a logout button</li>
<li>Wire logout button — clear storage, redirect to login</li>
</ul>

<div class="done-when">
<strong>✓ Done when:</strong> log in as <code>priya@deskhub.in / demo123</code> → land on dashboard. Reload → still logged in. Wrong password → inline error. Logout → back to login.
</div>

<div class="pitfalls">
<strong>⚠ Watch out for:</strong>
<ul>
<li>ES modules need <code>&lt;script type="module"&gt;</code> in HTML — without it, <code>import</code> fails</li>
<li><code>fetch</code> doesn't throw on 4xx/5xx — your wrapper MUST check <code>response.ok</code></li>
<li>Don't store the password — only token + user object</li>
<li><code>localStorage</code> values are always strings — JSON.parse on get, JSON.stringify on set</li>
</ul>
</div>

<div class="next">→ Tomorrow: real tickets list page with fetch, loading, error states</div>
</div>

---

<div class="day d2">
<div class="head">
<span class="num">Day 29</span>
<span class="pill">Project Day 2 of 5</span>
<span class="pill">Tickets List</span>
</div>
<div class="topic">Tickets List + API Client</div>
<div class="goal">A real, fetching tickets list with proper loading, error, and empty states.</div>

<div class="section-title">Tasks</div>
<ul class="tasks">
<li>Create <code>public/tickets.html</code> — semantic table or grid container, search/filter slots empty</li>
<li>Add <code>data-page="tickets-list"</code> on <code>&lt;body&gt;</code>; wire init in main.js</li>
<li>Implement <code>src/api/tickets.js</code> — listTickets, getTicket, createTicket, updateTicket, deleteTicket, listComments, addComment</li>
<li>Implement <code>src/utils/formatDate.js</code> — formatDate, formatDateTime, formatRelative (use <code>Intl</code>)</li>
<li>Implement <code>src/modules/tickets.js</code> — initTicketsList, refresh, renderTable</li>
<li>Add a one-time fetch of <code>/users</code> at boot (cache it) — needed to show assignee names not IDs</li>
<li>Render columns: ID, Title, Customer, Priority, Status, Assignee, Created</li>
<li>Add a loading spinner/text visible while fetching</li>
<li>Add error state with a retry button (handle case where json-server is offline)</li>
<li>Add empty state ("No tickets found")</li>
<li>Auth-protect the page — redirect to login if no token</li>
<li>Style the table — readable, alternating rows, hover state</li>
</ul>

<div class="done-when">
<strong>✓ Done when:</strong> all 30 tickets render in a clean table. Dates look like "7 May 2026", not the raw ISO. Assignee column shows names. Stop json-server → reload page → see error + working retry button.
</div>

<div class="pitfalls">
<strong>⚠ Watch out for:</strong>
<ul>
<li>Don't paginate yet — that's tomorrow. Fetch all 30 for now.</li>
<li>Render in ONE DOM operation (build innerHTML or use a DocumentFragment) — not 30 appendChild calls</li>
<li><code>assignedTo</code> is an ID. Map it via the cached users list — don't fetch /users 30 times</li>
<li>Use <code>textContent</code> for ticket titles, not <code>innerHTML</code> — Day 27 callback (XSS)</li>
</ul>
</div>

<div class="next">→ Tomorrow: search, filter, sort, paginate</div>
</div>

---

<div class="day d3">
<div class="head">
<span class="num">Day 30</span>
<span class="pill">Project Day 3 of 5</span>
<span class="pill">List UX</span>
</div>
<div class="topic">Search · Filter · Sort · Paginate</div>
<div class="goal">Make the list usable at scale. Every interaction triggers a clean refetch with the right query string.</div>

<div class="section-title">Tasks</div>
<ul class="tasks">
<li>Implement <code>src/utils/debounce.js</code> — same shape as Day 27</li>
<li>Define a single <code>state</code> object in tickets.js holding all filter values + page</li>
<li>Add search input — wire with <code>debounce(refresh, 300)</code></li>
<li>Add status dropdown — "All" + open / in-progress / resolved / closed</li>
<li>Add priority dropdown — "All" + low / medium / high / urgent</li>
<li>Add assignee dropdown — populate from cached users list</li>
<li>Add sort dropdown — Newest / Priority / Status</li>
<li>Build a <code>buildQueryString(state)</code> helper — skip empty values</li>
<li>Add pagination UI — Prev / page numbers (1, 2, 3 ...) / Next; 10 per page</li>
<li>Read <code>X-Total-Count</code> from response headers to compute total pages</li>
<li>Reset <code>page</code> to 1 whenever any filter or search changes</li>
<li>Disable Prev on page 1; disable Next on last page</li>
<li><em>Stretch:</em> reflect filters in URL via <code>history.replaceState</code>; read on init</li>
</ul>

<div class="done-when">
<strong>✓ Done when:</strong> type "login" → only matching tickets show. status=open + priority=urgent → narrowed list. Sort by priority → urgent first. Pagination shows "Page 2 of 3" correctly. Rapid typing fires only ONE fetch after you stop.
</div>

<div class="pitfalls">
<strong>⚠ Watch out for:</strong>
<ul>
<li>Don't fetch on every keystroke — that's why we debounce</li>
<li><code>X-Total-Count</code> is on response.headers, NOT in the body — read it BEFORE <code>.json()</code></li>
<li>Empty filter values should NOT be sent (don't build <code>?status=</code>)</li>
<li>Returning state to page 1 on filter-change is critical — otherwise you're on page 4 of 1</li>
<li>If you do the URL stretch, also handle the back/forward buttons (<code>popstate</code> event)</li>
</ul>
</div>

<div class="next">→ Tomorrow: detail page + create form + validation</div>
</div>

---

<div class="day d4">
<div class="head">
<span class="num">Day 31</span>
<span class="pill">Project Day 4 of 5</span>
<span class="pill">Detail + Create</span>
</div>
<div class="topic">Ticket Detail View + Create Form</div>
<div class="goal">Full CRUD with validated forms, modals, and toasts.</div>

<div class="section-title">Tasks</div>
<ul class="tasks">
<li>Create <code>public/ticket-detail.html</code> — ticket info shell + comments shell + action buttons</li>
<li>Implement <code>src/modules/ticketDetail.js</code> — initTicketDetail</li>
<li>Read <code>?id=N</code> via <code>new URLSearchParams(location.search)</code></li>
<li>Load ticket + comments + users in parallel with <code>Promise.all</code></li>
<li>Render all ticket fields with proper formatting</li>
<li>Implement <code>src/modules/ui.js</code> — toast (auto-dismiss 3s), basic modal (Esc + click-outside to close), confirmDialog</li>
<li>Status dropdown that PATCHes on change — show toast on success</li>
<li>Priority dropdown that PATCHes on change</li>
<li>Assignee dropdown that PATCHes on change</li>
<li>Build "New Ticket" button on tickets list — opens modal</li>
<li>Implement <code>src/modules/form.js</code> — validators (required, minLength, maxLength, email, oneOf) + validateField + validateForm</li>
<li>Wire validation on the create form: blur shows inline error, submit re-validates all, submit disabled when invalid</li>
<li>On successful POST: close modal → refresh list → success toast</li>
<li>Delete button on detail page → confirmDialog → DELETE → redirect to list</li>
</ul>

<div class="done-when">
<strong>✓ Done when:</strong> click any row → detail page → change status → toast + reload → status persists. Click "New Ticket" → bad input → red inline errors → fix → submit → ticket appears in list. Click delete → "Are you sure?" → yes → ticket gone.
</div>

<div class="pitfalls">
<strong>⚠ Watch out for:</strong>
<ul>
<li>Detail-page fetches must be <code>Promise.all</code> — sequential awaits add up to ugly latency</li>
<li>Validate on blur (per-field) AND on submit (all fields) — but not on every keystroke (jumpy UX)</li>
<li>Show only the FIRST error per field, not all of them — keep the UI calm</li>
<li>After a successful create, <em>don't</em> just append the new row locally — refresh the list (server is the source of truth)</li>
<li>Use <code>textContent</code> for everything user-typed (titles, descriptions, comments) — XSS</li>
</ul>
</div>

<div class="next">→ Tomorrow: comments, dashboard, polish, ship</div>
</div>

---

<div class="day d5">
<div class="head">
<span class="num">Day 32</span>
<span class="pill final-pill">FINAL DAY · Project Day 5 of 5</span>
<span class="pill">Ship It</span>
</div>
<div class="topic">Comments · Polish · README · Ship</div>
<div class="goal">Polish to a portfolio-grade artifact. Update the README. Push. Tag. Submit.</div>

<div class="section-title">Tasks</div>
<ul class="tasks">
<li>Add comments thread on detail page — list existing (sorted by createdAt asc), textarea + button to add new</li>
<li>On comment submit — POST → re-fetch comments → render → clear textarea</li>
<li>Build <code>public/dashboard.html</code> — 4 stat cards: Total / Open / In-Progress / Resolved</li>
<li>Stats cards use the count from <code>X-Total-Count</code> for each filtered query (4 small fetches in parallel)</li>
<li>Add "Recent 5 tickets" section on dashboard with link to detail pages</li>
<li>Polish ui.js — toast queue (multiple stack), simple modal animation, full-screen loader for slow ops</li>
<li>Add empty states everywhere they apply (no comments yet, no recent tickets, etc.)</li>
<li>Polish CSS — consistent spacing scale, decent typography, responsive at 768px+, hover/focus states</li>
<li>Pick at least ONE stretch goal: URL-state, optimistic updates, dark mode, keyboard shortcuts, CSV export</li>
<li>Update <code>README.md</code> — replace template content with: your setup steps, 2–3 screenshots, architecture decisions, known limitations, "what I'd add next"</li>
<li>Run a full smoke test from a clean clone: <code>git clone</code> in a fresh folder → <code>npm install</code> → <code>npm run dev</code> → walk through every flow</li>
<li>Final commit, push to GitHub, tag <code>v1.0.0</code> with release notes</li>
<li>Write a short reflection paragraph: <em>"What was hardest, what would I do differently?"</em></li>
<li>Email/Slack the trainer: GitHub URL + 1 screenshot + reflection paragraph</li>
<li>Be ready for the 15-minute walkthrough call — practice demoing every feature in 5 minutes</li>
</ul>

<div class="done-when">
<strong>✓ Done when:</strong> you'd be happy to put this on your CV. The README is a real document, not the template. Full flow works on a fresh clone. You can demo the whole app in 5 minutes without notes.
</div>

<div class="pitfalls">
<strong>⚠ Watch out for:</strong>
<ul>
<li>Don't start a stretch goal until the core is rock-solid — half-finished features look worse than no extra features</li>
<li>Many devs ship great code with empty READMEs and lose points — the README is part of the deliverable</li>
<li>Test from a FRESH clone before submitting — your local <code>node_modules</code> can hide install bugs</li>
<li>Commit history matters — don't squash everything into one "final" commit; meaningful messages tell the story</li>
<li>Don't forget the screenshots in README — visual evidence the app actually runs</li>
</ul>
</div>

<div class="ship">★ Ship it. Then book your walkthrough call.</div>
</div>

---

## After submission

You'll have a 15-minute walkthrough call with the trainer. Be ready to:

- Demo every feature live (5 min)
- Explain WHY for each architectural decision (5 min)
- Answer "if you had another week, what would you add?" (1 min)
- Take feedback gracefully and ask one good question back (4 min)

The walkthrough matters as much as the code. **Practice it.**

---

## What this project actually proves

| Skill | Day(s) reinforced |
|---|---|
| Variables, types, operators | 1–3 |
| Conditionals, loops | 4–5 |
| Functions, callbacks | 6 |
| Array methods | 7 |
| Objects, destructuring, spread | 8 |
| ES6+ syntax | 9 |
| DOM + events | 10–11 |
| try/catch around async | 12, 19 |
| Closures (debounce, factory) | 14 |
| `this` binding | 15 |
| Classes (optional, in ui.js) | 17 |
| Fetch + async/await | 18–19 |
| Event-loop awareness (loaders) | 20 |
| Microtasks (Promise.all detail page) | 20–21 |
| ES modules | 12, 24 |
| Pure functions, immutability | 25 |
| Patterns (factory, observer-ish) | 26 |
| Debounce, XSS-safety, perf | 27 |

When a recruiter asks "what JavaScript do you actually know?" — point them at this repo.
