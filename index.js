document.addEventListener("DOMContentLoaded", () => {
    const taskTitle = document.getElementById('task-title');
    const taskDesc = document.getElementById('task-desc');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Function to render tasks
    const renderTasks = (filter = "all") => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "active" && task.completed) return;
            
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.title} - ${task.description}</span>
                <div>
                    <button class="edit-btn"background-color:green data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                    <button class="complete-btn" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };
    
    // Add task
    addTaskBtn.addEventListener('click', () => {
        const title = taskTitle.value.trim();
        const description = taskDesc.value.trim();
        
        if (title && description) {
            tasks.push({ title, description, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskTitle.value = '';
            taskDesc.value = '';
        }
    });

    //(edit, delete, complete)
    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('delete-btn')) {
            tasks.splice(index, 1);
        } else if (e.target.classList.contains('edit-btn')) {
            const newTitle = prompt("Edit title", tasks[index].title);
            const newDesc = prompt("Edit description", tasks[index].description);
            if (newTitle && newDesc) {
                tasks[index].title = newTitle;
                tasks[index].description = newDesc;
            }
        } else if (e.target.classList.contains('complete-btn')) {
            tasks[index].completed = !tasks[index].completed;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    });

    // Task filters
    document.querySelector('.task-filter').addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        renderTasks(filter);
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
    
    // Initial render
    renderTasks();
});
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
  }
  function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    updateLocalStorage();
  }
  function filterTasks(filter) {
    if (filter === 'completed') {
      return tasks.filter(t => t.completed);
    }
    if (filter === 'active') {
      return tasks.filter(t => !t.completed);
    }
    return tasks;  // All tasks
  }
  function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }
  const sortable = new Sortable(document.getElementById('taskList'), {
    animation: 150,
    onEnd: function (evt) {
      // Update task order based on drag and drop
    }
  });
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
          
