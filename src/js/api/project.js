export function Project(name) {
    this.name = name;
    const tasks = [];

    const addTask = (task) => {
        if (tasks.includes(task)) return;
        tasks.push(task);
        tasks.sort((a, b) => a.dueDate - b.dueDate);
    }

    const deleteTask = (task) => {
        const index = tasks.findIndex((t) => t === task);
        if (index >= 0) tasks.splice(index, 1);
    }

    const getTasks = () => [...tasks];

    const getName = () => this.name;
    const setName = (name) => this.name = name;

    return { addTask, deleteTask, getTasks, getName, setName };
}
