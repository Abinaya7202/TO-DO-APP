document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks=JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTasksList()
        updateStats()
    }
})
let tasks=[]

const saveTask=()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
};

const updateTasksList =()=>{
    const taskList=document.getElementById("task-list");
    taskList.innerHTML=""

    tasks.forEach((tasks,index)=>{
        const listItem =document.createElement("li")
        listItem.innerHTML=`
        <div class="taskItem">
            <div class="task ${tasks.completed ? 'completed':''}">
            <input type="checkbox" class="checkbox" ${tasks.completed? 'checked':''}>
            <p>${tasks.text}</p>
        </div>
        <div class="icons">
            <img src="./img/pen.png" alt="" onclick="editTask(${index})">
            <img src="./img/delete.png" alt="" onclick="deleteTask(${index})">
        </div>
    </div>
        `
    let checkbox=listItem.querySelector(".checkbox");
    checkbox.addEventListener("click" , function(){
        toggleTaskCompleted(index)
        updateTasksList()
        updateStats()
    })
    taskList.append(listItem)
    }) 
}

const toggleTaskCompleted =(index)=>{
    tasks[index].completed =!tasks[index].completed
    updateTasksList()
    updateStats()

}

const deleteTask=(index)=>{
    tasks.splice(index,1)
    updateTasksList()
    updateStats()
    saveTask()
}
const editTask=(index)=>{
    const taskInput=document.getElementById("taskInput")
    taskInput.value= tasks[index].text;
    tasks.splice(index,1);
    updateTasksList()
    updateStats()
    saveTask()
}
const updateStats =()=>{
    const completedTasks=tasks.filter((task)=>task.completed).length;
    const totalTasks=tasks.length;
    const progress=(completedTasks/totalTasks)*100
    const progressBar=document.getElementById("progress")

    progressBar.style.width=`${progress}%`;
    document.getElementById('numbers').innerHTML=`${completedTasks}/${totalTasks}`
}

const addTask =()=>{
    let taskInput=document.getElementById("taskInput")
    let text = taskInput.value.trim()
    taskInput.value="";
    
    if(text){
        tasks.push({text:text,completed:false})
    }
    updateTasksList()
    updateStats()
    saveTask()
}

document.getElementById("newTask").addEventListener('click',function (e){
    e.preventDefault();
    addTask()
})