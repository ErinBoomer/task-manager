let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div onclick="toggleComplete(${index})">
        <strong>${task.text}</strong>
        <small>${task.date || ""} ${task.time || ""}</small>
      </div>

      <div class="actions">
        <button class="complete" onclick="toggleComplete(${index})">✔</button>
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">X</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const textInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");

  if (textInput.value.trim() === "") return;

  tasks.push({
    text: textInput.value,
    completed: false,
    date: dateInput.value,
    time: timeInput.value
  });

  textInput.value = "";
  dateInput.value = "";
  timeInput.value = "";

  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);

  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

renderTasks();