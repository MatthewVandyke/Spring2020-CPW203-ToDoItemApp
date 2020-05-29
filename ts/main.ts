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

    let dateBox:HTMLInputElement = <HTMLInputElement>$("due-date");
    dateBox.value = new Date().toDateString();

    // Load saved item
    loadSavedItems();
}

/**
 * Clears all elements inside of ToDoItem Div
 */
function clearItems():void{
    let items = document.querySelectorAll("div#all-items > div > div");
    for (let i = 0; i < items.length; i++){
        items[i].remove();
    }
}

/**
 * Loads all items saved in web storage and puts them on the page
 */
function loadSavedItems(){
    clearItems();
    let items = getToDoItems();

    for(let i = 0; i < items.length; i++){
        let currItem = items[i];
        displayToDoItem(currItem);
    }
}

/**
 * Method for onclick event for add ToDoItem button
 */
function main(){
    let item = getToDoItem();
    if(isValid(item)){      
        saveToDo(item);
        loadSavedItems();
    }
}

/**
 * Check form data is valid
 */
function isValid(item: ToDoItem):boolean{
    // Validate title
    let title = item.title;
    if(title.trim() == "" || title == null){
        return false;
    }

    if (item.dueDate == null){
        return false;
    }

    let items = getToDoItems();
    let titleIndex = searchItemsArray(items, title);
    if (titleIndex != -1){
        let overwrite = confirm("Do you wish to overwrite old ToDoItem?");
        if(overwrite){
            items.splice(titleIndex, 1);
            removeToDoItemByTitle(title);
            updateItemsArray(items);
        }
        else{
            return false;
        }
    }
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

/**
 * Searchs for title in all ToDoItem divs and removes it
 * @param title Title to search for
 */
function removeToDoItemByTitle(title:string):void{
    let itemDivs = document.querySelectorAll("div#all-items > div > div");
    let itemDiv:HTMLDivElement;

    for (let i = 0; i < itemDivs.length; i++){
        if(itemDivs[i].firstElementChild.innerHTML == title){
            itemDiv = <HTMLDivElement>itemDivs[i];
            break;
        }
    }
    itemDiv.remove();
}

/**
 * onclick for each item div to mark as complete
 */
function markAsComplete():void{
    let itemDiv = <HTMLDivElement>this;
    if (itemDiv.classList.contains("completed"))
        return;
    itemDiv.classList.add("completed");

    // Update local storage
    let itemSearchKey = itemDiv.firstElementChild.innerHTML;
    let items = getToDoItems();
    let itemIndex = searchItemsArray(items, itemSearchKey);
    if (itemIndex != -1){
        items[itemIndex].isCompleted = true;
        updateItemsArray(items);
    }

    let completedItems = $("complete-items");
    completedItems.appendChild(itemDiv);
}

/**
 * Returns index of ToDoItem with matching title,
 * if array is null or title does not exist returns
 * -1
 * @param items array of ToDoItems
 * @param itemSearchKey title to search for
 */
function searchItemsArray(items: ToDoItem[], itemSearchKey: string) {
    let itemIndex = -1;
    if(items == null) {return itemIndex;}
    for (let i = 0; i < items.length; i++) {
        if (items[i].title == itemSearchKey) {
            itemIndex = i;
        }
    }
    return itemIndex;
}

/**
 * document.getElementById replacement
 * @param id css id selector
 */
function $(id:string){
    return document.getElementById(id);
}

/**
 * Saves ToDoItem in web storage
 * @param item ToDoItem
 */
function saveToDo(item:ToDoItem):void{   
    let currItems = getToDoItems();
    if(currItems == null){
        currItems = new Array();
    }
    currItems.push(item);
    currItems.sort(compare);
    updateItemsArray(currItems);
}

const todokey = "todo";

/**
 * Stringifys and saves ToDoItem array in web storage
 * @param toDoItems ToDoItem array to save in webstorage
 */
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

/**
 * Compare function to use for sorting array of ToDo Items
 * @param a ToDoItem  
 * @param b ToDoItem
 */
function compare(a:ToDoItem, b:ToDoItem) {
    // Probably a terrible workaround but it makes it work
    let dateA:String = new Date(a.dueDate.toString()).toJSON();
    let dateB:String = new Date(b.dueDate.toString()).toJSON();

    let comparison = 0;
    if (dateA > dateB){
        comparison = 1;
    } else if (dateA < dateB) {
        comparison = -1
    }
    return comparison;
}
