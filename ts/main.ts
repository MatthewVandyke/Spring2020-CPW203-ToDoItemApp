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
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
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

}

function $(id:string){
    return document.getElementById(id);
}

// Task: allow user to mark