/**
 * api/auth.js — Authentication API
 *
 * For this project, auth is FAKED — there's no real password hashing.
 * `users` collection in db.json has email + password fields in plaintext.
 *
 * To "log in":
 *   1. GET /users?email=<email>
 *   2. Check if password matches the returned user
 *   3. Generate a fake token (any random string, e.g., crypto.randomUUID())
 *   4. Return { token, user }
 *
 * IN REAL APPS: never check passwords client-side. The server checks them and
 * returns a signed JWT. We're faking this for learning.
 *
 * TODO:
 *   [ ] login(email, password) — returns { token, user }; throws "Invalid credentials" on mismatch
 *   [ ] logout() — clears local storage (token + user)
 *   [ ] getCurrentUser() — reads user from storage, returns null if missing
 *   [ ] isAuthenticated() — true if token exists
 */

import { get } from "./client.js";
import * as storage from "../utils/storage.js";

export async function login(email, password) {
    try {
        // Input validation
        if (!email || !password) {
          throw new Error('Email and password are required');
        }
        if (!isValidEmail(email)) {
          throw new Error('Please enter a valid email address');
        }
        // Query users API by email
        // json-server: GET /users?email=user@example.com returns array
        const users = await get(`/users?email=${encodeURIComponent(email)}`);
        
        // Check if user exists
        if (!users || users.length === 0) {
          throw new Error('Invalid email or password');
        }
        const user = users[0]; // json-server returns array, take first match
        // Verify password (in production, this happens server-side!)
        if (user.password !== password) {
          throw new Error('Invalid email or password');
        }
        // Generate fake JWT token
        const token = generateAuthToken(user);
        // Store authentication data
        storage.set('token', token);
        storage.set('user', sanitizeUser(user));

        return {
            token,
            user: sanitizeUser(user)
        };
    }
    catch(error){
        if (error.name === 'NetworkError') {
            throw new Error('Unable to connect to server. Please check your connection.');
          }
          
        throw error;
    }
}

export function logout() {
    const currentUser = getCurrentUser();
    // Clear authentication storage
    storage.remove('token');
    storage.remove('user');
}

export function getCurrentUser() {
    try {
        return storage.get('user');
      } catch (error) {
        console.warn('Failed to get current user:', error.message);
        return null;
      }
    
}

export function isAuthenticated() {
    const token = storage.get('token');
    const user = getCurrentUser();
    
    return Boolean(token && user && user.id);
}

function generateAuthToken(user) {
    // Create a fake JWT-like token with user info
    const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      iss: 'deskhub'
    }));
    
    // In production, there would be a server signature here
    const signature = btoa(crypto.randomUUID());
    
    return `${header}.${payload}.${signature}`;
  }


function sanitizeUser(user) {
    const { password, ...sanitized } = user;
    return {
        ...sanitized,
        loginTime: new Date().toISOString()
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}