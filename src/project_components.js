function projectCounter(projectObj,taskObj){
    if(!(projectObj[taskObj.project] += 1)){
        projectObj[taskObj.project] = 1
    }else{
        projectObj[taskObj.project] += 1
    }
}

function showProjects(taskArray, projectArray, htmlComponent){
    if(projectArray.length > 1){
        taskArray.forEach(task => {
            display.innerHTML += `
                <div class="project-view">
                    <div class="project-name">${task.project}</div>
                    <div class="number-of-tasks">Tasks<br>${projects[task.project]}</div>
                    <div id="project-tasks">
                    </div>
                </div>
            `;}
        );
    } else {
        htmlComponent.innerHTML += `
        <div id="empty-message">
            No projects here! Click add task in the top right corner to add one.
        </div>     `
    }
}

{/* <div class="project-task">
    <div class="project-task-title">${task.title}</div>
    <div class="project-date">
        <div>Due: ${task.dueDate}</div>
    </div>
    <div class="task-priority-${task.priority}"></div>
</div> */}

export {projectCounter,showProjects}