document.addEventListener('DOMContentLoaded', function() {
    // selectors
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Event Listeners
    document.addEventListener('DOMContentLoaded', getTasks);
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    taskList.addEventListener('click', toggleTaskStatus);
    taskList.addEventListener('click', editTask);
    

    //Functions
    
    function editTask(event) {
        console.log("editTask function is being called.");
        if (event.target.classList.contains('edit-btn')) {
            const taskItem = event.target.parentElement;
            const taskText = taskItem.querySelector('.task-text');
            taskText.contentEditable =true;
            taskText.focus();
        }
    }

    taskList.addEventListener('blur', function(event) {
        console.log("blur function is being called.");
        if (event.target.classList.contains('task-text')) {
            const editedText = event.target.textContent.trim();
            const taskItem =event.target.parentElement;
            const taskIndex = Array.from(taskList.children).indexOf(taskItem);
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks[taskIndex].text = editedText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            event.target.contentEditable = false;
        }
    }, true);

    function addTask(event) {
        event.preventDefault();
        console.log("addTask function is being called.");
        const taskText = taskInput.value.trim();
        if (!taskText) {
            console.log("Task text is empty");
            return;
        }
        const task = {
            text: taskText,
            completed: false
        };
        createTaskElement(task);
        saveTask(task);
        taskInput.value = '';
    }

    function createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <button class="toggle-btn">${task.completed ? '✓' : ''}✓</button>
            <span>${task.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">X</button>
        `;
        taskList.appendChild(taskItem);
    }

    function deleteTask(event) {
        if (event.target.classList.contains('delete-btn')) {
            const taskItem = event.target.parentElement;
            taskItem.remove();
            removeTaskFromLocalStorage(taskItem);
        }
    }

    function toggleTaskStatus(event) {
        if (event.target.classList.contains('toggle-btn')) {
            const taskItem = event.target.parentElement;
            const taskText = taskItem.querySelector('span');
            taskText.classList.toggle('completed');
            const taskIndex = Array.from(taskList.children).indexOf(taskItem);
            const tasks =JSON.parse(localStorage.getItem('tasks'));
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function saveTask(task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(createTaskElement);
    }

    function removeTaskFromLocalStorage(taskItem) {
        const taskText = taskItem.firstChild.textContent;
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach((task, index) => {
            if (task.text === taskText) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskStatusInLocalStorage(taskItem) {
        const taskText = taskItem.firstChild.textContent;
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(task => {
            if(task.text === taskText) {
                task.completed = !task.completed;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

});