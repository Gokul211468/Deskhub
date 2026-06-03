/**
 * modules/auth.js — Login Page UI
 *
 * Wires up the login form and logout button.
 *
 * Expected HTML elements (you create these in public/login.html):
 *   - <form id="login-form"> with <input name="email"> and <input name="password">
 *   - <button id="login-submit">
 *   - <div id="login-error"> (hidden by default)
 *
 * For logout — add an event listener on a logout button on every authed page.
 *
 * TODO:
 *   [ ] initLogin()
 *       - on form submit: prevent default, read email + password
 *       - call api/auth.login(email, password)
 *       - on success: store token + user, redirect to /dashboard.html
 *       - on failure: show error message in #login-error
 *       - manage button disabled / loading state
 *   [ ] initLogout(buttonSelector)
 *       - on click: call api/auth.logout(), redirect to /index.html
 *   [ ] requireAuth() — call at the top of every protected page; redirect to login if no token
 */

import * as authApi from "../api/auth.js";

export function initLogin() {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');
    const submitButton = document.getElementById('login-submit');
    // Ensure all elements exist
    if (!form || !errorDiv || !submitButton) {
      console.error('Login form elements not found');
      return;
    }
    // Handle form submission
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Don't submit form normally
      // Get form data
      const formData = new FormData(form);
      const email = formData.get('email');
      const password = formData.get('password');
      // Basic validation
      if (!email || !password) {
        showError('Please enter both email and password');
        return;
      }
      // Show loading state
      setLoading(true);
      try {
        // Attempt login
        await authApi.login(email, password);
        
        // Success - redirect to dashboard
        window.location.href = 'dashboard.html';
      } catch (error) {
        // Show error message
        showError(error.message);
        setLoading(false);
      }
    });
    // Helper functions
    function showError(message) {
      errorDiv.textContent = message;
      errorDiv.hidden = false;
    }
    function setLoading(isLoading) {
      submitButton.disabled = isLoading;
      submitButton.textContent = isLoading ? 'Signing In...' : 'Sign In';
    }
}

export function initLogout(selector = "#logout-btn") {
    const logoutButton = document.querySelector(selector);
    if (!logoutButton) {
      console.warn(`Logout button not found: ${selector}`);
      return;
    }
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();
      
      // Logout and redirect
      authApi.logout();
      window.location.href = 'index.html';
    });
}

export function requireAuth() {
    if (!authApi.isAuthenticated()) {
        window.location.href = 'index.html';
        return false;
      }
    return true;
}
