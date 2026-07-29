function Task(title, description, dueDate, priority, projectAssigned) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectAssigned = projectAssigned;
    this.isComplete = false;
    this.id = crypto.randomUUID();
}

export {Task};