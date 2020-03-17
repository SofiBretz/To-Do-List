const listsContainer = document.querySelector("[data-lists]");

let lists = ["name", "todo"];

function clearElement(element) {
  while (element.firstChild) {
    element.remove(element.firstChild);
  }
}

function render() {
  clearElement(listsContainer);
  lists.forEach(list => {
    const listElement = document.createElement("li");
    listElement.classList.add("list-name");
    listElement.innerText = list;
    listsContainer.appendChild(listElement);
  });
}

render();
