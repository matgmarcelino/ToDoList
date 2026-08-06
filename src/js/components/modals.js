function openModal(id) {
  const dialog = document.querySelector("#" + id);
  const messages = dialog.querySelectorAll("p");
  messages.forEach((m) => m.classList.remove("invalid"));
  dialog.showModal();
}

function closeModal(id) {
  document.querySelector("#" + id).close();
}

function readTaskForm() {
  const form = document.querySelector("#taskModal #taskForm");
  const entries = Object.fromEntries(new FormData(form));
  entries.dueDate = entries.dueDate || null;
  return entries;
}

function fillTaskForm(task) {
  const dialog = document.querySelector("#taskModal");
  const form = dialog.querySelector("#taskForm");

  form.querySelector("#taskTitle").value = task.title;
  form.querySelector("#dueDate").value = task.dueDate ?? "";
  form.querySelector("#priority").value = task.priority;
  form.querySelector("#description").value = task.description;
}

function readProjectForm() {
  const dialog = document.querySelector("#projectModal");
  const form = dialog.querySelector("#projectForm");
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

function fillProjectForm(project) {
  const dialog = document.querySelector("#projectModal");
  const form = dialog.querySelector("#projectForm");

  form.querySelector("#projectTitle").value = project.title;
}

function parseDate(rawValue) {
  if (!rawValue) return null;      // empty date input
  return rawValue;                 // already "YYYY-MM-DD"
}

export {
  openModal,
  closeModal,
  readTaskForm,
  fillTaskForm,
  readProjectForm,
  fillProjectForm,
};
