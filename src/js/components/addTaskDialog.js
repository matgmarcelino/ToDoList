const createDialog = () => {
    const dialog = document.createElement('dialog');
    dialog.id = 'addTaskDialog';

    const h2 = document.createElement('h2');
    h2.textContent = 'Add Task';

    const form = (() => {
        const form = document.createElement('form');
        form.id = 'addTaskDialogForm';

        const titleField = (() => {
            const field = document.createElement('div');
            field.classList.add('field');

            const label = document.createElement('label');
            label.htmlFor = 'title';
            label.textContent = 'Title';

            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'title';
            input.required = true;

            field.append(label, input);
            return field;
        })();

        const dueDateField = (() => {
            const field = document.createElement('div');
            field.classList.add('field');

            const label = document.createElement('label');
            label.htmlFor = 'dueDate';
            label.textContent = 'Due Date';

            const input = document.createElement('input');
            input.type = 'date';
            input.id = 'dueDate';
            input.required = true;

            field.append(label, input);
            return field;
        })();

        const priorityField = (() => {
            const field = document.createElement('div');
            field.classList.add('field');

            const label = document.createElement('label');
            label.htmlFor = 'priority';
            label.textContent = 'Priority';

            const select = (() => {
                const selectDiv = document.createElement('select');
                selectDiv.name = 'priority';
                selectDiv.id = 'priority';
                selectDiv.required = true;

                const optionDefault = document.createElement('option');
                optionDefault.disabled = true;
                optionDefault.selected = true;
                optionDefault.textContent = 'Select an option...';

                const createOption = (val) => {
                    const option = document.createElement('option');
                    option.value = val;
                    option.textContent = val.charAt(0).toUpperCase() + val.slice(1);
                    return option;
                }

                const optionHigh = createOption('high');
                const optionMedium = createOption('medium');
                const optionLow = createOption('low');
                
                selectDiv.append(optionDefault, optionHigh, optionMedium, optionLow);
                return selectDiv;
            })();

            field.append(label, select);
            return field;
        })();

        const descriptionField = (() => {
            const field = document.createElement('div');
            field.classList.add('field');

            const label = document.createElement('label');
            label.htmlFor = 'description';
            label.textContent = 'Description';

            const textarea = document.createElement('textarea');
            textarea.name = 'description';
            textarea.id = 'description';
            textarea.cols = 30;
            textarea.rows = 10;

            field.append(label, textarea);
            return field;
        })();

        form.append(titleField, dueDateField, priorityField, descriptionField);
        return form;
    })();

    const btnGroup = (() => {
        const div = document.createElement('div');
        div.classList.add('btn-group');

        const addTaskDialogAddBtn = document.createElement('button');
        addTaskDialogAddBtn.id = 'addTaskDialogAddBtn';
        addTaskDialogAddBtn.textContent = 'Add';

        const AddTaskDialogCancelBtn = document.createElement('button');
        AddTaskDialogCancelBtn.id = 'addTaskDialogCancelBtn';
        AddTaskDialogCancelBtn.textContent = 'Cancel';

        div.append(addTaskDialogAddBtn, AddTaskDialogCancelBtn);
        return div;
    })();

    dialog.append(h2, form, btnGroup);
    return dialog;
}

export default createDialog;