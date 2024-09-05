document.addEventListener('DOMContentLoaded', ()=>{
    const local_data=JSON.parse(localStorage.getItem("taskLists"));
    if(local_data){
        local_data.forEach((task)=>{
            allTasks.push(task);
        });
        taskUpdate();
    }
});

let allTasks=[];

const saveTasks=()=>{
    localStorage.setItem("taskLists", JSON.stringify(allTasks));
}

const submit=document.getElementById('done');

submit.addEventListener('click', (event)=>{
    event.preventDefault();
    taskAddtion();
});

const taskAddtion=()=>{
    const task_input=document.getElementById('todo_text');
    const text=task_input.value;
    task_input.value='';
    if(text){
        allTasks.push({task_text: text, done: false});
    }
    taskUpdate();
    saveTasks();
}
const taskUpdate=()=>{
    const ulItems=document.getElementById('lists');
    ulItems.innerHTML='';
    allTasks.forEach((task, indx) => {
        const item=document.createElement('li');
        item.classList.add='list';
        item.innerHTML=`
        <div class="input_p${task.done ? " complete" : ""}">
            <input type="checkbox" ${task.done ? " checked" : ""} id="checkbox">
            <p id="todo_info">${task.task_text}</p>
        </div>
        <div class="icons">
            <i class="bi bi-pencil-fill" id="edit" onclick=editIn(${indx})></i>
            <i class="bi bi-x-octagon-fill" id="delete" onclick=deleteIn(${indx})></i>
        </div>
        `
        item.addEventListener('change', ()=>{
            toggleDone(indx);
        });
        ulItems.append(item);
    });
}
const toggleDone=(indx)=>{
    allTasks[indx].done=!allTasks[indx].done;
    taskUpdate();
    saveTasks();
}
const deleteIn=(indx)=>{
    allTasks.splice(indx, 1);
    taskUpdate();
    saveTasks();
}
const editIn=(indx)=>{
    const task_input=document.getElementById('todo_text');
    task_input.value=allTasks[indx].task_text;
    deleteIn(indx);
    saveTasks();
}



