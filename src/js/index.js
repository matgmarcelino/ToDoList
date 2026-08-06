import "../style.css";
import * as projectsManager from "./api/projectsManager.js";
import * as modals from "./components/modals.js";
import { renderCards } from "./components/cards.js";
import { renderHeader } from "./components/header.js";
import { renderSidebar } from "./components/sidebar.js";

function refresh() {
  const aside = document.querySelector("aside");
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  const projects = projectsManager.getProjects();
  const project = projectsManager.getActiveProject();
  const tasks = project.tasks;

  renderSidebar(aside, projects, project.id);
  renderHeader(header, project);
  renderCards(main, tasks);
}

projectsManager.init();
refresh();

const sidebar = document.querySelector("aside");
const header = document.querySelector("header");
const main = document.querySelector("main");

// --- Switching and opening projects ---
sidebar.addEventListener("click", (e) => {
  const projectDOM = e.target.closest(".project");
  if (!projectDOM) return;
  const projectID = projectDOM.dataset.id;

  projectsManager.setActiveProject(projectID);
  projectsManager.toggleProjectOpen(projectID);
  refresh();
});

// -- Adding projects ---
sidebar.addEventListener("click", (e) => {
  const btn = e.target.closest(".sidebar-new-project-btn");
  if (!btn) return;

  modals.openModal("projectModal");
});

const projectModal = document.querySelector("#projectModal");

const projectModalCreateBtn = projectModal.querySelector(
  "#projectModalCreateBtn",
);
projectModalCreateBtn.addEventListener("click", (e) => {
  const title = modals.readProjectForm().title;
  projectsManager.addProject(title);
});

const projectModalCancelBtn = projectModal.querySelector(
  "#projectModalCancelBtn",
);
projectModalCancelBtn.addEventListener("click", (e) => {
  projectModal.close();
});
