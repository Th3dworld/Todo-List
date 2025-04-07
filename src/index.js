import { addGoal, showTasks} from "./task_components.js";
import { projectCounter, showProjects } from "./project_components.js";
import { addNote, showNotes, getNoteFormData } from "./note_components.js";
import {taskFormIsValid, noteFormIsValid, getFormData, resetForm} from "./form_handler.js"
import { showCompleteTasks } from "./completed_components.js";


import "./styles.css";


//Array to hold tasks
const tasks = [];
const completeTasks = [];
const notes = [];
let projects = {};

//Get control variables
const addTaskBtn = document.querySelector("#add-task-btn");
const addNoteBtn = document.querySelector("#add-note-btn");
const taskDialog = document.querySelector("#task-dialog");
const noteDialog = document.querySelector("#note-dialog");
const display = document.querySelector("#display");
const cancelTaskBtn = document.querySelector("#cancel-task");
const cancelNoteBtn = document.querySelector("#cancel-note");
const menuBtns = document.querySelectorAll(".menu-btn");

//non constant variables
let deletBtns;
let editBtns;
let noteEditBtns;
let noteDeleteBtns;
let checkBtns;
let taskEdit;
let editIndex;
let noteEdit;
let projectViewBtn = document.querySelectorAll(".project-view");

//Menu buttons
const todoBtn = document.querySelector("#todo");
const projectBtn = document.querySelector("#projects");
const noteBtn = document.querySelector("#notes");
const completeBtn = document.querySelector("#completed");

//functions
function resetDisplay(){
    display.innerHTML = "";
}

function editTask(){
    tasks[editIndex].title = document.querySelector("#task-title-input").value;
    tasks[editIndex].description = document.querySelector("#task-description-input").value;
    tasks[editIndex].project = document.querySelector("#task-project-input").value;
    var dateFormatter = document.querySelector("#task-duedate-input").value.split("-");        dateFormatter[0] = dateFormatter[0].split("");
    var date = parseInt(dateFormatter[1]) + "/" + dateFormatter[2] + "/" + dateFormatter[0][2] + + dateFormatter[0][3];
    tasks[editIndex].dueDate = date;
    document.getElementsByName("task-priority-input").forEach(elem => {
        if(elem.checked){
            tasks[editIndex].priority = elem.value;
        }
    });
}

//Function to count projects
function countProjects(taskArr){
    projects = {}//reset dictionary

    //iterate through task array to count valid projects
    taskArr.forEach(task => {
        projectCounter(projects, task)
    })

}
//Program Events
addTaskBtn.addEventListener("click", () => {
    taskDialog.showModal()
    taskEdit = false
});

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
    if(taskFormIsValid() && !taskEdit){
        const taskData = getFormData();
        tasks.push(addGoal(taskData.title, taskData.description,taskData.project,taskData.priority,taskData.date));
    }else if(taskEdit){
        editTask();
    }
    
    //reset the form
    resetForm("#my-form") 

    //reset display and show tasks
    todoBtn.click()
    //count projects
    countProjects(tasks);
});

noteDialog.addEventListener("close", ()=>{
    if(noteFormIsValid()){
        const noteData = getNoteFormData();
        console.log(noteData)
        notes.push(addNote(noteData.title, noteData.note, noteData.writeDate));
    }

    //reset the form
    resetForm("#my-note-form") 

    //show notes
    noteBtn.click()
});

//form events
cancelTaskBtn.addEventListener("click", (e)=>{
    // e.preventDefault()
    
    //Edit task
    if(taskEdit){
        editTask();
        taskEdit = false
    }

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
showTasks(tasks, display, checkBtns);

//Menu button event listener
todoBtn.addEventListener("click", () =>{
    resetDisplay();
    showTasks(tasks, display);

    checkBtns = document.querySelectorAll(`input[type=checkbox]`);
    deletBtns = document.querySelectorAll("#delete");
    editBtns = document.querySelectorAll("#edit");
    
    checkBtns.forEach(btn => {
        btn.addEventListener("click", ()=>{
            const taskIndex = btn.parentNode.nextSibling.nextElementSibling.id;
            tasks[taskIndex].complete = !tasks[taskIndex].complete;
            
            //move task to complete tasks
            completeTasks.push(tasks[taskIndex]);
            //remove item from tasks array
            tasks.splice(taskIndex, 1);

            //Update display
            setTimeout(() => {
                resetDisplay()
                todoBtn.click()
            }, 300);
            
            //update Project Map/Project Counter
            countProjects(tasks);

            //TODO: Add functionality to completed task button
            /*
                features to have
                Make task color dull gray and run strike through through text
            */
            
        });
    });

    deletBtns.forEach(btn =>{
        btn.addEventListener("click", (e) => {
            //delete project
            const taskIndex = e.srcElement.parentNode.parentNode.childNodes[3].id;
            tasks.splice(taskIndex, 1);

            //Update display
            setTimeout(() => {
                resetDisplay()
                todoBtn.click()
            }, 150);
            
            //update Project Map/Project Counter
            countProjects(tasks);
        })
    })

    editBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            //set data on form
            editIndex = e.srcElement.parentNode.parentNode.childNodes[3].id;
            document.querySelector("#task-title-input").value = tasks[editIndex].title;
            document.querySelector("#task-description-input").value = tasks[editIndex].description;
            document.querySelector("#task-project-input").value = tasks[editIndex].project;
            document.getElementById("task-duedate-input").valueAsDate = new Date(tasks[editIndex].dueDate);
            document.getElementsByName("task-priority-input").forEach(elem => {
                if(elem.value == tasks[editIndex].priority ){
                    elem.checked = true;
                }
            });

            //set edit to true
            taskEdit = true;

            taskDialog.showModal()
            

            //Update display
            setTimeout(() => {
                resetDisplay()
                todoBtn.click()
            }, 150);
            
            //update Project Map/Project Counter
            countProjects(tasks);
        })
    });

});

noteBtn.addEventListener("click", ()=>{
    resetDisplay();
    showNotes(notes, display);
});

projectBtn.addEventListener("click", () =>{
    resetDisplay();
    showProjects(projects, Object.keys(projects), display);
    console.log(projects)

    //update project view button array
    projectViewBtn = document.querySelectorAll(".project-view");


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

completeBtn.addEventListener("click", ()=>{
    resetDisplay();
    showCompleteTasks(completeTasks, display);
});

addEventListener("keyup", e =>{
    if(e.code === "Escape"){
        cancelTaskBtn.click()
        cancelNoteBtn.click()
    } 
})



//TODO 
/*
Finish work on note editing buttons
*/