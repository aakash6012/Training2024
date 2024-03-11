{/* <script> */}
class Task {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.completed = false;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addTask(name) {
        const newTask = new Task(this.size() + 1, name);
        if (!this.head) {
            this.head = newTask;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newTask;
        }
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    filterTasks(filterValue) {
        let current = this.head;
        const filteredTasks = [];
        while (current) {
            if (filterValue === "all" ||
                (filterValue === "incomplete" && !current.completed) ||
                (filterValue === "completed" && current.completed)) {
                filteredTasks.push(current);
            }
            current = current.next;
        }
        return filteredTasks;
    }

    toggleCompleted(taskId) {
        let current = this.head;
        while (current) {
            if (current.id === taskId) {
                current.completed = !current.completed;
                break;
            }
            current = current.next;
        }
    }

    deleteTask(taskId) {
        if (!this.head) {
            return;
        }
        if (this.head.id === taskId) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.id === taskId) {
                current.next = current.next.next;
                break;
            }
            current = current.next;
        }
    }
}

const taskManager = new LinkedList();

function addTask() {
    const taskInput = document.getElementById('addInput');
    const taskData = taskInput.value.trim();
    if (taskData !== '') {
        taskManager.addTask(taskData);
        filtertask();
        taskInput.value = '';
    }
}

function filtertask() {
    const filterValue = document.getElementById('filterDropdown').value;
    const filteredTasks = taskManager.filterTasks(filterValue);
    showTaskList(filteredTasks);
}

function showTaskList(tasks) {
    const taskList = document.getElementById('tasks');

    taskList.innerHTML = '';
    tasks.forEach(task => {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add('task');
        const taskItem = document.createElement('li');
        taskItem.textContent = task.name;
        const markCompletedButton = document.createElement('button');
        markCompletedButton.textContent = task.completed ? 'Incomplete' : 'Complete';
        markCompletedButton.onclick = () => toggleCompleted(task.id);
        const deleteButton = document.createElement('i');
        deleteButton.classList.add('close');
        deleteButton.classList.add('fas');
        deleteButton.classList.add('fa-trash-alt');
        deleteButton.onclick = () => deleteTask(task.id);

        taskDiv.appendChild(taskItem);
        taskDiv.appendChild(markCompletedButton);
        taskDiv.appendChild(deleteButton);
        taskList.appendChild(taskDiv);
    });
}

function toggleCompleted(taskId) {
    taskManager.toggleCompleted(taskId);
    filtertask();
}

function deleteTask(taskId) {
    taskManager.deleteTask(taskId);
    filtertask();
}

function searchTasks() {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim().toLowerCase();
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((task) => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(query)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}
// </script>