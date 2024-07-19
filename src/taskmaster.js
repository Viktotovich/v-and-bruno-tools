//Task Manager - ONLY TASKS
export default taskManager;

const taskManager = (function(){
    taskTracker = [];

    class Task{
        constructor(deadline, details, status){
            this.deadline = deadline;
            this.details = details;
            this.status = status;
        }
    }

    function domManager(){
        const openModalButton = document.querySelector('#open-modal');
        openModalButton.addEventListener('click', openModal);
    }


    function openModal(){
        modal = document.querySelector('dialog');
        modal.open();
    }

    domManager();
})();