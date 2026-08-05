/** @typedef {import('./task.js').Task} Task */

/**
 * @typedef {Object} Project
 * @property {string} id - A randomly generated UUID.
 * @property {string} title - The project's title.
 * @property {Task[]} tasks - The project's tasks. Empty for a new project.
 * @property {boolean} isOpen - Whether the project is open. Always `true` for a new project.
 */

/**
 * Creates a new, empty project.
 *
 * @param {string} title - The project's title.
 * @returns {Project} The newly created project.
 *
 * @example
 * createProject('Kitchen remodel');
 * // → { id: '...', title: 'Kitchen remodel', tasks: [], isOpen: true }
 */
const createProject = (title) => {
    return {
        id: crypto.randomUUID(),
        title: title,
        tasks: [],
        isOpen: true,
    }
}

export { createProject }