/**
 * Utility functions for interacting with localStorage
 */

const STORAGE_KEYS = {
    DRAWER_STATE: "game-hub-drawer-state",
    // Add more storage keys as needed for user preferences
};

/**
 * Get an item from localStorage
 * @param {string} key - The key to retrieve
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The stored value or defaultValue
 */
export const getStoredItem = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error getting item from localStorage: ${error}`);
        return defaultValue;
    }
};

/**
 * Store an item in localStorage
 * @param {string} key - The key to store under
 * @param {*} value - The value to store
 */
export const setStoredItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item in localStorage: ${error}`);
    }
};

/**
 * Remove an item from localStorage
 * @param {string} key - The key to remove
 */
export const removeStoredItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing item from localStorage: ${error}`);
    }
};

/**
 * Get the stored drawer state
 * @param {boolean} defaultState - Default state if not stored
 * @returns {boolean} The drawer state
 */
export const getDrawerState = (defaultState = true) => {
    return getStoredItem(STORAGE_KEYS.DRAWER_STATE, defaultState);
};

/**
 * Store the drawer state
 * @param {boolean} isOpen - The drawer state
 */
export const setDrawerState = (isOpen) => {
    setStoredItem(STORAGE_KEYS.DRAWER_STATE, isOpen);
};

export default {
    STORAGE_KEYS,
    getStoredItem,
    setStoredItem,
    removeStoredItem,
    getDrawerState,
    setDrawerState,
};
