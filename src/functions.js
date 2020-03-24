const getTask = (task) => {
  document.getElementById('newTaskName').value = task.name;
  document.getElementById('description').value = task.description;
  document.getElementById('date').value = task.date;
  document.getElementById('priority').value = task.priority;
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const renderTaskCount = (selectedList) => {
  const listCountElement = document.querySelector('[data-list-count]');
  const incompleteTaskCount = selectedList.tasks.filter((task) => !task.complete)
    .length;
  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks';
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
};

const updateTodo = (list, task) => {
  const data = task;
  const getList = list;
  data.name = document.getElementById('newTaskName').value;
  data.description = document.getElementById('description').value;
  data.date = document.getElementById('date').value;
  data.priority = document.getElementById('priority').value;
  const indexTask = list.tasks.indexOf(task);
  getList.tasks[indexTask] = task;
};

const renderTasks = (selectedList) => {
  const taskTemplate = document.getElementById('task-template');
  const tasksContainer = document.querySelector('[data-tasks]');
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    label.append(task.description);
    label.append(task.priority);
    label.append(task.date);
    tasksContainer.appendChild(taskElement);
  });
};

const renderLists = (lists, selectedListId) => {
  const listsContainer = document.querySelector('[data-lists]');
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add('active-list');
    }
    listsContainer.appendChild(listElement);
  });
};

const createList = (name) => ({
  id: Date.now().toString(),
  name,
  tasks: [],
});

const createTask = (name, description, priority, date) => ({
  id: Date.now().toString(),
  name,
  description,
  priority,
  date,
  complete: false,
});

export {
  getTask,
  clearElement,
  renderTaskCount,
  createList,
  createTask,
  updateTodo,
  renderTasks,
  renderLists,
};
