// @ts-ignore: Ignoring issue with js-datepicker lack of IntelliSense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;

    constructor(title:string){
        this.title = title;
    }
}
/*
let item = new ToDoItem("testing");
item.dueDate = new Date(2020, 6, 1);
item.isCompleted = false; 
*/

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
    let item = new ToDoItem("testing");
    return item;
}

/**
 * Diplay given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void{

}

// Task: allow user to mark