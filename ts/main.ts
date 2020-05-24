// @ts-ignore: Ignoring issue with js-datepicker lack of IntelliSense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}
/*
let item = new ToDoItem("testing");
item.dueDate = new Date(2020, 6, 1);
item.isCompleted = false; 
*/

window.onload = function(){
    let addItem = $("add");
    addItem.onclick = main;

    // Load saved item
    loadSavedItem();
}

function loadSavedItem(){
    let item = getToDo();
    displayToDoItem(item);
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean{
    return true;
}

/**
 * Get all input off form and wrap in 
 * a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let item = new ToDoItem;
    item.title = (<HTMLInputElement>$("title")).value;
    item.dueDate = new Date((<HTMLInputElement>$("due-date")).value);
    item.isCompleted = (<HTMLInputElement>$("is-complete")).checked;
    return item;
}

/**
 * Diplay given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    //itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        $("complete-items").appendChild(itemDiv);
    }
    else{
        $("incomplete-items").appendChild(itemDiv);
    }
}

function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    console.log(itemDiv);
    itemDiv.classList.add("completed");

    let completedItems = $("complete-items");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
}

function $(id:string){
    return document.getElementById(id);
}

// Task: Store ToDoItems in web storage

function saveToDo(item:ToDoItem):void{   
    //Convert to string
    let itemString = JSON.stringify(item);

    // Save string
    localStorage.setItem(todokey, itemString);
}

const todokey = "todo";

/**
 * Get stored ToDo item or return null if
 * none is found
 */
function getToDo():ToDoItem{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem = JSON.parse(itemString);
    return item;
}