!function(e){var t={};function n(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(s,i,function(t){return e[t]}.bind(null,i));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/index.js")}({"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */function(module,exports){eval('const listsContainer = document.querySelector("[data-lists]");\nconst newListForm = document.querySelector("[data-new-list-form]");\nconst newListInput = document.querySelector("[data-new-list-input]");\nconst deleteListButton = document.querySelector("[data-delete-list-button]");\nconst listDisplayContainer = document.querySelector(\n  "[data-list-display-container]"\n);\nconst listTitleElement = document.querySelector("[data-list-title]");\nconst listCountElement = document.querySelector("[data-list-count]");\nconst tasksContainer = document.querySelector("[data-tasks]");\nconst taskTemplate = document.getElementById("task-template");\nconst newTaskForm = document.querySelector(\'[data-new-task-form]\')\nconst newTaskInput = document.querySelector(\'[data-new-task-input]\')\nconst clearCompleteTasksButton = document.querySelector(\'[data-clear-complete-tasks-button]\')\nconst priority = document.getElementById(\'priority\')\nconst date = document.getElementById(\'date\')\nconst description = document.getElementById(\'description\')\nconst btnTask = document.getElementById("addTask")\n\n\n// localstorage creating key\nconst LOCAL_STORAGE_LIST_KEY = "task.lists";\nconst LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";\nlet lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];\nlet selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);\n// end\n\nlistsContainer.addEventListener("click", e => {\n  if (e.target.tagName.toLowerCase() === "li") {\n    selectedListId = e.target.dataset.listId;\n    saveAndRender();\n  }\n});\n\ntasksContainer.addEventListener(\'click\', e => {\n  if(e.target.tagName.toLowerCase() === \'input\') {\n    const selectedList = lists.find(list => list.id === selectedListId)\n    const selectedTask = selectedList.tasks.find(task => task.id ===\n      e.target.id)\n     selectedTask.complete = e.target.checked\n     save()\n     renderTaskCount(selectedList)\n  }  \n})\n\nclearCompleteTasksButton.addEventListener(\'click\', e => {\n  const selectedList = lists.find(list => list.id === selectedListId)\n  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)\n  saveAndRender()\n})\n\ndeleteListButton.addEventListener("click", e => {\n  lists = lists.filter(list => list.id !== selectedListId);\n  selectedListId = null;\n  saveAndRender();\n});\n\nnewListForm.addEventListener("submit", e => {\n  e.preventDefault();\n  const listName = newListInput.value; //to type the name for the new task\n  if (listName == null || listName === "") return;\n  const list = createList(listName);\n  newListInput.value = null;\n  lists.push(list);\n  saveAndRender();\n});\n\nbtnTask.addEventListener("click", e => {\n  e.preventDefault();\n  const taskName = newTaskInput.value; //to type the name for the new task\n  const desc =  description.value\n  const prior =  priority.value\n  const day =  date.value\n  if (taskName === null || taskName === "" && desc === null || desc === \'\'  && prior === null || prior === \'\' && day === null || day === \'\') return;\n  const task = createTask(taskName, desc, prior, day);\n  newTaskInput.value = null;\n  const selectedList = lists.find(list => list.id === selectedListId)\n  selectedList.tasks.push(task)\n  saveAndRender();\n});\n\nfunction createList(name) {\n  return {\n    id: Date.now().toString(),\n    name: name,\n    tasks: [] }\n}\n\nfunction createTask(name, description, priority, date) {\n  return {\n    id: Date.now().toString(),\n    name: name,\n    description: description,\n    priority: priority,\n    date: date,\n    complete: false }\n}\n\n\nfunction saveAndRender() {\n  save();\n  render();\n}\n\nfunction save() {\n  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)); //this is going to save the info in our local storage\n  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);\n}\n\nfunction render() {\n  clearElement(listsContainer);\n  renderLists();\n\n  const selectedList = lists.find(list => list.id === selectedListId);\n  if (selectedListId == null) {\n    //we dont have a list selected\n    listDisplayContainer.style.display = \'none\';\n  } else {\n    listDisplayContainer.style.display = \'\';\n    listTitleElement.innerText = selectedList.name;\n    renderTaskCount(selectedList);\n    clearElement(tasksContainer);\n    renderTasks(selectedList);\n  }\n}\n\nfunction renderTasks(selectedList) {\n  selectedList.tasks.forEach(task => {\n    const taskElement = document.importNode(taskTemplate.content, true);\n    const checkbox = taskElement.querySelector(\'input\');\n    checkbox.id = task.id;\n    checkbox.checked = task.complete;\n    const label = taskElement.querySelector(\'label\');\n    label.htmlFor = task.id;\n    label.append(task.name);\n    label.append(task.description)\n    label.append(task.priority)\n    label.append(task.date)\n    tasksContainer.appendChild(taskElement);\n  });\n}\n\nfunction renderTaskCount(selectedList) {\n  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete)\n    .length;\n  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";\n  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;\n}\n\nfunction renderLists() {\n  //this is going to render all the list container\n  lists.forEach(list => {\n    const listElement = document.createElement("li");\n    listElement.dataset.listId = list.id;\n    listElement.classList.add("list-name");\n    listElement.innerText = list.name;\n    if (list.id === selectedListId) {\n      listElement.classList.add("active-list");\n    }\n    listsContainer.appendChild(listElement);\n  });\n}\n\nfunction clearElement(element) {\n  while (element.firstChild) {\n    element.removeChild(element.firstChild);\n  }\n}\n\nrender();\n\n\n//# sourceURL=webpack:///./src/index.js?')}});