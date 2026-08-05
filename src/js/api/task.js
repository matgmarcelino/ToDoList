/**
 * @typedef {Object} TaskInput
 * @property {string} title - The task's title. Required; a missing or empty value throws.
 * @property {Date} [dueDate] - When the task is due. Defaults to the end of the current day (23:59:59.999).
 * @property {'low'|'medium'|'high'|null} [priority] - The task's priority. Omit it or pass `null` for no priority.
 * @property {string} [description] - Longer details about the task. Defaults to an empty string.
 */

/**
 * @typedef {Object} Task
 * @property {string} id - A randomly generated UUID.
 * @property {string} title
 * @property {Date} dueDate
 * @property {'low'|'medium'|'high'|null} priority - `null` when the task has no priority set.
 * @property {string} description
 * @property {boolean} done - Always `false` for a newly created task.
 */

/**
 * Creates a new task object from the given data, filling in defaults for the
 * optional fields.
 *
 * @param {TaskInput} data - The values to build the task from.
 * @returns {Task} The newly created task.
 * @throws {Error} If `data.title` is missing or falsy.
 *
 * @example
 * createTask({ title: 'Buy milk', priority: 'low' });
 *
 * @example
 * // Priority is optional
 * createTask({ title: 'Water plants' }).priority; // → null
 */
const createTask = (data) => {
    if (!data.title) throw new Error('Task must have a title.');

    const title = data.title;
    const dueDate = data.dueDate ?? new Date(new Date().setHours(23, 59, 59, 999));
    const priority = data.priority ?? null;
    const description = data.description ?? '';
    const done = false;
    const id = crypto.randomUUID();

    return {
        id: id,
        title: title,
        dueDate: dueDate,
        priority: priority,
        description: description,
        done: done,
    }
}

export { createTask }