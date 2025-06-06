//These functions will be used to set the Title and note values
class Goal{
    constructor(title, description, project, priority, dueDate){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.project = project
        this.dueDate = dueDate
        this.complete = false;
    }

}

function addGoal(title, description, project, priority, dueDate){
    return new Goal(title, description, project, priority, dueDate)
}

function showTasks(taskArray, htmlComponent){
    if(taskArray.length > 0){
        taskArray.forEach((elem, index) => {
            if(!elem.complete){
                htmlComponent.innerHTML += `
            <div id="task">
                <div id="check" class="check"><input type="checkbox"></div>
                <div class="task-title" id="${index}">${elem.title}</div>
                <div id="task-description">${elem.description}</div>
                <div id="date">
                    <div>Due</div>
                    <div id="ac-date">${elem.dueDate}</div>
                </div>
                <div id="editOpts">
                    <div id="delete">
                    </div>
                    <div id="edit">
                    </div>
                </div>
                <div class="task-priority-${elem.priority}"></div>
            </div>
            `
            }else{
                htmlComponent.innerHTML += `
            <div id="task">
                <div id="check" class="check"><input type="checkbox" checked></div>
                <div class="task-title">${elem.title}</div>
                <div id="task-description">${elem.description}</div>
                <div id="date">
                    <div>Due</div>
                    <div id="ac-date">${elem.dueDate}</div>
                </div>
                <div class="task-priority-${elem.priority}"></div>
            </div>
            `
            }
        });

    } else {
        htmlComponent.innerHTML += `
        <div id="empty-message">
            No tasks here! Click add task in the top right corner to add one.
        </div>     `
    }
}

export {addGoal, showTasks}



