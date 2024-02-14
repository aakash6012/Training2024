let tasks = [];

function addTask() {
  let txtValue = document.getElementById("add-txt");
  let userInput = txtValue.value;
  if (userInput == "") {
    alert("Please enter value");
  } else {
    var taskObject = {
      taskId: tasks.length + 1,
      taskName: userInput,
      completed: false,
    };

    tasks.push(taskObject);
    filtertask();
  }

  txtValue.value = "";
}

function filtertask() {
  let filterContain = document.getElementById("taskFilter");
  let filterValue = filterContain.value;
  let filteredTasks = tasks;
  if (filterValue === "pending") {
    filteredTasks = tasks.filter(taskA);
    function taskA(i) {
      return !i.completed;
    }
  } else if (filterValue === "completed") {
    filteredTasks = tasks.filter(taskB);
    function taskB(i) {
      return i.completed;
    }
  }

  showTaskList(filteredTasks);
}

function showTaskList(filteredTasks) {
  let taskList = document.getElementById("list-conatiner");
  taskList.innerHTML = "";
  const taskToRender = filteredTasks;
  taskToRender.forEach((task, index) => {
    const taskItem = document.createElement("li");

    let taskClass = "task";
    if (task.completed) {
      taskClass += " completed";
    }
    taskItem.className = taskClass;

    const taskText = document.createElement("span");
    taskText.textContent = task.taskName;
    const taskActions = document.createElement("div");

    const markCompletedButton = document.createElement("button");
    if (task.completed) {
      markCompletedButton.textContent = "Incomplete";
    } else {
      markCompletedButton.textContent = "Complete";
    }
    markCompletedButton.onclick = () => toggleCompleted(index);
    var deleteButton = document.createElement("i");
    deleteButton.classList.add("close");
    deleteButton.classList.add("fas");
    deleteButton.classList.add("fa-trash-alt");

    deleteButton.onclick = () => deleteTask(index);
    taskActions.appendChild(markCompletedButton);
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskActions);

    taskList.appendChild(taskItem);
  });
}

function deleteTask(index) {
  tasks.splice(index, 2);
  filtertask();
}

function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  filtertask();
}
