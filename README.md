# DeskHub

Vanilla JavaScript support ticket app: login, dashboard, ticket list (filters, pagination, CSV export), and ticket detail with comments. Data comes from a **json-server**-style REST API.

## Requirements

- **Node.js** 18+ (recommended)

## Quick start

```bash
npm install
npm run dev
```

This starts two processes (see `package.json`):

| Service        | Port   | Role |
|----------------|--------|------|
| `json-server`  | **3001** | REST API over `db.json` (optional 200 ms delay) |
| `live-server`  | **8080** | Static site with live reload |

Open **http://localhost:8080**.

### API base URL

All HTTP calls go through `src/api/client.js` and use `BASE_URL`.

- The repo may point at a **hosted** API (e.g. Render) or **`http://localhost:3001`** for local json-server.
- For **local** work with `npm run dev`, set `BASE_URL` to `http://localhost:3001` so the UI hits the same machine as `npm run api`.

## Pages

| File                 | `data-page`     | Purpose |
|----------------------|-----------------|-----------|
| `index.html`         | `login`         | Sign in |
| `dashboard.html`     | `dashboard`     | Welcome, ticket counts, recent tickets |
| `tickets.html`       | `tickets-list`  | Search, filters, sort, pagination, new ticket, **Export CSV** |
| `ticket-detail.html` | `ticket-detail` | Ticket fields, comments, delete |

Entry: `src/main.js` reads `document.body.dataset.page` and runs the matching `init*()` helper. Protected routes use `requireAuth()` from `src/modules/auth.js`.

## Features

- **Auth:** login against `/users`; session in `localStorage` (`src/modules/auth.js`, `src/utils/storage.js`).
- **Tickets:** list with `q`, status, priority, assignee, sort; URL query sync; empty and error states (`src/modules/tickets.js`).
- **Ticket detail:** load ticket + comments; patch status / priority / assignee; add comments; delete with confirm (`src/modules/ticketDetail.js`).
- **Dashboard:** counts by status + up to five most recent tickets with links to detail (`src/modules/dashboard.js`).
- **API:** `src/api/client.js` (`get`, `post`, `patch`, `del`, paginated `getWithTotal`) and `src/api/tickets.js` (`listTickets`, `getTicket`, `createTicket`, …).
- **UI:** toasts, modal, full-screen loader (`src/modules/ui.js`).
- **CSV export:** on the tickets page, **Export CSV** downloads **all tickets matching current filters**, fetched in pages of 100 (`src/utils/csv.js` + `tickets.js`).

## Project layout

```
├── db.json                 # Seed: users, tickets, comments
├── index.html
├── dashboard.html
├── tickets.html
├── ticket-detail.html
├── styles/main.css
├── package.json
└── src/
    ├── main.js
    ├── api/
    │   ├── client.js
    │   ├── tickets.js
    │   └── auth.js
    ├── modules/
    │   ├── auth.js
    │   ├── dashboard.js
    │   ├── tickets.js
    │   ├── ticketDetail.js
    │   ├── ui.js
    │   └── form.js
    └── utils/
        ├── csv.js
        ├── debounce.js
        ├── formatDate.js
        └── storage.js
```

## API (json-server)

Typical routes:

- `GET /users` — user list (login matches email/password in the demo).
- `GET /tickets` — list; filters (`status`, `priority`, `assignedTo`, …); `q=` search; `_sort` / `_order`; `_page` / `_limit` with `X-Total-Count` when paginated.
- `GET /tickets/:id`, `POST /tickets`, `PATCH /tickets/:id`, `DELETE /tickets/:id`
- `GET /comments?ticketId=…`, `POST /comments`

Docs: [json-server v0.17](https://github.com/typicode/json-server/tree/v0.17.4).

## Demo users (`db.json`)

Password for all accounts: **`demo123`**

| Email              | Role  |
|--------------------|-------|
| priya@deskhub.in   | admin |
| aarav@deskhub.in   | agent |
| riya@deskhub.in    | agent |
| anaya@deskhub.in   | agent |
| kabir@deskhub.in   | agent |

## Scripts

| Command          | Description                    |
|------------------|--------------------------------|
| `npm run dev`    | API + static UI together       |
| `npm run api`    | Only `json-server` on port 3001 |
| `npm run serve`  | Only `live-server` on port 8080 |

## Limitations

- Demo only: credentials live in `db.json`, not production-grade security.
- If the UI and API are on different origins, the server must allow CORS for the UI origin.


