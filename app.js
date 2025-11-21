const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

const STORAGE_KEY = 'timestamped-todos';

const timeFormatter = new Intl.DateTimeFormat([], {
  dateStyle: 'medium',
  timeStyle: 'medium',
});

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const loadTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn('Unable to read todos from local storage:', error);
    return [];
  }
};

const persistTodos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const buildTodoElement = (todo) => {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = todo.id;

  const body = document.createElement('div');
  body.className = 'todo-body';

  const todoText = document.createElement('span');
  todoText.className = 'todo-text';
  todoText.textContent = todo.text;

  const timestamp = document.createElement('time');
  timestamp.className = 'todo-time';

  const createdAt = new Date(todo.createdAt);
  timestamp.dateTime = createdAt.toISOString();
  timestamp.textContent = timeFormatter.format(createdAt);

  body.append(todoText, timestamp);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'todo-delete';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', `Delete todo "${todo.text}"`);

  li.append(body, deleteButton);
  return li;
};

const renderTodos = () => {
  list.innerHTML = '';
  todos.forEach((todo) => {
    const element = buildTodoElement(todo);
    list.append(element);
  });
};

let todos = loadTodos();
renderTodos();

const addTodo = (text) => {
  const todo = {
    id: createId(),
    text,
    createdAt: new Date().toISOString(),
  };

  todos = [todo, ...todos];
  persistTodos();
  renderTodos();
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (!value) {
    return;
  }

  addTodo(value);
  form.reset();
  input.focus();
});

list.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.todo-delete');

  if (!deleteButton) {
    return;
  }

  const todoItem = deleteButton.closest('.todo-item');
  const { id } = todoItem.dataset;

  todos = todos.filter((todo) => todo.id !== id);
  persistTodos();
  renderTodos();
  input.focus();
});
