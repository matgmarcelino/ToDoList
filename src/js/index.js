import "../style.css";
import * as sidebar from "./components/sidebar.js";
import * as header from './components/header.js';
import * as main from './components/main.js';
import createProjectDialog from './components/newProjectDialog.js';
import createAddTaskDialog from './components/addTaskDialog.js';
import { Task } from './api/task.js';
import { Project } from './api/project.js';

const projects = [];

// helper functions
const createAndAppendProject = (project) => {
    if (projects.includes(project)) return;
    projects.push(project);
    sidebar.createProject(project.getName());
}

const appendSidebar = (() => {
    document.body.append(sidebar.createSidebar());

    const newProjectBtn = document.querySelector('.sidebar-new-project-btn');
    newProjectBtn.addEventListener('click', e => {
        const dialog = createProjectDialog();
        document.body.append(dialog);

        const createBtn = dialog.querySelector('#createProjectDialogCreateBtn');
        createBtn.addEventListener('click', e => {
            const projectName = dialog.querySelector('#createProjectDialogInput').value;
            if (!projectName) return;

            const project = new Project(projectName);
            createAndAppendProject(project);
            dialog.remove();
        });

        const cancelBtn = dialog.querySelector('#createProjectDialogCancelBtn');
        cancelBtn.addEventListener('click', e => dialog.remove());

        dialog.showModal();
    });
})();

// create default task
const myTasks = new Project('My Tasks');
createAndAppendProject(myTasks);

const appendHeader = (() => {
    document.body.append(header.createHeader());
    header.setProjectName(myTasks.getName());

    const addTaskBtn = document.querySelector('#addTaskBtn');
    addTaskBtn.addEventListener('click', e => {
        const dialog = createAddTaskDialog();

        const addTaskDialogAddBtn = dialog.querySelector('#addTaskDialogAddBtn');
        addTaskDialogAddBtn.addEventListener('click', e => {
            const currentProject = document.querySelector('#headerProjectName').textContent;

            const formValues = (() => {
                const values = [];

                const title = document.querySelector('#title').value;
                const description = document.querySelector('#description').value;
                const dueDate = document.querySelector('#dueDate').value;
                const priority = document.querySelector('#priority').value;

                values.push(title, description, dueDate, priority, currentProject);

                return values;
            })();

            let validInputs = true;
            formValues.forEach((val, i) => i !== 1 && !val ? validInputs = false : null);
            if (!validInputs) return;
            
            // adding task to sidebar and projects

            const task = new Task(...formValues);
            sidebar.addTaskToProject(task.title, currentProject);
            
            const cur = projects.find(p => p.getName() === currentProject);
            cur.addTask(task);

            document.body.querySelector('main')?.remove();
            document.body.append(main.createMain(cur.getTasks()));

            // adding event listener to sidebar
            const currentProjectElement = document.querySelector(`[data-title="${currentProject}"]`);
            const taskElement = currentProjectElement.querySelector(`[data-title="${task.title}"]`);
            const trashIconElement = taskElement.querySelector('svg');
            trashIconElement.addEventListener('click', e => {
                const taskTitle = e.target.parentNode.dataset.title;
                const projectTitle = e.target.parentNode.parentNode.dataset.title;
                console.log(projectTitle)

                const curProj = projects.find(p => p.getName() === projectTitle);
                
                const curTask = curProj.getTasks().find(t => t.title === taskTitle);

                curProj.deleteTask(curTask);
                sidebar.removeTaskOfProject(taskTitle, projectTitle);
            })
            dialog.remove();
        });

        const addTaskDialogCancelBtn = dialog.querySelector('#addTaskDialogCancelBtn');
        addTaskDialogCancelBtn.addEventListener('click', e => dialog.remove());

        document.body.append(dialog);
        dialog.showModal();
    });

    const deleteProjectBtn = document.querySelector('#deleteProjectBtn');
    deleteProjectBtn.classList.add('disabled');
    deleteProjectBtn.addEventListener('click', e => {
        console.log('clicked')
        return; // TODO
    });

})();

const appendMain = (() => {
    document.body.append(main.createMain(myTasks.getTasks()));
})();

// switching projects when clicked on sidebar
const selectProject = (project) => {
    // sidebar section
    // closing all other dropdowns
    const projectDivs = document.querySelectorAll('.project');
    projectDivs.forEach(p => p.classList.remove('open'));

    const selectedProject = document.querySelector(`[data-title="${project.getName()}"]`);
    if (!selectedProject) return;
    selectedProject.classList.add('open');
    

    // header section
    const headerProject = document.querySelector('#headerProjectName');
    headerProject.textContent = project.getName();

    // load tasks
    document.querySelector('main')?.remove();
    document.body.append(main.createMain(project.getTasks()));
}

selectProject(myTasks);

const sidebarProjects = document.querySelector('.sidebar-projects');
sidebarProjects.addEventListener('click', e => {
    const projectEl = e.target.closest('.project');
    if (!projectEl) return;
    const targetName = projectEl.dataset.title;
    const selectedProject = projects.find((p) => p.getName() === targetName);
    selectProject(selectedProject);
});





