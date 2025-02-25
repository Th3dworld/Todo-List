import { addGoal, showTasks} from "./task_components.js";
import {formIsValid, getFormData, resetForm} from "./form_handler.js"
import { projectCounter, showProjects } from "./project_components.js";

import "./styles.css";

//Array to hold tasks
const tasks = [];
const projects = {};

//Get control variables
const addTaskBtn = document.querySelector("#add-task-btn");
const taskDialog = document.querySelector("#task-dialog");
const display = document.querySelector("#display");
const cancelBtn = document.querySelector("#cancel-task");
const menuBtns = document.querySelectorAll(".menu-btn");

//Menu buttons
const todoBtn = document.querySelector("#todo");
const projectBtn = document.querySelector("#projects");

//functions
function resetDisplay(){
    display.innerHTML = "";
}

//Program Events
addTaskBtn.addEventListener("click", () => {taskDialog.showModal()});

menuBtns.forEach(btn => {
    //Add event listener for 
    btn.addEventListener("click", (e) => {

        //reset all other menu buttons
        menuBtns.forEach(btn => {
            document.getElementById(`${btn.id}`).classList.remove("menu-btn-clicked");
            document.getElementById(`${btn.id}`).classList.add("menu-btn");
        });

        //Set clicked button apart
        document.getElementById(`${e.target.id}`).classList.remove("menu-btn");
        document.getElementById(`${e.target.id}`).classList.add("menu-btn-clicked");
    });
});

//Add task to display
taskDialog.addEventListener("close", (e) =>{
    //if form is valid append task
    if(formIsValid()){
        const taskData = getFormData();
        tasks.push(addGoal(taskData.title, taskData.description,taskData.project,taskData.priority,taskData.date))
        projectCounter(projects);
    }

    //reset the form
    resetForm()    

    //reset display and show tasks
    // resetDisplay()
    //showTasks(tasks, display);

});

//form events
cancelBtn.addEventListener("click", (e)=>{
    //reset the form so it is never valid on submission
    resetForm();
    taskDialog.close();   
});

//Always show tasks first
// showTasks(tasks, display);

//Menu button event listener
todoBtn.addEventListener("click", () =>{
    resetDisplay();
    showTasks(tasks, display);
});

projectBtn.addEventListener("click", () =>{
    resetDisplay();
    showProjects(tasks, Array(Object.values(projects)), display);
});

