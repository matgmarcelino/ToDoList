const renderSidebar = (el, projects, activeID) => {
  el.innerHTML = "";

  el.append(...createSidebarComponents(projects, activeID));
};

function createSidebarComponents(projects, activeID) {
  const brandContainer = (() => {
    const div = document.createElement("div");
    div.classList.add("sidebar-brand-container");

    const brand = document.createElement("span");
    brand.textContent = "Mar";
    brand.classList.add("sidebar-brand");

    const accent = document.createElement("span");
    accent.classList.add("sidebar-brand-accent");
    accent.textContent = "ker";

    brand.append(accent);
    div.append(brand);
    return div;
  })();

  const sidebarProjects = (() => {
    const div = document.createElement("div");
    div.classList.add("sidebar-projects");

    projects.forEach((p) => 
      div.append(createProjectDiv(p, p.id === activeID)));
    
    return div;
  })();

  const sidebarNewProjectBtn = (() => {
    const btn = document.createElement("button");
    btn.classList.add("sidebar-new-project-btn");

    const plusIcon = createPlusIcon();

    const text = document.createElement("span");
    text.classList.add("sidebar-new-project-btn-text");
    text.textContent = "New Project";

    btn.append(plusIcon, text);
    return btn;
  })();

  return [brandContainer, sidebarProjects, sidebarNewProjectBtn];
}

function createProjectDiv(project, isActive) {
  const div = document.createElement("div");
  div.classList.add("project");
  div.dataset.id = project.id;
  if (isActive) div.classList.add("active");
  if (project.isOpen) div.classList.add("open");

  const projectHeader = (() => {
    const projectHeaderDiv = document.createElement("h3");
    projectHeaderDiv.classList.add("project-header");

    const projectTitle = document.createElement("span");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = project.title;

    const chevron = document.createElement("span");
    chevron.classList.add("chevron");
    chevron.textContent = "▶";

    projectHeaderDiv.append(projectTitle, chevron);
    return projectHeaderDiv;
  })();

  const tasks = (() => {
    const tasksDiv = document.createElement("div");
    tasksDiv.classList.add("tasks");

    const tasksInner = document.createElement("div");
    tasksInner.classList.add("tasks-inner");
    tasksDiv.append(tasksInner);

    project.tasks.forEach((t) => tasksInner.append(createTaskDiv(t)));

    tasksDiv.append(tasksInner);
    return tasksDiv;
  })();

  div.append(projectHeader, tasks);
  return div;
}

function createTaskDiv(task) {
  const taskDiv = document.createElement("div");
  taskDiv.dataset.id = task.id;
  taskDiv.classList.add("task");

  const taskTitle = document.createElement("span");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = task.title;

  const trashIcon = createTrashIcon();

  taskDiv.append(taskTitle, trashIcon);
  return taskDiv;
}

function createTrashIcon({
  size = 24,
  color = "#bf4545",
  className = "",
} = {}) {
  const div = document.createElement("div");
  if (className) div.className = className;
  div.classList.add('task-trash-icon');
  div.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
          stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`.trim();
  return div;
}

function createPlusIcon({ size = 24, color = "#000000" } = {}) {
  const PLUS_PATH =
    "M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z";

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("fill", "none");

  const path = document.createElementNS(NS, "path");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("clip-rule", "evenodd");
  path.setAttribute("d", PLUS_PATH);
  path.setAttribute("fill", color);

  svg.appendChild(path);
  return svg;
}

export { renderSidebar };
