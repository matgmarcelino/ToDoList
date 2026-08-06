import { save } from "./storage.js";
import { createProject } from "./project.js";
import { createTask } from "./task.js";

const projects = [];
let activeProjectID;

// --- Setup and Reads ---

function init() {
  const stored = JSON.parse(localStorage.getItem("projects"));

  if (stored && stored.length > 0) {
    projects.push(...stored);
  } else {
    addProject("My Tasks", true);
  }

  setActiveProject(projects[0].id);
  save(projects);
}

function setActiveProject(id) {
  activeProjectID = id;
}

function getActiveProject() {
  return projects.find((p) => p.id === activeProjectID);
}

function getProjects() {
  return [...projects];
}

function getTask(projectID, taskID) {
  const project = findProject(projectID);
  if (!project) throw new Error("No such project found.");

  const task = project.tasks.find((t) => t.id === taskID);
  if (!task) throw new Error("No task found in the project.");

  return task;
}

// --- Project Mutations ---

function addProject(title, isDefault) {
  const project = createProject(title, isDefault);
  projects.push(project);

  save(projects);
  return project;
}

function deleteProject(id) {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx < 0) throw new Error("No such project found.");
  projects.splice(idx, 1);

  // never leave the app with zero projects to render
  if (projects.length === 0) {
    const fallback = createProject("My Tasks", true);
    projects.push(fallback);
  }

  // if the active project was the one removed, fall back to the first
  if (id === activeProjectID) {
    setActiveProject(projects[0].id);
  }

  save(projects);
}

function renameProject(id, title) {
  const project = findProject(id);
  if (!project) throw new Error("No such project found.");
  if (project.isDefault) throw new Error("The default project cannot be renamed.");
  project.title = title;

  save(projects);
}

function toggleProjectOpen(id) {
  const project = findProject(id);
  if (!project) throw new Error("No such project found.");

  project.isOpen = !project.isOpen;

  save(projects);
}

// --- Task Mutations ---

function addTask(projectID, data) {
  const project = findProject(projectID);
  if (!project) throw new Error("No such project found.");

  const task = createTask(data);
  project.tasks.push(task);

  save(projects);
  return task;
}

function deleteTask(projectID, taskID) {
  const project = findProject(projectID);
  if (!project) throw new Error("No such project found.");

  const taskIdx = project.tasks.findIndex((t) => t.id === taskID);
  if (taskIdx < 0) throw new Error("No task found in the project.");
  project.tasks.splice(taskIdx, 1);

  save(projects);
}

function updateTask(projectID, taskID, data) {
  const task = getTask(projectID, taskID);

  // merge instead of replace so id and done survive the edit
  Object.assign(task, {
    title: data.title,
    dueDate: data.dueDate,
    priority: data.priority ?? "none",
    description: data.description ?? "",
  });

  save(projects);
  return task;
}

function toggleTask(projectID, taskID) {
  const task = getTask(projectID, taskID);
  task.done = !task.done;

  save(projects);
}

// --- Helper functions ---

function findProject(id) {
  return projects.find((p) => p.id === id);
}

export {
  init,
  setActiveProject,
  getActiveProject,
  getProjects,
  getTask,
  addProject,
  deleteProject,
  renameProject,
  toggleProjectOpen,
  addTask,
  deleteTask,
  updateTask,
  toggleTask,
};