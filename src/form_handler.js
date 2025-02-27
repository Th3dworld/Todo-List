function taskFormIsValid(){
    //get priority
    var priority = "";
    document.getElementsByName("task-priority-input").forEach(elem => {
        if(elem.checked){
            priority = elem.value;
        }
    });

    //Check if form is filled before creating task object
    if(document.querySelector("#task-title-input").value !== "" &&
    document.querySelector("#task-duedate-input").value !== "" &&
    priority !== ""){
        return true
    }
}

function getFormData(){
    const title = document.querySelector("#task-title-input").value;
    const description = document.querySelector("#task-description-input").value;
    const project = document.querySelector("#task-project-input").value;

    //format and store date
    var dateFormatter = document.querySelector("#task-duedate-input").value.split("-");
    dateFormatter[0] = dateFormatter[0].split("");
    var date = parseInt(dateFormatter[1]) + "/" + dateFormatter[2] + "/" + dateFormatter[0][2] + + dateFormatter[0][3];
    
        

    //get priority
    var priority = "";
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

function resetForm(formId){
    document.querySelector(formId).reset();
}

function noteFormIsValid(){
    if(
        document.querySelector("#note-title-input").value != "" &&
        document.querySelector("#note-title-input").value != ""
    ){
        return true;
    }
}

export {taskFormIsValid, noteFormIsValid, getFormData, resetForm}