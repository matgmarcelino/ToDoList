import "../style.css";
import * as projectsManager from "./api/projectsManager.js";
import * as modalsManager from "./components/modals.js";
import { renderCards } from "./components/cards.js";
import { renderHeader } from "./components/header.js";
import { renderSidebar } from "./components/sidebar.js";

const sidebar = document.querySelector("aside");
const header = document.querySelector("header");
const main = document.querySelector("main");
const taskModal = document.querySelector("#taskModal");
const projectModal = document.querySelector("#projectModal");

function refresh() {
  const projects = projectsManager.getProjects();
  const project = projectsManager.getActiveProject();

  renderSidebar(sidebar, projects, project.id);
  renderHeader(header, project);
  renderCards(main, project.tasks);
}

projectsManager.init();
refresh();

// Enter submits from any field except the textarea, where it inserts a newline.
submitOnEnter(taskModal, "#addTaskModalAddBtn");
submitOnEnter(projectModal, "#projectModalCreateBtn");

// Runs on every close, including Escape, which bypasses our close helpers.
taskModal.addEventListener("close", clearTaskEditingState);
projectModal.addEventListener("close", clearProjectEditingState);

// --- Switching and opening projects ---
sidebar.addEventListener("click", (e) => {
  const projectHeader = e.target.closest(".project-header");
  if (!projectHeader) return;

  const projectID = projectHeader.closest(".project").dataset.id;

  projectsManager.setActiveProject(projectID);
  projectsManager.toggleProjectOpen(projectID);
  refresh();
});

// --- Adding projects ---
sidebar.addEventListener("click", (e) => {
  const btn = e.target.closest(".sidebar-new-project-btn");
  if (!btn) return;

  openProjectModalForCreate();
});

// --- Project modal buttons ---
projectModal.addEventListener("click", (e) => {
  const submitBtn = e.target.closest("#projectModalCreateBtn");
  const cancelBtn = e.target.closest("#projectModalCancelBtn");

  if (cancelBtn) {
    closeProjectModal();
    return;
  }

  if (!submitBtn) return;

  const data = modalsManager.readProjectForm();
  if (!projectInputsAreValid(data)) return;

  const editingID = projectModal.dataset.editingId;

  if (editingID) {
    projectsManager.renameProject(editingID, data.title);
  } else {
    projectsManager.addProject(data.title);
  }

  closeProjectModal();
  refresh();
});

// --- Editing and deleting tasks from the sidebar ---
sidebar.addEventListener("click", (e) => {
  const taskDOM = e.target.closest(".task");
  if (!taskDOM) return;

  const taskID = taskDOM.dataset.id;
  const projectID = taskDOM.closest(".project").dataset.id;

  // the trash icon lives inside .task, so handle it first and stop
  if (e.target.closest(".task-trash-icon")) {
    projectsManager.deleteTask(projectID, taskID);
    refresh();
    return;
  }

  openTaskModalForEdit(projectID, taskID);
});

// --- Editing and completing tasks from the cards ---
main.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const taskID = card.dataset.id;
  const projectID = projectsManager.getActiveProject().id;

  if (e.target.closest(".checkbox")) {
    projectsManager.toggleTask(projectID, taskID);
    refresh();
    return;
  }

  if (e.target.closest(".card-header")) {
    openTaskModalForEdit(projectID, taskID);
  }
});

// --- Adding tasks, renaming and deleting projects ---
header.addEventListener("click", (e) => {
  const addTaskBtn = e.target.closest(".header-add-task-btn");
  const deleteProjectBtn = e.target.closest(".header-delete-project-btn");
  const projectTitle = e.target.closest(".header-project-title");

  if (addTaskBtn) {
    openTaskModalForCreate();
    return;
  }

  if (deleteProjectBtn) {
    const curProj = projectsManager.getActiveProject();
    projectsManager.deleteProject(curProj.id);
    refresh();
    return;
  }

  if (projectTitle) {
    const project = projectsManager.getActiveProject();
    if (project.isDefault) return;
    openProjectModalForEdit(project);
  }
});

// --- Task modal buttons ---
taskModal.addEventListener("click", (e) => {
  const submitBtn = e.target.closest("#addTaskModalAddBtn");
  const cancelBtn = e.target.closest("#addTaskModalCancelBtn");

  if (cancelBtn) {
    closeTaskModal();
    return;
  }

  if (!submitBtn) return;

  const data = modalsManager.readTaskForm();
  if (!taskInputsAreValid(data)) return;

  const editingID = taskModal.dataset.editingId;

  if (editingID) {
    projectsManager.updateTask(
      taskModal.dataset.editingProjectId,
      editingID,
      data,
    );
  } else {
    projectsManager.addTask(projectsManager.getActiveProject().id, data);
  }

  closeTaskModal();
  refresh();
});

// --- Shared modal helpers ---

function submitOnEnter(dialog, submitSelector) {
  dialog.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (e.target.tagName === "TEXTAREA") return;

    // a single-field form submits implicitly on Enter and reloads the page
    e.preventDefault();
    dialog.querySelector(submitSelector).click();
  });
}

// --- Task modal helpers ---

function openTaskModalForCreate() {
  clearTaskModalValues();
  clearTaskEditingState();
  setTaskModalSubmitLabel("Add");
  modalsManager.openModal("taskModal");
}

function openTaskModalForEdit(projectID, taskID) {
  const task = projectsManager.getTask(projectID, taskID);

  modalsManager.fillTaskForm(task);
  taskModal.dataset.editingId = taskID;
  taskModal.dataset.editingProjectId = projectID;
  setTaskModalSubmitLabel("Save");
  modalsManager.openModal("taskModal");
}

function closeTaskModal() {
  modalsManager.closeModal("taskModal");
}

function clearTaskEditingState() {
  delete taskModal.dataset.editingId;
  delete taskModal.dataset.editingProjectId;
}

function setTaskModalSubmitLabel(text) {
  taskModal.querySelector("#addTaskModalAddBtn").textContent = text;
}

function clearTaskModalValues() {
  taskModal.querySelector("#taskTitle").value = "";
  taskModal.querySelector("#dueDate").value = "";
  taskModal.querySelector("#priority").value = "none";
  taskModal.querySelector("#description").value = "";
}

function resetTaskModalMessages() {
  document.querySelector("#taskModalTitleMessage").classList.remove("invalid");
  document.querySelector("#taskModalDueDateMessage").classList.remove("invalid");
}

function taskInputsAreValid(data) {
  resetTaskModalMessages();

  let valid = true;

  if (!data.title) {
    document.querySelector("#taskModalTitleMessage").classList.add("invalid");
    valid = false;
  }

  if (!data.dueDate) {
    document.querySelector("#taskModalDueDateMessage").classList.add("invalid");
    valid = false;
  }

  return valid;
}

// --- Project modal helpers ---

function openProjectModalForCreate() {
  projectModal.querySelector("#projectTitle").value = "";
  clearProjectEditingState();
  setProjectModalSubmitLabel("Create");
  modalsManager.openModal("projectModal");
}

function openProjectModalForEdit(project) {
  modalsManager.fillProjectForm(project);
  projectModal.dataset.editingId = project.id;
  setProjectModalSubmitLabel("Save");
  modalsManager.openModal("projectModal");
}

function closeProjectModal() {
  modalsManager.closeModal("projectModal");
}

function clearProjectEditingState() {
  delete projectModal.dataset.editingId;
}

function setProjectModalSubmitLabel(text) {
  projectModal.querySelector("#projectModalCreateBtn").textContent = text;
}

function projectInputsAreValid(data) {
  const message = document.querySelector("#projectFormMessage");
  message.classList.remove("invalid");

  if (!data.title) {
    message.classList.add("invalid");
    return false;
  }

  return true;
}