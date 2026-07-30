function Project(title) {
    this.title = title;
    this.id = crypto.randomUUID();

    const tasks = [];

    const addTask = (task) => {
        if (tasks.includes(task)) return;
        tasks.push(task);
        tasks.sort((a, b) => a.dueDate - b.dueDate);
    }

    const removeTask = (task) => {
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index === -1) throw new Error('Task not found!'); 
        
        tasks.splice(index, 1);
    }

    const setTitle = (title) => this.title = title;

    const getTasks = () => [...tasks];

    const getTitle = () => this.title;

    const getID = () => this.id;

    const setID = (id) => this.id = id;

    return { addTask, removeTask, getTasks, getTitle, setTitle, getID, setID };
}

export { Project };
