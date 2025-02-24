import { addGoal, showTasks} from "./task_components.js";
import "./styles.css";

//Array to hold tasks
const tasks = [];


//Get control variables
const addTaskBtn = document.querySelector("#add-task-btn");
const taskDialog = document.querySelector("#task-dialog");
const display = document.querySelector("#display");

//functions
function getTaskData(){
    const title = document.querySelector("#task-title-input").value;
    const description = document.querySelector("#task-description-input").value;
    const project = document.querySelector("#task-project-input").value;

    //format and store date
    var dateFormatter = document.querySelector("#task-duedate-input").value.split("-");
    dateFormatter[0] = dateFormatter[0].split("");
    var date = parseInt(dateFormatter[1]) + "/" + dateFormatter[2] + "/" + dateFormatter[0][2] + + dateFormatter[0][3];
    
        

    //get priority
    var priority;
    document.getElementsByName("task-priority-input").forEach(elem => {
        if(elem.checked){
            priority = elem.value;
        }
    });

    return {
        title,
        description,
        project,
        date,
        priority
    }
}

function resetDisplay(){
    display.innerHTML = "";
}

function resetForm(){
   document.querySelector("#my-form").reset();
}

//Program Events
addTaskBtn.addEventListener("click", () =>{taskDialog.showModal()});

//Add task to display
taskDialog.addEventListener("close", (e) =>{
    const taskData = getTaskData();
    tasks.push(addGoal(taskData.title, taskData.description,taskData.project,taskData.priority,taskData.date))

    //reset the form
    resetForm()    

    //reset display and show tasks
    resetDisplay()
    showTasks(tasks, display);

});

showTasks(tasks, display);

