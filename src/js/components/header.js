const renderHeader = (el, project) => {
  el.innerHTML = "";

  el.append(...createHeaderComponents(project));
};

function createHeaderComponents(project) {
  const h2 = document.createElement("h2");
  h2.classList.add("header-project-title");
  h2.textContent = project.title;

  const btnGroup = (() => {
    const btnGroupDiv = document.createElement("div");
    btnGroupDiv.classList.add("header-btn-group");

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("header-add-task-btn");
    addTaskBtn.textContent = "Add Task";

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.classList.add("header-delete-project-btn");
    deleteProjectBtn.textContent = "Delete Project";

    btnGroupDiv.append(addTaskBtn, deleteProjectBtn);
    return btnGroupDiv;
  })();

  return [h2, btnGroup];
}

export { renderHeader };
