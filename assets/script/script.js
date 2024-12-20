'use strict';
const newTask = document.querySelector('.new-task');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.cancel-button');
const inputTitle = document.querySelector('#title');
const label = document.querySelector('.lable');
const status = document.querySelector('#status');
const priority = document.querySelector('#priority');
const submit = document.querySelector('.submit');
const tableBody = document.querySelector('tbody');
const searchBar = document.querySelector('.search');
const feedBack = document.querySelector('.feedback');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function showTask() {
    modal.classList.remove('hidden');
    modal.classList.add('show');
    overlay.classList.remove('hidden');
    overlay.classList.add('show');
}

function close() {
    modal.classList.remove('show');
    overlay.classList.remove('show');
    setTimeout(function () {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }, 300);
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        close();
    }
});

newTask.addEventListener('click', showTask);
closeModal.addEventListener("click", close);
overlay.addEventListener('click', close);

function renderTasks() {
    tableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        const newRow = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${task.id}</td>
                <td><span class="tag ${task.label}">${task.label}</span> ${task.title}</td>
                <td class="status-${task.status.toLowerCase()}">${task.status}</td>
                <td class="priority-${task.priority.toLowerCase()}">${task.priority}</td>
                <td>${task.date}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('afterbegin', newRow);
    });

    applyFilters();
    addDeleteFunctionality();
}

function addDeleteFunctionality() {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.removeEventListener('click', deleteRow);
        button.addEventListener('click', deleteRow);
    });
}

function deleteRow() {
    const rowIndex = this.dataset.index;
    const row = this.closest('tr');

    row.classList.add('fade-out');
    setTimeout(() => {
        tasks.splice(rowIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }, 300);
    showFeedback('Task deleted successfully!');
}

submit.addEventListener('click', function (event) {
    event.preventDefault();

    const titleValue = inputTitle.value;
    const labelValue = label.value;
    const statusValue = status.value;
    const priorityValue = priority.value;

    if (titleValue === '' || labelValue === '' || statusValue === '' || priorityValue === '') {
        alert('Please fill out all fields.');
        return;
    }

    const task = {
        id: `TASK-${Math.floor(Math.random() * 10000)}`,
        title: titleValue,
        label: labelValue,
        status: statusValue,
        priority: priorityValue,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
    showFeedback('Task added successfully!');
    close();

    inputTitle.value = '';
    label.value = '';
    status.value = '';
    priority.value = '';

});

const taskDateInput = document.querySelector('#taskDate');
taskDateInput.addEventListener('input', function () {
    const selectedDate = new Date(this.value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const taskDate = row.querySelector('td:nth-child(6)').textContent;

        if (taskDate === selectedDate) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
searchBar.addEventListener('input', function () {
    const searchText = searchBar.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const taskTitle = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        if (taskTitle.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
const priorityInput = document.querySelector('.priority');
priorityInput.addEventListener('input', function () {
    const searchInput = priorityInput.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const taskPriority = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
        if (taskPriority.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    })
});


const statusInput = document.querySelector('.status');
statusInput.addEventListener('input', function () {
    const searchInput = statusInput.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const taskStatus = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        if (taskStatus.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    })
})

function showFeedback(message) {
    feedBack.textContent = message;
    feedBack.classList.remove('hidden');
    feedBack.classList.add('animate__animated');
    feedBack.classList.add('animate__fadeInRight');
    feedBack.classList.add('animate__faster');
    setTimeout(function () {
        feedBack.classList.add('hidden');
    }, 2000);
}
document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('tbody');
    const statusBtn = document.querySelector('.status-btn');
    const statusDropdown = document.querySelector('.status-dropdown');
    const priorityBtn = document.querySelector('.priority-btn');
    const priorityDropdown = document.querySelector('.priority-dropdown');

    const statusOptions = document.querySelectorAll('input[name="status"]');
    const priorityOptions = document.querySelectorAll('input[name="priority"]');

    let selectedStatuses = [];
    let selectedPriorities = [];

    statusBtn.addEventListener('click', function (event) {
        if (statusDropdown.classList.contains('hidden')) {
            statusDropdown.classList.remove('hidden');
            statusDropdown.classList.add('animate__fadeInDown');
            statusDropdown.classList.remove('animate__fadeOutUp');
        } else {

            statusDropdown.classList.add('animate__fadeOutUp');
            statusDropdown.classList.remove('animate__fadeInDown');
            setTimeout(() => {
                statusDropdown.classList.add('hidden');
            }, 300);
        }

        priorityDropdown.classList.add('hidden');
        event.stopPropagation();
    });

    priorityBtn.addEventListener('click', function (event) {
        if (priorityDropdown.classList.contains('hidden')) {
            priorityDropdown.classList.remove('hidden');
            priorityDropdown.classList.add('animate__fadeInDown');
            priorityDropdown.classList.remove('animate__fadeOutUp');
        } else {
            priorityDropdown.classList.add('animate__fadeOutUp');
            priorityDropdown.classList.remove('animate__fadeInDown');
            setTimeout(() => {
                priorityDropdown.classList.add('hidden');
            }, 300);
        }

        statusDropdown.classList.add('hidden');
        event.stopPropagation();
    });

    document.addEventListener('click', function () {
        if (!statusDropdown.classList.contains('hidden')) {
            statusDropdown.classList.add('animate__fadeOutUp');
            statusDropdown.classList.remove('animate__fadeInDown');
            setTimeout(() => {
                statusDropdown.classList.add('hidden');
            }, 300);
        }

        if (!priorityDropdown.classList.contains('hidden')) {
            priorityDropdown.classList.add('animate__fadeOutUp');
            priorityDropdown.classList.remove('animate__fadeInDown');
            setTimeout(() => {
                priorityDropdown.classList.add('hidden');
            }, 300);
        }
    });

    statusDropdown.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    priorityDropdown.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    statusOptions.forEach(option => {
        option.addEventListener('change', function () {
            selectedStatuses = [];
            statusOptions.forEach(option => {
                if (option.checked) {
                    selectedStatuses.push(option.value.toLowerCase());
                }
            });
            applyFilters();
            // statusDropdown.classList.add('hidden')
        });
    });

    priorityOptions.forEach(option => {
        option.addEventListener('change', function () {
            selectedPriorities = [];
            priorityOptions.forEach(option => {
                if (option.checked) {
                    selectedPriorities.push(option.value.toLowerCase());
                }
            });
            applyFilters();
        });
    });

    function applyFilters() {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const taskStatus = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            const taskPriority = row.querySelector('td:nth-child(5)').textContent.toLowerCase();

            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(taskStatus);
            const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(taskPriority);

            row.style.display = matchesStatus && matchesPriority ? '' : 'none';
        });
    }

    renderTasks();
});
function applyFilters() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const taskStatus = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        const taskPriority = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
    });
}function positionDropdowns() {
    const statusBtn = document.querySelector('.status-btn');
    const priorityBtn = document.querySelector('.priority-btn');
    const statusDropdown = document.querySelector('.status-dropdown');
    const priorityDropdown = document.querySelector('.priority-dropdown');

    if (window.innerWidth <= 576) {
        // Small mobile styles
        if (statusBtn && statusDropdown) {
            const statusRect = statusBtn.getBoundingClientRect();
            statusDropdown.style.position = 'fixed';
            statusDropdown.style.left = '30%';
            statusDropdown.style.top = `${statusRect.bottom + 10}px`;
        }
        if (priorityBtn && priorityDropdown) {
            const priorityRect = priorityBtn.getBoundingClientRect();
            priorityDropdown.style.position = 'fixed';
            priorityDropdown.style.left = '30%';
            priorityDropdown.style.top = `${priorityRect.bottom + 10}px`;
        }
    } else if (window.innerWidth <= 768) {
        // Tablet styles
        if (statusBtn && statusDropdown) {
            const statusRect = statusBtn.getBoundingClientRect();
            statusDropdown.style.position = 'fixed';
            statusDropdown.style.left = `${statusRect.left}px`;
            statusDropdown.style.top = `${statusRect.bottom + 10}px`; 
        }
        if (priorityBtn && priorityDropdown) {
            const priorityRect = priorityBtn.getBoundingClientRect();
            priorityDropdown.style.position = 'fixed';
            priorityDropdown.style.left = `${priorityRect.left}px`;
            priorityDropdown.style.top = `${priorityRect.bottom + 10}px`;
        }
    } else {
        // Desktop styles
        if (statusDropdown) {
            statusDropdown.style.position = '';
            statusDropdown.style.left = '';
            statusDropdown.style.top = '';
        }
        if (priorityDropdown) {
            priorityDropdown.style.position = '';
            priorityDropdown.style.left = '';
            priorityDropdown.style.top = '';
        }
    }
}

// Debounce the resize event for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedPositionDropdowns = debounce(positionDropdowns, 250);

window.addEventListener('resize', debouncedPositionDropdowns);
window.addEventListener('orientationchange', positionDropdowns);
document.addEventListener('DOMContentLoaded', positionDropdowns);




const delModal = document.querySelector('.del-modal');
const delModalCancel = document.querySelector('.cancel');
const delModalDelete = document.querySelector('.task-del');

function showDeleteModal() {
    delModal.classList.remove('hidden');
    delModal.classList.add('show');
    overlay.classList.remove('hidden');
    overlay.classList.add('show');
}

function hideDeleteModal() {
    delModal.classList.remove('show');
    overlay.classList.remove('show');
    setTimeout(function () {
        delModal.classList.add('hidden');
        overlay.classList.add('hidden');
    }, );
}

let taskToDeleteIndex = null;

function deleteRow() {
    taskToDeleteIndex = this.dataset.index;
    showDeleteModal();
}

delModalCancel.addEventListener('click', hideDeleteModal);
overlay.addEventListener('click', hideDeleteModal);

delModalDelete.addEventListener('click', function() {
    if (taskToDeleteIndex !== null) {
        const row = document.querySelector(`[data-index="${taskToDeleteIndex}"]`).closest('tr');
        row.classList.add('fade-out');
        
        setTimeout(() => {
            tasks.splice(taskToDeleteIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            hideDeleteModal();
            showFeedback('Task deleted successfully!');
        }, 300);
        
        taskToDeleteIndex = null;
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !delModal.classList.contains('hidden')) {
        hideDeleteModal();
    }
});