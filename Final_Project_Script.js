// Task class
class Task {
    id;
    name;
    priority;
    isImportant;
    isCompleted = false;
    date;
    constructor(id, name, priority, isImportant, isCompleted, date) {
        this.id = id;
        this.priority = priority;
        this.name = name;
        this.isImportant = isImportant;
        this.isCompleted = isCompleted;
        this.date = date;
    }
}

// Style for output
document.getElementById("taskmanager").style.border = "thin solid #808080";

//Variables for the task list
let id = -1;
let taskList = [];

// Event Listener for Creating a new task

document.getElementById("add").addEventListener("click", function() {
    // Get current values for input
    let newName = document.getElementById("taskName").value;
    let newPriority = document.getElementById("priority").value;
    let newImportant = document.getElementById("important").checked;
    let currentDate = new Date();
    let newDate = ((currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear());
    let newCompleted = false;

    // Validate the text box input (name is not missing, and characters are alphanumeric)
    let regex = new RegExp("^.*[a-zA-Z]+.*$");
    if (newName.length > 0 && newName.length <= 86 && regex.test(newName) == true) {
        //Increase ID value only if added is added to array
        id++;

        // Add task to the array
        taskList.push(new Task(id, newName, newPriority, newImportant, newCompleted, newDate));

        
        // Make a new task element in the div
        let manager = document.getElementById("taskmanager");
        let output = manager.appendChild(document.createElement("div"));
        output.id = taskList[id].id;

            // Style attributes
        if (taskList[id].isImportant) {
            output.style.display = "flex";
            output.style.whiteSpace = "pre";
            output.style.backgroundColor = "#ff0000";
        } else {
            output.style.display = "flex";
            output.style.whiteSpace = "pre";
        }


        // Output text
        let outputName = output.appendChild(document.createElement("span"));
        outputName.innerHTML = taskList[id].name;
        outputName.className = taskList[id].id + "text";
        outputName.style.flex = "25%";


        let outputPriority = output.appendChild(document.createElement("span"));
        outputPriority.innerHTML = "Priority: " + taskList[id].priority;
        outputPriority.className = taskList[id].id + "text";
        outputPriority.style.flex = "25%";

        let outputDate = output.appendChild(document.createElement("span"));
        outputDate.innerHTML = taskList[id].date;
        outputDate.className = taskList[id].id + "text";
        outputDate.style.flex = "25%";

        
        let outputButtonSpan = output.appendChild(document.createElement("span"));
        

        // Make the done checkbox
        let checkbox = outputButtonSpan.appendChild(document.createElement("input"));
        checkbox.type = "checkbox";
        checkbox.id = id;
        let checkLabel = outputButtonSpan.appendChild(document.createElement("label"));
        checkLabel.htmlFor = id;
        checkLabel.innerHTML = "Done";

        // Make the delete button
        let removeButton = outputButtonSpan.appendChild(document.createElement("button"));
        removeButton.type = "submit";
        removeButton.id = id;
        removeButton.innerHTML = "Delete";
        
        outputButtonSpan.style.flex = "25%";
        outputButtonSpan.style.textAlign = "right";
        

        // Event listener for the checkbox
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                document.getElementsByClassName(taskList[this.id].id + "text")[0].style.textDecoration = "line-through";
                document.getElementsByClassName(taskList[this.id].id + "text")[1].style.textDecoration = "line-through";
                document.getElementsByClassName(taskList[this.id].id + "text")[2].style.textDecoration = "line-through";

                this.parentElement.childNodes[1].innerHTML = "Undo";
                taskList[this.id].isCompleted = true;
            } else {
                document.getElementsByClassName(taskList[this.id].id + "text")[0].style.textDecoration = "";
                document.getElementsByClassName(taskList[this.id].id + "text")[1].style.textDecoration = "";
                document.getElementsByClassName(taskList[this.id].id + "text")[2].style.textDecoration = "";

                this.parentElement.childNodes[1].innerHTML = "Done";
                taskList[this.id].isCompleted = false;
            }
            
            // Output task list after task change
            console.log(JSON.stringify(taskList, null, " "));
        });
        // Event listener for the button
        removeButton.addEventListener("click", function() {
            delete taskList[this.id];
            this.parentElement.parentElement.parentElement.removeChild(document.getElementById(this.id));

            // Sort out null objects
            let sortedTasks = [];
            for (let i = 0; i < taskList.length; i++) {
                if (taskList[i] != null) {
                    sortedTasks.push(taskList[i]);
                };
            };

            // Reset all id values
            for (let i = 0; i < sortedTasks.length; i++) {
                let prevNodes = document.getElementById(sortedTasks[i].id);
                if (prevNodes.id != i) {
                    while (prevNodes != null) {
                        prevNodes.id = i;
                        prevNodes = document.getElementById(sortedTasks[i].id);
                    };
                    sortedTasks[i].id = i;
                    let sortedNode = document.getElementById(sortedTasks[i].id);
                    sortedNode.childNodes[0].className = i + "text";
                    sortedNode.childNodes[1].className = i + "text";
                    sortedNode.childNodes[2].className = i + "text";
                };
            };

            taskList = sortedTasks;
            id = taskList.length - 1;

            // Output task list after task removal and sorting

            console.log(JSON.stringify(taskList, null, " "));
        });

        // Output task list after task creation
        console.log(JSON.stringify(taskList, null, " "));
    // Task name validation error messages
    } else if (newName.length <= 0) {
        alert("Error: Please add a task name.");
    } else if (newName.length > 86) {
        alert("Error: Task name cannot be more than 86 characters.");
    } else {
        alert("Error: Task names should include at least one letter");
    };
});