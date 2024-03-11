class Task {
    constructor(id, name, startDate, endDate, userName) {
        this.id = id;
        this.name = name;
        this.completed = false;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userName = userName;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    addTask(name, startDate, endDate, userName) {
        const newTask = new Task(this.size() + 1, name, startDate, endDate, userName);
        if (!this.head) {
            this.head = newTask;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newTask;
        }
        this.length++;
    }

    size() {
        return this.length;
    }

    filterTasks(filterValue) {       
        let current = this.head;
        const filteredTasks = [];
        while (current) {
            if (
                filterValue === "all" ||
                (filterValue === "incomplete" && !current.completed) ||
                (filterValue === "completed" && current.completed)
            ) {
                filteredTasks.push(current);
            }
            current = current.next;
        }
        return filteredTasks;
    }

    markTaskCompleted(taskId) {
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
            this.length--;
            return;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.id === taskId) {
                current.next = current.next.next;
                this.length--;
                break;
            }
            current = current.next;
        }
    }

    display() {
          let current = this.head;
        const tasks = [];
        while (current) {
            tasks.push(current);
            current = current.next;
        }
        return tasks;
    }
}

const taskManager = new LinkedList();
const taskList = new LinkedList();

function addTask() {
    const taskInput = document.getElementById("addInput");
    const taskData = taskInput.value.trim();
    const startDate = document.getElementById("startDateInput").value.trim();
    const endDate = document.getElementById("endDateInput").value.trim();
    const userName = document.getElementById("userName").value.trim();
    document.getElementById("startDateError").textContent = "";
    document.getElementById("endDateError").textContent = "";
    let isValid = true;
    if (taskData === "") {
        isValid = false;
    }
    if (startDate === "") {
        document.getElementById("startDateError").textContent = "required";
        isValid = false;
    }
    if (endDate === "") {
        document.getElementById("endDateError").textContent = "required";
        isValid = false;
    }
    if (userName === "") {
        alert("User Name is required");
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    taskList.addTask(taskData, startDate, endDate, userName);
    taskManager.addTask(taskData, startDate, endDate, userName);
    filtertask();
    taskInput.value = "";
    document.getElementById("startDateInput").value = "";
    document.getElementById("endDateInput").value = "";

    message.style.display ="none";
    showToastSuccess()
}

function filtertask() {
    const filterValue = document.getElementById("filterDropdown").value;
    const filteredTasks = taskManager.filterTasks(filterValue);
    showTaskList(filteredTasks);
}

function showTaskList(tasks) {
      const taskList = document.getElementById("tasks");

    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        const taskItem = document.createElement("li");
        let taskClass = "tasks";
        if (task.completed) {
            taskClass += " completed";
        }
        taskItem.className = taskClass;


        taskItem.textContent = ` ${task.name} |  Date: ${task.startDate} |  Date: ${task.endDate} | User: ${task.userName}`;
        const markCompletedButton = document.createElement("button");
        markCompletedButton.textContent = task.completed ? "Incomplete" : "Complete";

        markCompletedButton.classList.add("markButton");
        markCompletedButton.onclick = () => toggleCompleted(task.id);
        const deleteButton = document.createElement("i");
        deleteButton.classList.add("close");
        deleteButton.classList.add("fas");
        deleteButton.classList.add("fa-trash-alt");
        deleteButton.onclick = () => deleteTask(task.id);

        taskDiv.appendChild(taskItem);
        taskDiv.appendChild(markCompletedButton);
        taskDiv.appendChild(deleteButton);
        taskList.appendChild(taskDiv);
    });
    updateNotification();
  
}

function toggleCompleted(taskId) {
    taskManager.markTaskCompleted(taskId);
    filtertask();
}

function deleteTask(taskId) {
    taskManager.deleteTask(taskId);
    filtertask();
    showToast();
}

function searchTasks() {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim().toLowerCase();
    const tasks = document.querySelectorAll(".task");
    const message = document.getElementById("message");
    message.style.display ="none";

    let found = false;

    tasks.forEach((task) => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(query)) {
            task.style.display = "block"; 
            found = true;
        } else {
            task.style.display = "none";
           
        }
    });

    if (!found) {
        message.style.display = "block";
      
    } else {
        message.style.display = "none";
    }
   
}

function toggleNotification() {
   
    const notification = document.getElementById("task-details");
    if (notification.style.display === "none") {
        notification.style.display = "block";
        
        renderNotificationList();
    } else {
        notification.style.display = "none";
    }
}

function renderNotificationList() {
 
    const notificationListElement = document.getElementById("notification-task-list");
    notificationListElement.innerHTML = "";
    const tasks = taskList.display();
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.name;
        li.addEventListener("click", () => removeTaskFromNotification(task.id));
        notificationListElement.appendChild(li);
    });
}

function removeTaskFromNotification(taskId) {
 
    taskList.deleteTask(taskId);
    renderNotificationList();
    updateNotification();
}

function updateNotification() {
  
    const notificationCount = document.getElementById("notification-count");
    notificationCount.textContent = taskList.length;
    if (taskList.length === 0) {
        document.getElementById("task-details").style.display = "block";
    }
}

function addNewUser() {
    const newUserName = document.getElementById("newUserName").value.trim();
    var selectName = document.getElementById("userName");
  

    if (newUserName !== "") {
        selectName.style.display = "block";
        const select = document.getElementById("userName");
        const option = document.createElement("option");
        option.text = newUserName;
        select.add(option);
    }
}

function showToast() {
    var toast = document.getElementById("toastMessage");
    toast.classList.add("show");
    setTimeout(function(){
      toast.classList.remove("show");
    }, 2000); 
  }


  function showToastSuccess() {
    var toast = document.getElementById("toastMessageSuccess");
    toast.classList.add("show");
    setTimeout(function(){
      toast.classList.remove("show");
    }, 2000); 
  }
