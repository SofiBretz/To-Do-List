import {
  getTask,
  clearElement,
  renderTaskCount,
  updateTodo,
  renderTasks,
  renderLists,
  createTask,
  createList,
} from './functions';

const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector(
  '[data-list-display-container]',
);
const listTitleElement = document.querySelector('[data-list-title]');
const tasksContainer = document.querySelector('[data-tasks]');

const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompleteTasksButton = document.querySelector(
  '[data-clear-complete-tasks-button]',
);
const priority = document.getElementById('priority');
const date = document.getElementById('date');
const description = document.getElementById('description');
const btnTask = document.getElementById('addTask');
const updateTask = document.getElementById('updateTask');
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
const save = () => {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
};

const render = () => {
  clearElement(listsContainer);
  renderLists(lists, selectedListId);

  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
};

const saveAndRender = () => {
  save();
  render();
};

listsContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

tasksContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id,
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
});

tasksContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'button') {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.parentElement.childNodes[1].id,
    );
    getTask(selectedTask);
    e.target.parentElement.remove();
    btnTask.classList.add('hide');
    updateTask.classList.remove('hide');
    updateTask.addEventListener('click', () => {
      updateTodo(selectedList, selectedTask);
      btnTask.classList.remove('hide');
      updateTask.classList.add('hide');
      saveAndRender();
    });
  }
});

clearCompleteTasksButton.addEventListener('click', () => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

deleteListButton.addEventListener('click', () => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

newListForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === '') return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

btnTask.addEventListener('click', (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  const desc = description.value;
  const prior = priority.value;
  const day = date.value;
  if (
    taskName === null
    || (taskName === '' && desc === null)
    || (desc === '' && prior === null)
    || (prior === '' && day === null)
    || day === ''
  ) return;
  const task = createTask(taskName, desc, prior, day);
  newTaskInput.value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});


const defaultList = () => {
  const list = createList('Create a To-Do List');
  if (lists.length === 0) {
    lists.push(list);
    const taskName = 'Create a To-Do List';
    const desc = 'Decription Task Here';
    const prior = 'Priority Here';
    const day = 'Date Here';
    if (
      taskName === null
    || (taskName === '' && desc === null)
    || (desc === '' && prior === null)
    || (prior === '' && day === null)
    || day === ''
    ) return;
    const task = createTask(taskName, desc, prior, day);
    lists[0].tasks.push(task);
    renderLists(lists, selectedListId);
    saveAndRender();
  }
};

defaultList();
render();