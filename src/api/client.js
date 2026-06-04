/**
 * api/client.js — Generic Fetch Wrapper
 *
 * One place where ALL HTTP requests go through. Centralises:
 *   - Base URL ("http://localhost:3001")
 *   - JSON parsing
 *   - Authorization header (read token from storage)
 *   - Error handling (throw on non-2xx with a useful message)
 *
 * Why a wrapper? So the rest of the code never imports `fetch` directly.
 * Easier to add features later (retry, logging, cancellation, mocking for tests).
 *
 * Usage you should aim for in other files:
 *   import { get, post, patch, del } from "../api/client.js";
 *   const tickets = await get("/tickets?status=open");
 *   const newOne  = await post("/tickets", { title: "..." });
 *
 * TODO:
 *   [ ] Implement request(path, options)
 *       - prepend BASE_URL
 *       - if body, JSON.stringify it and set Content-Type
 *       - read token from storage and add Authorization header if present
 *       - await fetch
 *       - if !response.ok, throw an Error with status + message
 *       - return response.json() (or null for 204)
 *   [ ] Export shorthands: get, post, patch, put, del
 *   [ ] Handle network errors (TypeError from fetch) with a friendly message
 */

import { get as getStored } from "../utils/storage.js";

const BASE_URL = "http://localhost:3001";

export async function request(path, options = {}) {
  try {
    const {method = 'GET', body, headers: customHeaders = {}, skipAuth = false, ...otherOptions } = options;

    const url = BASE_URL + path;

    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders
    }

    if(!skipAuth){
      const token = getStored('token');
      if(token){
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config = {
      method: method.toUpperCase(),
      headers,
      ...otherOptions
    };

    if(body && method.toUpperCase() !== 'GET'){
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);
    await handleResponse(response, path, method);

    const data = await parseResponseBody(response);

    return data;

  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      const networkError = new Error(
        'Network error: Please check your internet connection or ensure the API server is running at ' + BASE_URL
      );
      networkError.name = 'NetworkError';
      networkError.original = error;
      throw networkError;
    }

    throw error;
  }
  //throw new Error("api/client.js: request() not implemented yet");
}


async function handleResponse(response, path, method) {
  if (response.ok) {
    return; // 200-299 status codes
  }
  // Try to get error message from response body
  let errorMessage = `${method.toUpperCase()} ${path} failed`;
  let errorDetails = null;
  try {
    const errorBody = await response.clone().json();
    errorMessage = errorBody.message || errorBody.error || errorMessage;
    errorDetails = errorBody;
  } catch {
    // If response isn't JSON, use status text
    errorMessage = response.statusText || errorMessage;
  }
  // Create specific error based on status code
  const error = new Error(`HTTP ${response.status}: ${errorMessage}`);
  error.status = response.status;
  error.statusText = response.statusText;
  error.path = path;
  error.method = method;
  error.details = errorDetails;
  // Add helpful context for common errors
  if (response.status === 401) {
    error.message = 'Authentication failed. Please log in again.';
    error.name = 'AuthenticationError';
  } else if (response.status === 403) {
    error.message = 'Permission denied. You don\'t have access to this resource.';
    error.name = 'AuthorizationError';
  } else if (response.status === 404) {
    error.message = `Resource not found: ${path}`;
    error.name = 'NotFoundError';
  } else if (response.status >= 500) {
    error.message = 'Server error. Please try again later.';
    error.name = 'ServerError';
  }
  throw error;
}

async function parseResponseBody(response) {
  // Handle empty responses (204 No Content, etc.)
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }
  // Check content type
  const contentType = response.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (error) {
      console.warn('Failed to parse JSON response:', error);
      return null;
    }
  }
  // For non-JSON responses, return as text
  return await response.text();
}

/**
 * GET JSON and read X-Total-Count (json-server pagination).
 * Use this instead of get() when you need the full collection size.
 */


export async function getWithTotal(path, options = {}) {
  const { skipAuth = false, headers: customHeaders = {} } = options;
  try {
    const url = BASE_URL + path;
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };
    if (!skipAuth) {
      const token = getStored("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, { method: "GET", headers });
    await handleResponse(response, path, "GET");

    const items = await parseResponseBody(response);
    const raw = response.headers.get("X-Total-Count");
    const total =
      raw != null && raw !== ""
        ? Number(raw)
        : Array.isArray(items)
          ? items.length
          : 0;

    return { items, total };
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      const networkError = new Error(
        "Network error: Please check your internet connection or ensure the API server is running at " +
          BASE_URL
      );
      networkError.name = "NetworkError";
      networkError.original = error;
      throw networkError;
    }
    throw error;
  }
}




// TODO: shorthand exports
// export const get   = (path)         => request(path);
// export const post  = (path, body)   => request(path, { method: "POST",   body });
// export const patch = (path, body)   => request(path, { method: "PATCH",  body });
// export const put   = (path, body)   => request(path, { method: "PUT",    body });
// export const del   = (path)         => request(path, { method: "DELETE" });


export const get = (path, options = {}) =>{
  return request(path, {method: 'GET', ...options});
};

// export const post = (path, body, options = {}) =>{
//   return request(path, body, {method: 'POST', ...options});
// };

export const post = (path, body, options = {}) =>
  request(path, { method: "POST", body, ...options });

export const patch = (path, body, options = {}) => {
  return request(path, { method: 'PATCH', body, ...options });
};

export const put = (path, body, options = {}) => {
  return request(path, { method: 'PUT', body, ...options });
};

export const del = (path, options = {}) => {
  return request(path, { method: 'DELETE', ...options });
};