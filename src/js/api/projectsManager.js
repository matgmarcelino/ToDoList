import { save } from './storage.js';
import { createProject } from './project.js';
import { createTask } from './task.js';

const projects = [];
let activeProjectID;

// --- Setup and Reads ---

function init() {
    const stored = JSON.parse(localStorage.getItem('projects'));

    if (stored) {
        projects.push(...stored);
        setActiveProject(projects[0].id);
    }
    else {
        addProject('My Tasks');
        setActiveProject(project.id);
    }
    
    save(projects);
}

function setActiveProject(id) { activeProjectID = id; }

function getActiveProject() { return activeProjectID; }

function getProjects() { return [...projects] }

// --- Project Mutations ---

function addProject(title) {
    const project = createProject(title);
    projects.push(project);

    save(projects);
}

function deleteProject(id) {
    const idx = projects.findIndex((p) => p.id === id);
    if (idx < 0) throw new Error('No such project found.');
    projects.splice(idx, 1);

    save(projects);
}

function renameProject(id, title) {
    const project = findProject(id)
    if (!project) throw new Error('No such project found.');
    project.title = title;

    save(projects);
}

function toggleProjectOpen(id) {
    const project = findProject(id)
    if (!project) throw new Error('No such project found.');

    project.isOpen = !project.isOpen;

    save(projects);
}

// --- Task Mutations ---

function addTask(projectID, data) {
    // finding and validating project
    const project = findProject(projectID);
    if (!project) throw new Error('No such project found.');

    // creating and adding task
    const task = createTask(data);
    projects.push(task);

    save(projectss);
}

function deleteTask(projectID, taskID) {
    // finding and validating project
    const project = findProject(projectID);
    if (!project) throw new Error('No such project found.');

    // finding and deleting task
    const taskIdx = project.findIndex((t) => t.id === taskID);
    if (taskIdx < 0) throw new Error('No task found in the project.');
    project.splice(taskIdx, 1);

    save(projects);
}

function editTask(projectID, taskID, data) {
    // finding and validating project
    const project = findProject(projectID);
    if (!project) throw new Error('No such project found.');

    // finding and editing task
    const taskIdx = project.findIndex((t) => t.id === taskID);
    if (taskIdx < 0) throw new Error('No task found in the project.');
    project[taskIdx] = createTask(data);

    save(projects);
}

function toggleTask(projectID, taskID) {
    // finding and validating project
    const project = findProject(projectID);
    if (!project) throw new Error('No such project found.');

    // finding and toggling task
    const task = project.find((t) => t.id === taskID);
    if (!task) throw new Error('No task found in the project.');
    task.done = !task.done;
    
    save(projects);
}

// --- Helper functions ---

function findProject(id) {
    return projects.find((p) => p.id === id);
}