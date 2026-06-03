/**
 * utils/storage.js
 *
 * Tiny wrapper around localStorage that:
 *   - Auto JSON.stringifies on set
 *   - Auto JSON.parses on get
 *   - Returns null on missing key (not undefined)
 *   - Catches QuotaExceeded / serialisation errors
 *
 * Use this everywhere instead of localStorage directly. Easier to swap for
 * sessionStorage or an in-memory store later.
 *
 * Common keys you'll use:
 *   "deskhub:token"   — auth token string
 *   "deskhub:user"    — current user object
 *   "deskhub:filters" — last applied tickets-list filters (stretch)
 *
 * TODO:
 *   [ ] get(key)            — returns parsed value, or null
 *   [ ] set(key, value)     — JSON.stringify, set, return true/false on success
 *   [ ] remove(key)
 *   [ ] clear()             — only clear keys with our "deskhub:" prefix (don't nuke other apps)
 */

const PREFIX = "deskhub:";

export function get(key, defaultValue = null) {
    try {
        if(typeof localStorage === "undefined"){
            console.log("localStorage is not available");
            return defaultValue;
        }
        const prefixedKey = PREFIX + key;
        const item = localStorage.getItem(prefixedKey);

        if(item === null) return defaultValue;

        return JSON.parse(item);

    } catch (error) {
        console.warn(`failed to get storage item ${key}:`, error.message);
        return defaultValue;
    }
}

export function set(key, value) {
    try {
        if(typeof localStorage === "undefined"){
            console.log("localStorage is not available");
        }

        const prefixedKey = PREFIX + key;
        const serializedValue = JSON.stringify(value);

        localStorage.setItem(prefixedKey, serializedValue);
    } catch (error) {
        if(error.name === 'QuotaExceededError'){
            console.log("localStorage quota exceeded. Consider clearing old data")
        }
        else{
            console.warn(`failed to get storage item ${key}:`, error.message)
        }
    }
}

export function remove(key) {
    try {
        if(typeof localStorage === "undefined"){
            console.log("localStorage is not available");
        }
        const prefixedKey = PREFIX + key;
        localStorage.removeItem(prefixedKey);

    } catch (error) {
        console.warn(`Failed to remove storage item "${key}":`, error.message);
    }
}

export function clear() {
    try {
        if(typeof localStorage === "undefined"){
            console.log("localStorage is not available");
        }

        let clearedCount = 0;
        const keysToRemove = [];

        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if(key && key.startsWith(PREFIX)){
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach((key)=>{
            localStorage.removeItem(key);
            clearedCount++;
        });

        console.log(`Cleared ${clearedCount} DeskHub storage items`);
    } catch (error) {
        console.warn('Failed to clear storage:', error.message);
    }
}
