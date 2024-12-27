async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <span>${task.description}</span>
            </div>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksDiv.appendChild(taskDiv);
    });
}

async function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

document.addEventListener('DOMContentLoaded', fetchTasks);