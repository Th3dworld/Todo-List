import { addGoal, showTasks} from "./task_components.js";
import {formIsValid, getTaskData, resetForm} from "./form_handler.js"

import "./styles.css";

//Array to hold tasks
const tasks = [];

//Get control variables
const addTaskBtn = document.querySelector("#add-task-btn");
const taskDialog = document.querySelector("#task-dialog");
const display = document.querySelector("#display");
const cancelBtn = document.querySelector("#cancel-task");

//functions
function resetDisplay(){
    display.innerHTML = "";
}

//Program Events
addTaskBtn.addEventListener("click", () => {taskDialog.showModal()});


//Add task to display
taskDialog.addEventListener("close", (e) =>{
    //if form is valid append task
    if(formIsValid()){
        const taskData = getTaskData();
        tasks.push(addGoal(taskData.title, taskData.description,taskData.project,taskData.priority,taskData.date))
    }
    //reset the form
    resetForm()    

    //reset display and show tasks
    resetDisplay()
    showTasks(tasks, display);

});

//form events
cancelBtn.addEventListener("click", (e)=>{
    //reset the form so it is never valid on submission
    resetForm();
    taskDialog.close();   
});

//Always show tasks first
showTasks(tasks, display);

