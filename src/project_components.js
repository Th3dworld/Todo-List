function projectCounter(projectObj,taskObj){
    console.log("count me in")
    console.log(taskObj)
    console.log(taskObj.project)

    if(!(projectObj[taskObj.project])){
        projectObj[taskObj.project] = 1
    }else{
        projectObj[taskObj.project] += 1
    }

    console.log(projectObj)
}

function showProjects(projectObj, projectArray, htmlComponent){
    if(projectArray.length > 0){
        projectArray.forEach(project => {
            display.innerHTML += `
                <div class="project-view" id="${project}">
                    <div class="project-name">${project}</div>
                    <div class="number-of-tasks">Tasks<br>${projectObj[project]}</div>
                    <div id="project-tasks">
                    </div>
                </div>
            `;}
        );
    } else {
        htmlComponent.innerHTML += `
        <div id="empty-message">
            No projects here!<br>
            You will see your projects here when you create a task with a project group.<br>
            Click Add Task in the top right corner to do that.
        </div>     `
    }
}

{/* */}

export {projectCounter,showProjects}