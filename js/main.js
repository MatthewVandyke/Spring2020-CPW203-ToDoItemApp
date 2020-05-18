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
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
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
}
function $(id) {
    return document.getElementById(id);
}
