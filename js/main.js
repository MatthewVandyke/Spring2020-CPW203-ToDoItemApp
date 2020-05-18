var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem(title) {
        this.title = title;
    }
    return ToDoItem;
}());
function isValid() {
    return true;
}
function getToDoItem() {
    var item = new ToDoItem("testing");
    return item;
}
function displayToDoItem(item) {
}
