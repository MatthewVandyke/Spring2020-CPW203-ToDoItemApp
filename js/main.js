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
    var dateBox = $("due-date");
    dateBox.value = new Date().toDateString();
    loadSavedItems();
};
function clearItems() {
    var items = document.querySelectorAll("div#all-items > div > div");
    for (var i = 0; i < items.length; i++) {
        items[i].remove();
    }
}
function loadSavedItems() {
    clearItems();
    var items = getToDoItems();
    for (var i = 0; i < items.length; i++) {
        var currItem = items[i];
        displayToDoItem(currItem);
    }
}
function main() {
    var item = getToDoItem();
    if (isValid(item)) {
        saveToDo(item);
        loadSavedItems();
    }
}
function isValid(item) {
    var title = item.title;
    if (title.trim() == "" || title == null) {
        return false;
    }
    if (item.dueDate == null) {
        return false;
    }
    var items = getToDoItems();
    var titleIndex = searchItemsArray(items, title);
    if (titleIndex != -1) {
        var overwrite = confirm("Do you wish to overwrite old ToDoItem?");
        if (overwrite) {
            items.splice(titleIndex, 1);
            removeToDoItemByTitle(title);
            updateItemsArray(items);
        }
        else {
            return false;
        }
    }
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
function removeToDoItemByTitle(title) {
    var itemDivs = document.querySelectorAll("div#all-items > div > div");
    var itemDiv;
    for (var i = 0; i < itemDivs.length; i++) {
        if (itemDivs[i].firstElementChild.innerHTML == title) {
            itemDiv = itemDivs[i];
            break;
        }
    }
    itemDiv.remove();
}
function markAsComplete() {
    var itemDiv = this;
    if (itemDiv.classList.contains("completed"))
        return;
    itemDiv.classList.add("completed");
    var itemSearchKey = itemDiv.firstElementChild.innerHTML;
    var items = getToDoItems();
    var itemIndex = searchItemsArray(items, itemSearchKey);
    if (itemIndex != -1) {
        items[itemIndex].isCompleted = true;
        updateItemsArray(items);
    }
    var completedItems = $("complete-items");
    completedItems.appendChild(itemDiv);
}
function searchItemsArray(items, itemSearchKey) {
    var itemIndex = -1;
    if (items == null) {
        return itemIndex;
    }
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
    currItems.sort(compare);
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
function compare(a, b) {
    var dateA = new Date(a.dueDate.toString()).toJSON();
    var dateB = new Date(b.dueDate.toString()).toJSON();
    var comparison = 0;
    if (dateA > dateB) {
        comparison = 1;
    }
    else if (dateA < dateB) {
        comparison = -1;
    }
    return comparison;
}
