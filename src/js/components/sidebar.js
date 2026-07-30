import * as ProjectsManager from '../api/projectsManager.js';

const sidebarProjectsDiv = document.querySelector('.sidebar-projects');

const createProjectElement = (projectTitle, projectID) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    const projectHeaderDiv = (() => {
        const temp = document.createElement('h3');
        temp.classList.add('project-header');

        const projectTitleSpan = document.createElement('span');
        projectTitleSpan.classList.add('project-title');
        projectTitleSpan.textContent = projectTitle;

        const chevronSpan = document.createElement('span');
        chevronSpan.classList.add('chevron');
        chevronSpan.textContent = '▶';

        temp.append(projectTitleSpan, chevronSpan);
        return temp;
    })();

    projectHeaderDiv.addEventListener('click', e => 
        projectHeaderDiv.parentElement.classList.toggle('open'));

    const tasks = document.createElement('div');
    tasks.classList.add('tasks');

    const tasksInner = document.createElement('div');
    tasksInner.classList.add('tasks-inner');

    tasks.append(tasksInner);
    projectDiv.append(projectHeaderDiv, tasks);
    sidebarProjectsDiv.append(projectDiv);
}

const createTaskElement = (taskID, projectID) => {

}

export { createProjectElement };