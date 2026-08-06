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
  const dialog = document.querySelector("#taskModal");
  const form = dialog.querySelector("#taskForm");
  const formData = new FormData(form);
  const entries = Object.fromEntries(formData);
  entries.dueDate = parseDate(entries.dueDate);
  return entries;
}

function fillTaskForm(task) {
  const dialog = document.querySelector("#taskModal");
  const form = dialog.querySelector("#taskForm");

  form.querySelector("#taskTitle").value = task.title;
  form.querySelector("#dueDate").value = task.dueDate;
  form.querySelector("#priority").value = task.priority;
  form.querySelector("#description").value = task.priority;
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

function parseDate(date) {
  const dateInput = document.querySelector('input[type="date"]');
  const rawValue = dateInput.value; // Example: "2026-08-05"

  // Split "2026-08-05" into ["2026", "08", "05"]
  const [year, month, day] = rawValue.split("-");

  // Combine into "08/05/2026"
  const formattedDate = `${month}/${day}/${year}`;

  const data = { eventDate: formattedDate };
  return JSON.stringify(data);
}

export {
  openModal,
  closeModal,
  readTaskForm,
  fillTaskForm,
  readProjectForm,
  fillProjectForm,
};
