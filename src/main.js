/**
 * DeskHub — Main Entry Point
 *
 * This file boots the app. Each HTML page should include this script
 * with `<script type="module" src="../src/main.js"></script>`.
 *
 * Suggested approach: read `document.body.dataset.page` on each HTML page
 * (e.g., <body data-page="login">) and dispatch to the right init function.
 *
 * Alternatives: separate script per page; client-side router (overkill for now).
 *
 * TODO:
 *   [ ] Import init functions from each module
 *   [ ] Read which page we're on
 *   [ ] Dispatch to the right init()
 *   [ ] Add a top-level try/catch + window.onerror for unhandled errors
 *   [ ] Redirect to /login.html if no token (except on login page itself)
 */

import { initLogin, initLogout } from "./modules/auth.js";
// import { initDashboard } from "./modules/dashboard.js";
import { initTicketsList } from "./modules/tickets.js";
// import { initTicketDetail } from "./modules/ticketDetail.js";

console.log("DeskHub booting…");

const page = document.body.dataset.page;

// Dashboard initialization function
function initDashboard() {
    console.log("🏠 Dashboard initialized");
    
    // Initialize logout button functionality
    initLogout("#logout-btn");
    
    // Show user welcome message
    showUserWelcome();
}

function showUserWelcome() {
    // Get current user from storage  
    const user = JSON.parse(localStorage.getItem('deskhub:user') || '{}');
    
    if (user.name) {
        const welcomeElement = document.getElementById('user-welcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome back, ${user.name}! (${user.role})`;
        }
    }
}

if (!page) {
    console.error("No data-page attribute found on <body>. Add data-page='pagename' to your HTML.");
  }
console.log(`📄 Current page: ${page}`);

switch (page) {
  case "login":         initLogin(); break;
  case "dashboard":     initDashboard(); break;
  case "tickets":       initTicketsList(); break;
  case "tickets-list":  initTicketsList(); break;
  case "ticket-detail": initTicketDetail(); break;
  default: console.warn("Unknown page:", page);
}
