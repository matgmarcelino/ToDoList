import * as ProjectsManager from '../api/projectsManager.js';
import { sharedState } from '../index.js'

const dialog = document.querySelector('#editProjectModal');

const validateInput = (projectTitle) => {
    const message = dialog.querySelector('p');
    if (!projectTitle) {
        message.classList.add('invalid');
        p.textContent = 'This is required!';
        return false;
    }
    message.classList.remove('invalid');
    return true;
}

const openDialog = () => {
    dialog.showModal();

    const form = dialog.querySelector('#editProjectForm');
    
    const createBtn = dialog.querySelector('#editProjectModalCreateBtn');
    const cancelBtn = dialog.querySelector('#editProjectModalCancelBtn');

    createBtn.addEventListener('click', e => {
        if (!currentProject) throw new Error('No project selected!');

        const projectTitle = form.querySelector('#projectTitle').value;
        if (!validateInputs(projectTitle)) return;

        ProjectsManager.editProjectTitle(sharedState.project.id, projectTitle);
    })

    cancelBtn.addEventListener('click', e => {
        dialog.close();
    })
}