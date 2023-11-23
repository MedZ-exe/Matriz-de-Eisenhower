// Objeto para armazenar tarefas associadas a datas
const tasksByDate = {};

// Carregar tarefas salvas ao iniciar
window.onload = function() {
    loadTasks();
    initializeCalendar();
    showTasks(); // Adicionado para exibir tarefas ao carregar a página
};

// Salvar tarefas no armazenamento local
function saveTasks() {
    console.log('Salvando tarefas:', tasksByDate);
    localStorage.setItem('tasksByDate', JSON.stringify(tasksByDate));
}

// Carregar tarefas do armazenamento local
function loadTasks() {
    const savedTasks = localStorage.getItem('tasksByDate');
    if (savedTasks) {
        Object.assign(tasksByDate, JSON.parse(savedTasks));
    }
}

// Obter tarefas por data
function getTasksByDate(date) {
    return tasksByDate[date] || [];
}

function addTaskByDate(date, task) {
    if (!tasksByDate[date]) {
        tasksByDate[date] = [];
    }
    tasksByDate[date].push(task);

    // Salvar tarefas ao adicionar
    saveTasks();

    // Adicionar instruções de log para depuração
    console.log('Tarefa adicionada com sucesso!');
    console.log('Data:', date);
    console.log('Tarefa:', task);
    console.log('Tarefas por data:', tasksByDate);
}

// Função para inicializar o calendário
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        events: getTasksForCalendar(),
        dateClick: function(info) {
            const date = info.dateStr;
            const taskText = prompt(`Adicionar tarefa para ${date}:`);
            if (taskText) {
                addTaskByDate(date, taskText);
                calendar.refetchEvents();
                showTasks(); // Adicionado para exibir tarefas após adicionar
            }
        }
    });

    calendar.render();
}

// Função para obter tarefas no formato aceito pelo FullCalendar
function getTasksForCalendar() {
    const events = [];
    for (const date in tasksByDate) {
        tasksByDate[date].forEach(task => {
            events.push({ title: task, date });
        });
    }
    return events;
}

// Restante do seu código existente...
// ...

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

    // Adicionado para exibir tarefas ao adicionar
    showTasks();

    // Limpar o campo de entrada
    document.getElementById(inputId).value = '';
}

