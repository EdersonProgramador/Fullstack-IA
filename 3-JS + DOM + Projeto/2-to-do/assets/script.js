const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const taskForm = document.querySelector('#task-form');

let tasks = [];

function createTask(text) {
  return {
    id: Date.now() + Math.random(),
    text,
    done: false,
  };
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  const fragment = document.createDocumentFragment();

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item${task.done ? ' done' : ''}`;

    const content = document.createElement('div');
    content.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', 'Marcar tarefa como concluída');
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'btn btn-toggle';
    toggleButton.textContent = task.done ? 'Desmarcar' : 'Concluir';
    toggleButton.addEventListener('click', () => toggleTask(task.id));

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-delete';
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    content.appendChild(checkbox);
    content.appendChild(text);
    actions.appendChild(toggleButton);
    actions.appendChild(deleteButton);
    item.appendChild(content);
    item.appendChild(actions);
    fragment.appendChild(item);
  });

  taskList.appendChild(fragment);
}

function addTask(text) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return;
  }

  tasks.push(createTask(trimmedText));
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, done: !task.done };
    }

    return task;
  });

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function handleSubmit(event) {
  event.preventDefault();
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
}

taskForm.addEventListener('submit', handleSubmit);

renderTasks();