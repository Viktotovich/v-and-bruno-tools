//Initial loader
import './styles.css';


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
        const closeModal = document.querySelector(".close-modal");
        const submitTasks = document.querySelector('#submit-form');

        openModalButton.addEventListener('click', openModal);
        submitTasks.addEventListener("click", createTasks);
        closeModal.addEventListener("click", () => {
            modal.close();
        });
    }

    function openModal(){
        const modal = document.querySelector('dialog');
        modal.showModal();
    }

    function createTasks(e){
        const deadline = document.querySelector('#deadline').value;
        const details = document.querySelector('#details').value;
        const submitTasks = document.querySelector('#submit-form');

        e.preventDefault();
        let taskName = details;
        taskName = new Task(deadline, details, "task-due");

        taskTracker.push(taskName);
        displayTask()
    };

    function displayTask(){

    }

    domManager();
})();