/** @typedef {import('./project.js').Project} Project */

const STORAGE_KEY = 'projects';

/**
 * Persists the projects array to localStorage, overwriting anything saved.
 *
 * @param {Project[]} projects - The projects to save.
 * @returns {void}
 * @throws {DOMException} If storage is full or unavailable (e.g. Safari private browsing).
 */
const save = (projects) => localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

/**
 * Reads the saved projects from localStorage.
 *
 * The returned objects are plain data revived from JSON, not instances of any
 * class, and any `Date` values will have become ISO strings.
 *
 * @returns {Project[]|null} The saved projects, or `null` if nothing is stored or the stored data is unreadable.
 */
const load = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
};

export { save, load };