import { format } from './date-fns';

class Task {
    title;
    description;
    priority;
    complete;
    #dueDate;
    #assignedProject;

    constructor(title, description, dueDate, priority, complete) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.complete = false;
        this.#dueDate = dueDate;
        this.#assignedProject = assignedProject;
    }

    get assignedProject() {
        return this.#assignedProject;
    }

}