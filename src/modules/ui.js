/**
 * modules/ui.js — UI Primitives (Toast, Modal, Loader)
 *
 * Reusable UI bits used across pages.
 *
 * Suggested approach: each function appends/manipulates a fixed-position element.
 * No framework — just create elements with document.createElement.
 *
 * TODO:
 *   [ ] showToast(message, type = "info")
 *       - types: "info", "success", "error", "warning"
 *       - auto-dismiss after 3 seconds
 *       - stack multiple if called rapidly
 *   [ ] openModal(contentNode | htmlString)
 *       - dim background, render modal in centre
 *       - close on Esc, click outside, or close button
 *       - return a promise that resolves on close (with whatever the modal returns)
 *   [ ] closeModal()
 *   [ ] showLoader() / hideLoader()
 *       - simple overlay or spinner; could be inline or full-screen
 *   [ ] confirmDialog(message) — returns a Promise<boolean>; uses your modal
 */

// export function showToast(message, type = "info") {
//   // TODO
// }

// export function openModal(content) {
//   // TODO
// }

// export function closeModal() {
//   // TODO
// }

// export function showLoader() {
//   // TODO
// }

// export function hideLoader() {
//   // TODO
// }

// export function confirmDialog(message) {
//   // TODO
// }



const TOAST_DURATION_MS = 3000;

let toastHost = null;
let modalBackdrop = null;
let modalResolver = null;
let modalKeyHandler = null;
let previousActiveElement = null;

const TOAST_TYPES = new Set(["info", "success", "error", "warning"]);

function ensureToastHost() {
  if (toastHost && document.body.contains(toastHost)) return toastHost;
  toastHost = document.createElement("div");
  toastHost.id = "dh-toast-host";
  toastHost.className = "dh-toast-host";
  toastHost.setAttribute("aria-live", "polite");
  document.body.appendChild(toastHost);
  return toastHost;
}


export function showToast(message, type = "info") {
  const variant = TOAST_TYPES.has(type) ? type : "info";
  const host = ensureToastHost();
  const el = document.createElement("div");
  el.className = `dh-toast dh-toast--${variant}`;
  el.setAttribute("role", "status");
  el.textContent = String(message ?? "");

  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add("dh-toast--visible"));

  const remove = () => {
    el.classList.remove("dh-toast--visible");
    el.addEventListener(
      "transitionend",
      () => {
        el.remove();
        if (host.childElementCount === 0) {
          host.remove();
          toastHost = null;
        }
      },
      { once: true }
    );
    window.setTimeout(() => {
      if (el.isConnected) el.remove();
    }, 400);
  };

  window.setTimeout(remove, TOAST_DURATION_MS);
}

function teardownModal(result) {
  if (modalKeyHandler) {
    document.removeEventListener("keydown", modalKeyHandler);
    modalKeyHandler = null;
  }
  if (modalBackdrop) {
    modalBackdrop.remove();
    modalBackdrop = null;
  }
  const resolve = modalResolver;
  modalResolver = null;
  if (typeof resolve === "function") {
    resolve(result);
  }
  if (previousActiveElement && typeof previousActiveElement.focus === "function") {
    previousActiveElement.focus();
  }
  previousActiveElement = null;
}


export function closeModal(result) {
  if (!modalBackdrop) return;
  teardownModal(result);
}


export function openModal(content, options = {}) {
  if (modalBackdrop) {
    teardownModal(undefined);
  }

  const { title } = options;

  return new Promise((resolve) => {
    modalResolver = resolve;
    previousActiveElement = document.activeElement;

    const backdrop = document.createElement("div");
    backdrop.className = "dh-modal-backdrop";
    backdrop.setAttribute("role", "presentation");

    const panel = document.createElement("div");
    panel.className = "dh-modal-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    if (title) panel.setAttribute("aria-labelledby", "dh-modal-title");

    const header = document.createElement("div");
    header.className = "dh-modal-header";

    const titleEl = document.createElement("div");
    titleEl.id = "dh-modal-title";
    titleEl.className = "dh-modal-title";
    titleEl.textContent = title || "";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "dh-modal-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = "&times;";

    header.append(titleEl, closeBtn);

    const body = document.createElement("div");
    body.className = "dh-modal-body";
    if (typeof content === "string") {
      body.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      body.appendChild(content);
    }

    panel.append(header, body);
    backdrop.appendChild(panel);
    document.body.appendChild(backdrop);
    modalBackdrop = backdrop;

    const close = () => closeModal(undefined);

    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });

    modalKeyHandler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", modalKeyHandler);

    const focusable = panel.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && typeof focusable.focus === "function") {
      focusable.focus();
    } else {
      closeBtn.focus();
    }
  });
}


export function confirmDialog(message, opts = {}) {
  const { okText = "OK", cancelText = "Cancel", title = "Confirm" } = opts;

  const wrap = document.createElement("div");
  wrap.className = "dh-confirm";

  const p = document.createElement("p");
  p.className = "dh-confirm-message";
  p.textContent = String(message ?? "");

  const actions = document.createElement("div");
  actions.className = "dh-modal-actions";

  const btnCancel = document.createElement("button");
  btnCancel.type = "button";
  btnCancel.className = "btn-secondary";
  btnCancel.textContent = cancelText;

  const btnOk = document.createElement("button");
  btnOk.type = "button";
  btnOk.className = "btn-primary";
  btnOk.textContent = okText;

  actions.append(btnCancel, btnOk);
  wrap.append(p, actions);

  const promise = openModal(wrap, { title });

  btnCancel.addEventListener("click", () => closeModal(false));
  btnOk.addEventListener("click", () => closeModal(true));

  return promise.then((v) => v === true);
}