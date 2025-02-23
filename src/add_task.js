import { addGoal, showTasks} from "./task_components.js";

const tasks = [];

tasks.push(addGoal("Workout", "Go to LA fitness and workout", "N/A", "high", "2/23/25"));  
tasks.push(addGoal("Read", "Finish one chapter of 'Atomic Habits'", "N/A", "mid", "2/24/25"));  
tasks.push(addGoal("Code", "Work on Dynamic Bulk Uploader project", "N/A", "high", "2/25/25"));  
tasks.push(addGoal("Study", "Review recursion and DFS for 1 hour", "N/A", "high", "2/23/25"));  
tasks.push(addGoal("Meditate", "Practice mindfulness for 10 minutes", "N/A", "low", "2/26/25"));  
tasks.push(addGoal("Call", "Check in with family and have a conversation", "N/A", "mid", "2/27/25"));   
 


const addTaskBtn = document.querySelector("#add-task-btn");
const taskDialog = document.querySelector("#task-dialog");
const taskDisplay = document.querySelector("#display");

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

//Show task input form
addTaskBtn.addEventListener("click", () =>{taskDialog.showModal()});

//Add task to display
taskDialog.addEventListener("close", (e) =>{
    const taskData = getTaskData();    
    tasks.push(addGoal(taskData.title, taskData.description,taskData.project,taskData.priority,taskData.date))
    showTasks(tasks, taskDisplay);

});

showTasks(tasks, taskDisplay);

