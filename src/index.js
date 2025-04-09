import { addGoal, showTasks} from "./task_components.js";
import { projectCounter, showProjects } from "./project_components.js";
import { addNote, showNotes, getNoteFormData } from "./note_components.js";
import {taskFormIsValid, noteFormIsValid, getFormData, resetForm} from "./form_handler.js"
import { showCompleteTasks } from "./completed_components.js";
import { isEqual, isBefore, isAfter, compareAsc, compareDesc } from 'date-fns';


import "./styles.css";


//Array to hold tasks
let tasks = [];
let completeTasks = [];
let notes = [];
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

//check if storage is available
function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
}

if (storageAvailable("localStorage")) {
    console.log("Storage is Available")
} else {
    console.log("Storage is  not Available")
}

function getStorage(){
    if(localStorage.getItem("tasks")){
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if(localStorage.getItem("projects")){
        projects = JSON.parse(localStorage.getItem("projects"))
    }
    if(localStorage.getItem("completed")){
        completeTasks = JSON.parse(localStorage.getItem("completed"))
    }
    if(localStorage.getItem("notes")){
        notes = JSON.parse(localStorage.getItem("notes"))
    }
}

window.addEventListener("unload", (e) =>{populateStorage()});


function populateStorage() {
    if(tasks){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    if(projects){
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    if(completeTasks){
        localStorage.setItem("completed", JSON.stringify(completeTasks));
    }
    if(notes){
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}

function editTask(){
    tasks[editIndex].title = document.querySelector("#task-title-input").value;
    tasks[editIndex].description = document.querySelector("#task-description-input").value;
    tasks[editIndex].project = document.querySelector("#task-project-input").value;
    var dateFormatter = document.querySelector("#task-duedate-input").value.split("-");        dateFormatter[0] = dateFormatter[0].split("");
    var date = parseInt(dateFormatter[1]) + "/" + parseInt(dateFormatter[2]) + "/" + dateFormatter[0][2] + + dateFormatter[0][3];
    tasks[editIndex].dueDate = date;
    document.getElementsByName("task-priority-input").forEach(elem => {
        if(elem.checked){
            tasks[editIndex].priority = elem.value;
        }
    });
}

function editNote(){
    notes[editIndex].title = document.querySelector("#note-title-input").value;
    notes[editIndex].note = document.querySelector("#note-description-input").value;
    const dateFormatter = new Date();
    const writeDate = dateFormatter.getMonth() +"/"+ dateFormatter.getDate() +"/"+ String(dateFormatter.getFullYear()).split("")[2] + String(dateFormatter.getFullYear()).split("")[3]
    notes[editIndex].writeDate = writeDate;
    notes[editIndex].updated = true
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
        let currDate = ((new Date())).toLocaleDateString('en-US', {
            year: "numeric",
            month : "2-digit",
            day: "2-digit"
        })

        let taskDate = (new Date(taskData.date)).toLocaleDateString('en-US',
        {
            year: "numeric",
            month : "2-digit",
            day: "2-digit"
        })

       
        if(currDate <=  taskDate){
            tasks.push(addGoal(taskData.title, taskData.description,taskData.project,taskData.priority,taskData.date));
        }

        //reset display and show tasks
        todoBtn.click()
    }else if(taskEdit){
        editTask();
       
        //reset display and show tasks
        todoBtn.click()
    }
    
    //reset the form
    resetForm("#my-form") 

    

    //count projects
    countProjects(tasks);
});

noteDialog.addEventListener("close", ()=>{
    if(noteFormIsValid() && !noteEdit){
        const noteData = getNoteFormData();
        console.log(noteData)
        notes.push(addNote(noteData.title, noteData.note, noteData.writeDate));
        
        //show notes
        noteBtn.click()
    }else if(noteEdit){
        editNote()

        //show notes
        noteBtn.click()
    }

    //reset the form
    resetForm("#my-note-form") 

    
});

//form events
cancelTaskBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    taskEdit = false
    //reset the form so it is never valid on submission
    resetForm("#my-form");
    taskDialog.close();   
});

cancelNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    noteEdit = false
    resetForm("#my-note-form");
    noteDialog.close();
})




//Menu button event listener
todoBtn.addEventListener("click", () =>{
    resetDisplay();
    showTasks(tasks, display);

    //populate storage
    // populateStorage()

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

    //populate storage
    // populateStorage()

    noteEditBtns = document.querySelectorAll("#editer");
    noteDeleteBtns = document.querySelectorAll("#deleter");

    noteEditBtns.forEach(btn => {
        btn.addEventListener("click", (e)=>{
            editIndex = e.srcElement.parentNode.parentNode.id;
            document.querySelector("#note-title-input").value = notes[editIndex].title;
            document.querySelector("#note-description-input").value = notes[editIndex].note;
            
            noteEdit = true

            noteDialog.showModal()
            
        });
    });

    noteDeleteBtns.forEach(btn => {
        btn.addEventListener("click", (e)=>{
            editIndex = e.srcElement.parentNode.parentNode.id;
            
            notes.splice(editIndex, 1);
            
            //Update display
            setTimeout(() => {
                resetDisplay()
                noteBtn.click()
            }, 150);
           
            
        });
    });
});

projectBtn.addEventListener("click", () =>{
    resetDisplay();
    showProjects(projects, Object.keys(projects), display);

    //Populate Storage
    // populateStorage()

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
    showCompleteTasks(completeTasks.reverse(), display);
    deletBtns = document.querySelectorAll("#compDelete");
    
    deletBtns.forEach(btn => {
        btn.addEventListener("click", (e)=>{
            editIndex = e.srcElement.parentNode.childNodes[3].id
            completeTasks.splice(editIndex,1)

            //Update display
            setTimeout(() => {
                resetDisplay()
                completeBtn.click()
            }, 150);
        });
    });

    checkBtns = document.querySelectorAll(`input[type=checkbox]`);
    console.log(checkBtns);
    checkBtns.forEach(btn => {
        btn.addEventListener("click", (e)=>{
            e.preventDefault()
        } );
    });
});

addEventListener("keyup", e =>{
    if(e.code === "Escape"){
        cancelTaskBtn.click()
        cancelNoteBtn.click()
    } 
})

//Always show tasks first
getStorage();
todoBtn.click();

