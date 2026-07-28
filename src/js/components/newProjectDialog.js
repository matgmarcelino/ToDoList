const createDialog = () => {
    const dialog = document.createElement('dialog');
    dialog.id = 'createProjectDialog';

    const h2 = document.createElement('h2');
    h2.textContent = 'Create Project';

    const field = (() => {
        const div = document.createElement('div');
        div.classList.add('field');

        const label = document.createElement('label');
        label.htmlFor = 'createProjectDialogInput';
        label.textContent = 'Project Name';

        const input = document.createElement('input');
        input.id = 'createProjectDialogInput';
        input.type = 'text';
        input.required = true;

        div.append(label, input);
        return div;
    })();

    const btnGroup = (() => {
        const div = document.createElement('div');
        div.classList.add('btn-group');

        const createBtn = document.createElement('button');
        createBtn.id='createProjectDialogCreateBtn';
        createBtn.textContent = 'Create';

        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'createProjectDialogCancelBtn';
        cancelBtn.textContent = 'Cancel';

        div.append(createBtn, cancelBtn);
        return div;
    })();

    dialog.append(h2, field, btnGroup);
    return dialog;
}

export default createDialog;