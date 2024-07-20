//Task Manager - ONLY TASKS
const taskManager = (function(){
    const taskTracker = [];

    class Task{
        constructor(deadline, details, status){
            this.deadline = deadline;
            this.details = details;
            this.status = status;
        }

        taskStatus(newStatus){
            this.status = newStatus;
        }
    }

    function domManager(){
        const openModalButton = document.querySelector('#open-modal');
        const submitTasks = document.querySelector('#submit-form');

        openModalButton.addEventListener('click', openModal);
        submitTasks.addEventListener("click", createTasks);
    }

    function openModal(){
        const modal = document.querySelector('dialog');
        const closeModal = document.querySelector(".close-modal");

        modal.showModal();

        closeModal.addEventListener("click", () => {
            modal.close();
        });
    }

    function createTasks(e){
        const deadline = document.querySelector('#deadline').value;
        const details = document.querySelector('#details').value;
        const modal = document.querySelector('dialog');

        let taskName = details;
        taskName = new Task(deadline, details, "task-due");

        taskTracker.push(taskName);

        modal.close();
        e.preventDefault();
        renderTask(taskName);
    };

    function renderTask(task){
        let taskContainer = document.querySelector('#task-container');

        let taskGroup = document.createElement('tr');
        let taskDate = document.createElement('td');
        let taskDetails = document.createElement('td');
        let taskCompletionStatus = document.createElement('td');
        let removeTask = document.createElement('td');

        taskDate.textContent = task.deadline;
        taskDetails.textContent = task.details;
        taskCompletionStatus.textContent = task.status;
        removeTask.textContent = 'Delete';

        removeTask.setAttribute("class", "remove");
        taskCompletionStatus.setAttribute("class", "task-due")

        taskContainer.appendChild(taskGroup);
        taskGroup.appendChild(taskDate);
        taskGroup.appendChild(taskDetails);
        taskGroup.appendChild(taskCompletionStatus);
        taskGroup.appendChild(removeTask);

        taskCompletionStatus.addEventListener("click", () => {
            if (taskCompletionStatus.textContent === "task-due"){
                taskCompletionStatus.textContent = 'complete';
                taskCompletionStatus.setAttribute('class', 'complete');
                task.taskStatus('complete');
            } else if (taskCompletionStatus.textContent === 'complete') {
                taskCompletionStatus.textContent = 'ignore';
                taskCompletionStatus.setAttribute('class', 'ignore');
                task.taskStatus('ignore');
            } else {
                taskCompletionStatus.textContent = 'task-due';
                taskCompletionStatus.setAttribute('class', 'task-due');
                task.taskStatus('task-due');
            }
        });

        removeTask.addEventListener("click", () => {
            taskGroup.remove();
        });
    }

    domManager();
})();

export default taskManager;