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
const display = document.querySelector("#display");

addTaskBtn.addEventListener("click", () =>{taskDialog.showModal()});
taskDialog.addEventListener("close", (e) =>{
    const title = document.querySelector("#task-title-input").value;
    const description = document.querySelector("#task-description-input").value;
    const project = document.querySelector("#task-project-input").value;
    var priority;    

    //get priority
    document.getElementsByName("task-priority-input").forEach(elem => {
        if(elem.checked){
            priority = elem.value;
        }
    });

    console.log(priority)
    console.log(project)
    console.log(description)
    console.log(title)

    tasks.push(addGoal(title, description,project,priority, ""))

    showTasks(tasks);

    console.log(tasks);
});

