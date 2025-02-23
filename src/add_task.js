const tasks = [];
const addTaskBtn = document.querySelector("#add-task-btn");
const taskDialog = document.querySelector("#task-dialog");
const submitTaskBtn = document.querySelector("#sumbit-task");



addTaskBtn.addEventListener("click", () =>{taskDialog.showModal()})
taskDialog.addEventListener("close", (e) =>{})

function getInputData(){

}