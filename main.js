// --------------darkmood with local storage-----------

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("darkmood");
    themeIcon.style.transform = 'translateX(30px)';
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeIcon.style.color = 'rgba(255, 205, 5, 1)';
}

function changeDarkmood(){
    const themeIcon = document.querySelector('#themeIcon');

    document.body.classList.toggle('darkmood');
    if (document.body.classList.contains('darkmood')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeIcon.style.transform = 'translateX(30px)';
        themeIcon.style.color = 'rgba(255, 205, 5, 1)'
        localStorage.setItem("theme", "dark");
    }else{
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeIcon.style.transform = 'translateX(-30px)';
        themeIcon.style.color = 'black';
        localStorage.setItem("theme", "light");
    }

}

// -----------------add task-----------------
function updateTaskCount() {
    const totalTasks = document.querySelector('#totalTasks');
    const completedTasks = document.querySelector('#completedTasks');
    const taskListN = document.querySelectorAll('#taskList li').length;
    const completedTaskListN = document.querySelectorAll('#completedTaskList li').length;
    totalTasks.textContent = `Total Tasks : ${taskListN +completedTaskListN}`;
    completedTasks.textContent = `completed Tasks : ${completedTaskListN}`;

    if (completedTaskListN === 0) {
        document.querySelector('#heading').style.display = 'none';
    }else{
        document.querySelector('#heading').style.display = 'block';
    }
}



function addTask(){
    const inputText = document.querySelector('#taskInput');
    const taskInput = inputText.value.trim();
    const completedTaskList = document.querySelector('#completedTaskList');
    const taskList = document.querySelector('#taskList');
    const heading = document.querySelector('#heading');

    if (taskInput === ""){
        alert("Please enter a task");
        return;
    }


    
    const li = document.createElement('li');
    const h5 = document.createElement('h5');
    const editTask = document.createElement('button');
    const deleteTask = document.createElement('button');
    const checkbox = document.createElement('input');
    const div = document.createElement('div');
    h5.textContent = taskInput;

    editTask.className = "editTask";
    editTask.textContent = "Edit";
    editTask.onclick = () => {
        const newTask = prompt("Edit task:", h5.textContent);
        if (newTask && newTask.trim() !== "") h5.textContent = newTask.trim();
        saveTasks();
    };

    deleteTask.className = "deleteTask";
    deleteTask.textContent = "Delete";
    deleteTask.onclick = () => {
        li.remove();
        updateTaskCount();
        saveTasks();
    };


    checkbox.type = "checkbox";
    checkbox.className = "complete";
    checkbox.onchange = () => {
        if (checkbox.checked) {
            heading.style.display ="block";
            completedTaskList.appendChild(li);
            editTask.style.display = "none";
        } else {
            heading.style.display ="none";
            taskList.appendChild(li);
            editTask.style.display = "block";
        }
        updateTaskCount();
        saveTasks();
    };

    div.className = "btns";

    div.appendChild(editTask);
    div.appendChild(deleteTask);
    div.appendChild(checkbox);
    li.appendChild(h5);
    li.appendChild(div);
    taskList.appendChild(li);

    inputText.value = "";
    inputText.focus();
    updateTaskCount();
    saveTasks();

}

updateTaskCount();


// -------------- enter click ----------
document.querySelector('#taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
    
});

// --------------local storage------------

function saveTasks(){
    const tasks = {
        normal: [],
        completed: []
    };

    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.normal.push(li.querySelector('h5').textContent);
    });

    document.querySelectorAll('#completedTaskList li').forEach(li => {
        tasks.completed.push(li.querySelector('h5').textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const saved = localStorage.getItem('tasks');
    if (!saved) return;
    const tasks = JSON.parse(saved);

    tasks.normal.forEach(text => {
        createTaskElement(text, false);
    });

    tasks.completed.forEach(text => {
        createTaskElement(text, true);
    });
}
function createTaskElement(taskText, isCompleted){
    const inputText = document.querySelector('#taskInput');
    inputText.value = taskText;
    addTask();
    if (isCompleted){
        const lastLi = document.querySelector('#taskList li:last-child');
        lastLi.querySelector('.complete').checked = true;
        lastLi.querySelector('.complete').onchange();
    }
}

loadTasks();

// ------------------if input empty----------------

function toggleAddButton() {
    const inputText = document.querySelector('#taskInput');
    const addButton = document.querySelector('#addTaskBtn');
    if (inputText.value.trim() === "") {
        addButton.disabled = true;
        addButton.style.cursor = "not-allowed";
    } else {
        addButton.disabled = false;
        addButton.style.cursor = "pointer";
    }
}

document.querySelector('#taskInput').addEventListener('input', toggleAddButton);

toggleAddButton();




