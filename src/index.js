const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const tasksContainer = document.querySelector("[data-tasks]");
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')
const priority = document.getElementById('priority')
const date = document.getElementById('date')
const description = document.getElementById('description')
const btnTask = document.getElementById("addTask")
const allTasks = document.querySelectorAll('.task')
console.log(allTasks)


// localstorage creating key
const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
// end

listsContainer.addEventListener("click", e => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

tasksContainer.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId)
    const selectedTask = selectedList.tasks.find(task => task.id ===
      e.target.id)
     selectedTask.complete = e.target.checked
     save()
     renderTaskCount(selectedList)
  }  
})

tasksContainer.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'button') {
    const selectedList = lists.find(list => list.id === selectedListId)
    const selectedTask = selectedList.tasks.find(task => task.id ===
      e.target.parentElement.childNodes[1].id) //e.target.parentElement.childNodes[1].id
    selectedTask.updateForm 
      updateForm(selectedTask);
      console.log(selectedListId)
      console.log(lists)

      e.target.parentElement.remove()
/*      save()
     renderTaskCount(selectedList)  */
     console.log("it is working")
     console.log(selectedTask)
    
     for (let list of lists) {
       if (parseInt(list.id) == selectedListId) {
        console.log(list.tasks)
        list.tasks.filter
        //remove the task from the store and save, and when i finish editing i added again.
       }
     }
  }  
})

function updateForm(task){
  document.getElementById('newTaskName').value= task.name
  document.getElementById('description').value= task.description
  document.getElementById('date').value= task.date
  document.getElementById('priority').value= task.priority
}

clearCompleteTasksButton.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  saveAndRender()
})

deleteListButton.addEventListener("click", e => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

newListForm.addEventListener("submit", e => {
  e.preventDefault();
  const listName = newListInput.value; //to type the name for the new task
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

btnTask.addEventListener("click", e => {
  e.preventDefault();
  const taskName = newTaskInput.value; //to type the name for the new task
  const desc =  description.value
  const prior =  priority.value
  const day =  date.value
  if (taskName === null || taskName === "" && desc === null || desc === ''  && prior === null || prior === '' && day === null || day === '') return;
  const task = createTask(taskName, desc, prior, day);
  newTaskInput.value = null;
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks.push(task)
  saveAndRender();
});
/* 
allTasks.forEach((singleTask) => {
  singleTask.addEventListener("click", e => {
    const editTarget = e.target.tagName === 'BUTTON' 
    console.log("target here", e.textContent)
  })
}) */

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [] }
}

function createTask(name, description, priority, date) {
  return {
    id: Date.now().toString(),
    name: name,
    description: description,
    priority: priority,
    date: date,
    complete: false }
}


function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)); //this is going to save the info in our local storage
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  clearElement(listsContainer);
  renderLists();

  const selectedList = lists.find(list => list.id === selectedListId);
  if (selectedListId == null) {
    //we dont have a list selected
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    label.append(task.description)
    label.append(task.priority)
    label.append(task.date)
    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete)
    .length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderLists() {
  //this is going to render all the list container
  lists.forEach(list => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
