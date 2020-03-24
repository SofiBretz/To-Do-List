!function(e){var t={};function n(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(s,a,function(t){return e[t]}.bind(null,a));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/index.js")}({"./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/*! exports provided: getTask, clearElement, renderTaskCount, createList, createTask, updateTodo, renderTasks, renderLists */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTask\", function() { return getTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearElement\", function() { return clearElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderTaskCount\", function() { return renderTaskCount; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createList\", function() { return createList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTask\", function() { return createTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateTodo\", function() { return updateTodo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderTasks\", function() { return renderTasks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderLists\", function() { return renderLists; });\nconst getTask = task => {\n  document.getElementById('newTaskName').value = task.name;\n  document.getElementById('description').value = task.description;\n  document.getElementById('date').value = task.date;\n  document.getElementById('priority').value = task.priority;\n};\n\nconst clearElement = element => {\n  while (element.firstChild) {\n    element.removeChild(element.firstChild);\n  }\n};\n\nconst renderTaskCount = selectedList => {\n  const listCountElement = document.querySelector('[data-list-count]');\n  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete)\n    .length;\n  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks';\n  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;\n};\n\nconst updateTodo = (list, task) => {\n  const data = task;\n  const getList = list;\n  data.name = document.getElementById('newTaskName').value;\n  data.description = document.getElementById('description').value;\n  data.date = document.getElementById('date').value;\n  data.priority = document.getElementById('priority').value;\n  const indexTask = list.tasks.indexOf(task);\n  getList.tasks[indexTask] = task;\n};\n\nconst renderTasks = selectedList => {\n  const taskTemplate = document.getElementById('task-template');\n  const tasksContainer = document.querySelector('[data-tasks]');\n  selectedList.tasks.forEach(task => {\n    const taskElement = document.importNode(taskTemplate.content, true);\n    const checkbox = taskElement.querySelector('input');\n    checkbox.id = task.id;\n    checkbox.checked = task.complete;\n    const label = taskElement.querySelector('label');\n    label.htmlFor = task.id;\n    label.append(task.name);\n    label.append(task.description);\n    label.append(task.priority);\n    label.append(task.date);\n    tasksContainer.appendChild(taskElement);\n  });\n};\n\nconst renderLists = (lists, selectedListId) => {\n  const listsContainer = document.querySelector('[data-lists]');\n  lists.forEach(list => {\n    const listElement = document.createElement('li');\n    listElement.dataset.listId = list.id;\n    listElement.classList.add('list-name');\n    listElement.innerText = list.name;\n    if (list.id === selectedListId) {\n      listElement.classList.add('active-list');\n    }\n    listsContainer.appendChild(listElement);\n  });\n};\n\nconst createList = name => ({\n  id: Date.now().toString(),\n  name,\n  tasks: []\n});\n\nconst createTask = (name, description, priority, date) => ({\n  id: Date.now().toString(),\n  name,\n  description,\n  priority,\n  date,\n  complete: false\n});\n\n\n\n\n//# sourceURL=webpack:///./src/functions.js?")},"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ \"./src/functions.js\");\n\n\nconst listsContainer = document.querySelector('[data-lists]');\nconst newListForm = document.querySelector('[data-new-list-form]');\nconst newListInput = document.querySelector('[data-new-list-input]');\nconst deleteListButton = document.querySelector('[data-delete-list-button]');\nconst listDisplayContainer = document.querySelector(\n  '[data-list-display-container]'\n);\nconst listTitleElement = document.querySelector('[data-list-title]');\nconst tasksContainer = document.querySelector('[data-tasks]');\n\nconst newTaskInput = document.querySelector('[data-new-task-input]');\nconst clearCompleteTasksButton = document.querySelector(\n  '[data-clear-complete-tasks-button]'\n);\nconst priority = document.getElementById('priority');\nconst date = document.getElementById('date');\nconst description = document.getElementById('description');\nconst btnTask = document.getElementById('addTask');\nconst updateTask = document.getElementById('updateTask');\nconst LOCAL_STORAGE_LIST_KEY = 'task.lists';\nconst LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';\n\nlet lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];\nlet selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);\nconst save = () => {\n  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));\n  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);\n};\n\nconst render = () => {\n  Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"clearElement\"])(listsContainer);\n  Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"renderLists\"])(lists, selectedListId);\n\n  const selectedList = lists.find(list => list.id === selectedListId);\n  if (selectedListId == null) {\n    listDisplayContainer.style.display = 'none';\n  } else {\n    listDisplayContainer.style.display = '';\n    listTitleElement.innerText = selectedList.name;\n    Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"renderTaskCount\"])(selectedList);\n    Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"clearElement\"])(tasksContainer);\n    Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"renderTasks\"])(selectedList);\n  }\n};\n\nconst saveAndRender = () => {\n  save();\n  render();\n};\n\nlistsContainer.addEventListener('click', e => {\n  if (e.target.tagName.toLowerCase() === 'li') {\n    selectedListId = e.target.dataset.listId;\n    saveAndRender();\n  }\n});\n\ntasksContainer.addEventListener('click', e => {\n  if (e.target.tagName.toLowerCase() === 'input') {\n    const selectedList = lists.find(list => list.id === selectedListId);\n    const selectedTask = selectedList.tasks.find(\n      task => task.id === e.target.id\n    );\n    selectedTask.complete = e.target.checked;\n    save();\n    Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"renderTaskCount\"])(selectedList);\n  }\n});\n\ntasksContainer.addEventListener('click', e => {\n  if (e.target.tagName.toLowerCase() === 'button') {\n    const selectedList = lists.find(list => list.id === selectedListId);\n    const selectedTask = selectedList.tasks.find(\n      task => task.id === e.target.parentElement.childNodes[1].id\n    );\n    Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"getTask\"])(selectedTask);\n    e.target.parentElement.remove();\n    btnTask.classList.add('hide');\n    updateTask.classList.remove('hide');\n    updateTask.addEventListener('click', () => {\n      Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"updateTodo\"])(selectedList, selectedTask);\n      btnTask.classList.remove('hide');\n      updateTask.classList.add('hide');\n      saveAndRender();\n    });\n  }\n});\n\nclearCompleteTasksButton.addEventListener('click', () => {\n  const selectedList = lists.find(list => list.id === selectedListId);\n  selectedList.tasks = selectedList.tasks.filter(task => !task.complete);\n  saveAndRender();\n});\n\ndeleteListButton.addEventListener('click', () => {\n  lists = lists.filter(list => list.id !== selectedListId);\n  selectedListId = null;\n  saveAndRender();\n});\n\nnewListForm.addEventListener('submit', e => {\n  e.preventDefault();\n  const listName = newListInput.value;\n  if (listName == null || listName === '') return;\n  const list = Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"createList\"])(listName);\n  newListInput.value = null;\n  lists.push(list);\n  saveAndRender();\n});\n\nbtnTask.addEventListener('click', e => {\n  e.preventDefault();\n  const taskName = newTaskInput.value;\n  const desc = description.value;\n  const prior = priority.value;\n  const day = date.value;\n  if (\n    taskName === null ||\n    (taskName === '' && desc === null) ||\n    (desc === '' && prior === null) ||\n    (prior === '' && day === null) ||\n    day === ''\n  )\n    return;\n  const task = Object(_functions__WEBPACK_IMPORTED_MODULE_0__[\"createTask\"])(taskName, desc, prior, day);\n  newTaskInput.value = null;\n  const selectedList = lists.find(list => list.id === selectedListId);\n  selectedList.tasks.push(task);\n  saveAndRender();\n});\n\nrender();\n\n\n//# sourceURL=webpack:///./src/index.js?")}});