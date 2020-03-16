const listsContainer = document.querySelector('[data-lists]')

let lists = ['name', 'todo']

function render() {
    <li class="list-name">Work</li>
    clearElement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.classList.add("list-name")
        listElement.innerText = list
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {

}