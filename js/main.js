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
    loadSavedItems();
};
function loadSavedItems() {
    var items = getToDoItems();
    for (var i = 0; i < items.length; i++) {
        var currItem = items[i];
        displayToDoItem(currItem);
    }
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
    var itemSearchKey = itemDiv.firstElementChild.innerHTML;
    var items = getToDoItems();
    var itemIndex = searchItemsArray(items, itemSearchKey);
    items[itemIndex].isCompleted = true;
    updateItemsArray(items);
    var completedItems = $("complete-items");
    completedItems.appendChild(itemDiv);
}
function searchItemsArray(items, itemSearchKey) {
    var itemIndex;
    for (var i = 0; i < items.length; i++) {
        if (items[i].title == itemSearchKey) {
            itemIndex = i;
        }
    }
    return itemIndex;
}
function $(id) {
    return document.getElementById(id);
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    updateItemsArray(currItems);
}
var todokey = "todo";
function updateItemsArray(toDoItems) {
    var itemsString = JSON.stringify(toDoItems);
    localStorage.setItem(todokey, itemsString);
}
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
