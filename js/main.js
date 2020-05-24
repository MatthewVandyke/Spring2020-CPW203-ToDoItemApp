var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = $("add");
    addItem.onclick = main;
    loadSavedItem();
};
function loadSavedItem() {
    var item = getToDo();
    displayToDoItem(item);
}
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var item = new ToDoItem;
    item.title = $("title").value;
    item.dueDate = new Date($("due-date").value);
    item.isCompleted = $("is-complete").checked;
    return item;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        $("complete-items").appendChild(itemDiv);
    }
    else {
        $("incomplete-items").appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    console.log(itemDiv);
    itemDiv.classList.add("completed");
    var completedItems = $("complete-items");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
}
function $(id) {
    return document.getElementById(id);
}
function saveToDo(item) {
    var itemString = JSON.stringify(item);
    localStorage.setItem(todokey, itemString);
}
var todokey = "todo";
function getToDo() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
