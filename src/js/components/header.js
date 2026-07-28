const createHeader = () => {
    const header = document.createElement('header');

    const h2 = document.createElement('h2');
    h2.id = 'headerProjectName';

    const btnGroup = (() => {
        const div = document.createElement('div');
        div.classList.add('btn-group');

        const addTaskBtn = document.createElement('button');
        addTaskBtn.id = 'addTaskBtn';
        addTaskBtn.textContent = 'Add Task';

        const deleteProjectBtn = document.createElement('button');
        deleteProjectBtn.id = 'deleteProjectBtn';
        deleteProjectBtn.textContent = 'Delete';

        div.append(addTaskBtn, deleteProjectBtn);
        return div;
    })();
    
    header.append(h2, btnGroup);
    return header;
}

const setProjectName = (name) => {
    if (!name) return;
    const h2 = document.querySelector('#headerProjectName');
    h2.textContent = name;
}

export { createHeader, setProjectName };