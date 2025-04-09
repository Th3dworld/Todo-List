function showCompleteTasks(completeTaskArray, htmlComponent){
    if(completeTaskArray.length > 0){
        completeTaskArray.forEach((elem, index) => {     
            htmlComponent.innerHTML += `
            <div id="task" class="completed-task">
                <div id="check" class="check"><input type="checkbox" checked></div>
                <div class="task-title" id="${index}" style="text-decoration: line-through;">${elem.title}</div>
                <div id="task-description" style="text-decoration: line-through;">${elem.description}</div>
                <div id="date">
                    <div>Due</div>
                    <div id="ac-date">${elem.dueDate}</div>
                </div>
                <div id="compDelete"></div>
                <div class="task-priority-${elem.priority}"></div>
            </div>
            `
        });

    } else {
        htmlComponent.innerHTML += `
        <div id="empty-message">
            No Completed tasks here! Click add task in the top right corner to add one and get to work.
        </div>     `
    }
}

export {showCompleteTasks}