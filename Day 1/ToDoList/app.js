const addButton = document.querySelector('.add');

const taskNameInput = document.querySelector('.taskName');
const taskContainer = document.querySelector('.tasks');

let uid = 0;
const tasks = new Set();

addButton.addEventListener("click", addTask);
addButton.addEventListener("enter", addTask);
taskNameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      // Handle the "Enter" key press here
      console.log('Enter key pressed!');
      addTask();
    }
  });

function testfun(){
    alert("done")
}

// Add an event listener for input
taskNameInput.addEventListener('input', function() {
    // Check if the length exceeds the limit
    if (taskNameInput.value.length > 40) {
      // Trim the input to the limit
      taskNameInput.value = taskNameInput.value.slice(0, 40);
    }
  });


function addTask(){
    let taskText = taskNameInput.value;
    if (taskText === null || taskText === ""){
        alert("Enter Some Task Text");
        return;
    }
    
    console.log("entered addTask function");
    uid+=1;
    const newTask = { id: uid, title: taskText, completed: false}
    tasks.add(newTask);

    // Create a new task element
      const newTaskElement = document.createElement("div");
      newTaskElement.classList.add("task", "card", `task${uid}`);

      // Create a paragraph element for the task name
      const taskNameParagraph = document.createElement("p");
      taskNameParagraph.classList.add("taskNameCard");
      taskNameParagraph.textContent = taskText;

      // Create a div for task functions (done, delete)
      const taskFunctionsDiv = document.createElement("div");
      taskFunctionsDiv.classList.add("taskFunctions");

      // Create icons for done and delete
      const doneIcon = document.createElement("i");
      doneIcon.classList.add("material-icons", "done");
      doneIcon.innerHTML = "&#xe86c;";

      doneIcon.addEventListener("click", function (){
        // Get the task ID from the class name
        const className = newTaskElement.classList.value;
        const matches = className.match(/task(\d+)/);
        const taskId = matches ? parseInt(matches[1], 10) : null;
    
        if (taskId !== null) {
        console.log("Task ID to mark complete:", taskId);
        // Now you have the task ID, and you can use it as needed, e.g., for deletion
        markComplete(taskId);
        } else {
        console.error("Task ID not found in the class name.");
        }
      });

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("material-icons", "delete");
      deleteIcon.innerHTML = "&#xe872;";

     // Event listener for delete icon
     deleteIcon.addEventListener("click", function() {
        // Get the task ID from the class name
        const className = newTaskElement.classList.value;
        const matches = className.match(/task(\d+)/);
        const taskId = matches ? parseInt(matches[1], 10) : null;
    
        if (taskId !== null) {
        console.log("Task ID to delete:", taskId);
        // Now you have the task ID, and you can use it as needed, e.g., for deletion
        deleteTask(taskId);
        } else {
        console.error("Task ID not found in the class name.");
        }
    
        // Optionally, you can call your deleteTask function here
        // deleteTask(taskId);
     });

      // Append elements to their respective parent
      taskFunctionsDiv.appendChild(doneIcon);
      taskFunctionsDiv.appendChild(deleteIcon);

      newTaskElement.appendChild(taskNameParagraph);
      newTaskElement.appendChild(taskFunctionsDiv);
      newTaskElement.style.marginBottom = "6px";

      // Append the new task element to the task container
      taskContainer.appendChild(newTaskElement);

      // Optionally, clear the input after adding the task
      taskNameInput.value = "";

}

function deleteTask(taskId) {
    // Find the task element with the matching task ID
    const taskElementToDelete = document.querySelector(`.task${taskId}`);
  
    if (taskElementToDelete) {
      // Remove the task element from the DOM
      taskElementToDelete.remove();
      tasks.delete(taskId);
  
      console.log(`Task with ID ${taskId} deleted.`);
    } 
    else {
      console.error(`Task with ID ${taskId} not found.`);
    }
}

function markComplete(taskId){
    const taskElementToComplete = document.querySelector(`.task${taskId}`)
    if(taskElementToComplete){
       // Convert the Set to an array
const tasksArray = Array.from(tasks);

// Assuming 'id' is the index you want to access
const task = tasksArray[taskId-1];

    if (task.completed !== true) {
        console.log("entered markComplete");
        let taskInput = taskElementToComplete.querySelector('p');
        taskInput.style.textDecoration = 'line-through';
        taskContainer.appendChild(taskElementToComplete);
        task.completed = true;
    } 
    else {
        console.log("entered unmarkComplete");
        let taskInput = taskElementToComplete.querySelector('p');
        taskInput.style.textDecoration = 'none';
        task.completed = false;
        }
    }
}
  

