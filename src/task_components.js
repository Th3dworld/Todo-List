//These functions will be used to set the Title and note values
class Goal{
    constructor(title, description, project, priority, dueDate){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.project = project
        this.dueDate = dueDate
    }

}

function addGoal(title, description, project, priority, dueDate){
    return new Goal(title, description, project, priority, dueDate)
}

function showTasks(taskArray, htmlComponent){
    if(taskArray.length > 0){
        taskArray.forEach(elem => {
            htmlComponent.innerHTML += `
            <div id="task">
            <div id="check"><input type="checkbox"></div>
            <div id="task-title">${elem.title}</div>
            <div id="task-description">${elem.description}</div>
            <div id="date">
                <div>Due</div>
                <div id="ac-date">${elem.dueDate}</div>
            </div>
            <div class="task-priority-${elem.priority}"></div>
            </div>
            `
        });
    }
}

export {addGoal, showTasks}



