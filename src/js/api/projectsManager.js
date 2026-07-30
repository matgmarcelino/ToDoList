import { Task } from './task.js';
import { Project } from './project.js';
import { sharedState } from '../index.js';
import * as sidebar from '../components/sidebar.js';

const projects = [];

// helper function
const findProjectFromID = (projectID) => {
    const project = projects.find((p) => p.getID() === projectID);
    if (!project) throw new Error('Project not found!');

    return project;
}

// helper function
const findTaskFromID = (taskID, projectID) => {
    const project = findProjectFromID(projectID);

    const task = project.find((t) => t.id === taskID);
    if (!task) throw new Error('Task not found!');

    return task;
}

// Creates project instance and adds it to projects array
const createProject = (title) => {
    const project = new Project(title);
    if (projects.includes(project)) throw new Error('Project already exists!');

    projects.push(project);
}

// edits a project's title given the project id
const editProjectTitle = (projectID, projectTitle) => {
    const project = findProjectFromID(projectID);
    project.setTitle(projectTitle);
}

// Removes project from projects array
const removeProject = (projectID) => {
    const index = projects.findIndex((p) => p.getID() === projectID);
    if (index === -1) throw new Error('Project not found!');

    projects.splice(index, 1);
}

// verifies title, due date, and priority are valid, creates a task and adds it to the project
const createTask = (title, description, dueDate, priority, projectID) => {
    if (!title) throw new Error('No title assigned!');
    if (!dueDate) throw new Error('No due date assigned!');
    if (!priority) throw new Error('No priority assigned!');

    const project = findProjectFromID(projectID)
    const task = new Task(title, description, dueDate, priority, project);

    project.addTask(task);
}

// edits a task given the project id and updated task values as an array
const editTaskFromProject = (taskID, projectID, updatedTaskValues) => {
    const task = findTaskFromID(taskID, projectID);
    const [title, dueDate, priority, description] = [...updatedTaskValues];
    
    task.title = title;
    task.dueDate = dueDate;
    task.priority = priority;
    task.description = description;
}

// Removes task from the specified project
const removeTaskFromProject = (taskID, projectID) => {
    const project = findProjectFromID(projectID);
    const task = findTaskFromID(taskID, projectID);

    project.removeTask(task);
}

// returns a copy of projects
const getProjects = () => [...projects];

// creates a default project with id of 0
const createDefaultProject = () => {
    const project = new Project('My Tasks');
    project.id = 0;
    projects.push(project);
    sharedState.project = project;
    sidebar.createProjectElement(project.getTitle(), project.getID());
}

// completes task given the taskID and projectID
const completeTask = (taskID, projectID) => {
    const task = findTaskFromID(taskID, projectID);
    task.isComplete = true;
} 

// uncompletes task given the taskID and projectID
const uncompleteTask = (taskID, projectID) => {
    const task = findTaskFromID(taskID, projectID);
    task.isComplete = false;
}

export { createProject, removeProject, createTask, removeTaskFromProject, getProjects, createDefaultProject, completeTask, uncompleteTask, editProjectTitle, editTaskFromProject };


