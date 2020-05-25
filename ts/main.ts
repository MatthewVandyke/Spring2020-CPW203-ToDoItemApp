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
    loadSavedItems();
}

function loadSavedItems(){
    let items = getToDoItems();

    for(let i = 0; i < items.length; i++){
        let currItem = items[i];
        displayToDoItem(currItem);
    }
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
    let itemDiv = <HTMLDivElement>this;
    console.log(itemDiv);
    itemDiv.classList.add("completed");

    // Update local storage
    let itemSearchKey = itemDiv.firstElementChild.innerHTML;
    let items = getToDoItems();
    let itemIndex = searchItemsArray(items, itemSearchKey);
    items[itemIndex].isCompleted = true;

    updateItemsArray(items);

    let completedItems = $("complete-items");
    completedItems.appendChild(itemDiv);
}

function searchItemsArray(items: ToDoItem[], itemSearchKey: string) {
    let itemIndex;
    for (let i = 0; i < items.length; i++) {
        if (items[i].title == itemSearchKey) {
            itemIndex = i;
        }
    }
    return itemIndex;
}

function $(id:string){
    return document.getElementById(id);
}

// Task: Store ToDoItems in web storage

function saveToDo(item:ToDoItem):void{   
    let currItems = getToDoItems();
    if(currItems == null){
        currItems = new Array();
    }
    currItems.push(item);
    updateItemsArray(currItems);
}

const todokey = "todo";

function updateItemsArray(toDoItems: ToDoItem[]) {
    let itemsString = JSON.stringify(toDoItems);
    localStorage.setItem(todokey, itemsString);
}

/**
 * Get stored ToDo items or return null if
 * none are found
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}