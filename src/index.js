import { addGoal, showTasks} from "./task_components.js";
import { projectCounter, showProjects } from "./project_components.js";
import { addNote, showNotes, getNoteFormData } from "./note_components.js";
import {taskFormIsValid, noteFormIsValid, getFormData, resetForm} from "./form_handler.js"


import "./styles.css";

//Array to hold tasks
const tasks = [];
const notes = [];
const projects = {};

//Get control variables
const addTaskBtn = document.querySelector("#add-task-btn");
const addNoteBtn = document.querySelector("#add-note-btn");
const taskDialog = document.querySelector("#task-dialog");
const noteDialog = document.querySelector("#note-dialog");
const display = document.querySelector("#display");
const cancelTaskBtn = document.querySelector("#cancel-task");
const cancelNoteBtn = document.querySelector("#cancel-note");
const menuBtns = document.querySelectorAll(".menu-btn");
var checkBtns;
var projectViewBtn = document.querySelectorAll(".project-view");

//Menu buttons
const todoBtn = document.querySelector("#todo");
const projectBtn = document.querySelector("#projects");
const noteBtn = document.querySelector("#notes");

//functions
function resetDisplay(){
    display.innerHTML = "";
}

//Program Events
addTaskBtn.addEventListener("click", () => {taskDialog.showModal()});
addNoteBtn.addEventListener("click", ()=>{noteDialog.showModal()})

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
    if(taskFormIsValid()){
        const taskData = getFormData();
        tasks.push(addGoal(taskData.title, taskData.description,taskData.project,taskData.priority,taskData.date))
        projectCounter(projects, taskData);
    }
    
    //reset the form
    resetForm("#my-form") 

    //reset display and show tasks
    resetDisplay()
    showTasks(tasks, display);

});

noteDialog.addEventListener("close", ()=>{
    if(noteFormIsValid()){
        const noteData = getNoteFormData();
        console.log(noteData)
        notes.push(addNote(noteData.title, noteData.note, noteData.writeDate));
    }

    //reset display and show notes
    resetDisplay();
    showNotes(notes, display);

});

//form events
cancelTaskBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    //reset the form so it is never valid on submission
    resetForm("#my-form");
    taskDialog.close();   
});

cancelNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    resetForm("#my-note-form");
    noteDialog.close();
})

//Always show tasks first
showTasks(tasks, display);

//Menu button event listener
todoBtn.addEventListener("click", () =>{
    resetDisplay();
    showTasks(tasks, display);
});

noteBtn.addEventListener("click", ()=>{
    resetDisplay();
    showNotes(notes, display);
});

projectBtn.addEventListener("click", () =>{
    resetDisplay();
    showProjects(projects, Object.keys(projects), display);

    //update project view button array
    projectViewBtn = document.querySelectorAll(".project-view");
    console.log(projectViewBtn)

    projectViewBtn.forEach(projectView => {
        const childNodes = projectView.childNodes;
    
        projectView.addEventListener("click", (e) =>{
            childNodes[5].innerHTML = "";
        
            tasks.forEach(task => {
                if(task.project == e.target.id){
                    childNodes[5].innerHTML += `
                    <div class="project-task">
                        <div class="project-task-title">${task.title}</div>
                        <div class="project-date">
                            <div>Due: ${task.dueDate}</div>
                        </div>
                        <div class="task-priority-${task.priority}"></div>
                    </div> 
                    `

                    document.getElementById(e.target.id).classList.remove("project-view");
                    document.getElementById(e.target.id).classList.add("project-view-clicked");
                    console.log(e.target)
                }
            })
            
        })
    })
});



