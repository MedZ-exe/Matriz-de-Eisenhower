function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var quadrant = event.target;

    // Ensure that the drop target is a quadrant
    if (quadrant.classList.contains("quadrant")) {
        quadrant.appendChild(draggedElement);
    }
}

function addTask(tasksId, inputId) {
    var taskText = document.getElementById(inputId).value;
    if (taskText.trim() === '') {
        alert('Por favor, insira uma descrição para a tarefa.');
        return;
    }

    var tasksContainer = document.getElementById(tasksId);

    var newTask = document.createElement('li');
    newTask.textContent = taskText;
    newTask.draggable = true;
    newTask.addEventListener('dragstart', function(event) {
        drag(event);
    });

    tasksContainer.appendChild(newTask);

    // Limpar o campo de entrada
    document.getElementById(inputId).value = '';
}

