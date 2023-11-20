export default class TodoList {
    constructor() {
        this.form = document.getElementById('todo__form');
        this.taskInput = document.querySelector('.todo__input-title');
        this.taskInputDescription = document.querySelector('.todo__input-desc')
        this.taskInputDate = document.querySelector('.todo__input-date')
        
        this.todoList = document.querySelector('.todo__list');
        this.storageTodoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
        this.lastId = 0;

        this.form.addEventListener('submit', this.getNewTodo.bind(this));
        this.todoList.addEventListener('click', this.clickOnTask.bind(this));

        this.showTodoList();
    }

    getNewTodo(event) {
        event.preventDefault();
        const taskText = this.taskInput.value;
        const taskDesc = this.taskInputDescription.value
        const taskRedyDate = this.taskInputDate.value
      
        this.addNewTodo(taskText, taskDesc, taskRedyDate);
    }

    todoNode(elem) {
        const remainDate = this.remainTime(+elem.readyDate - Date.now());
        const createDate = new Date(elem.createDate)
        const year = createDate.getFullYear()
        const month = createDate.getMonth();
        const day = createDate.getDate();
        console.log(elem.complited)
        
        return `
            <div id="${elem.id}" class="task__elem ${elem.complited ? 'todo__complite': ''}">
                <div class="task-heder">
                    <div class="task__text">${elem.text}</div>
                    <div class="task__select-buttons">
                        <div class="task__date">
                            <div class="data__create">Дата создания: ${year}-${month}-${day}</div>
                            <div class="date__ready">Времени осталось: ${remainDate}</div>
                        </div>
                        <button class="task__selectButton button-done">+</button>
                        <button class="task__selectButton button-delete">х</button>
                    </div>
                </div>
                <div class="task-desc">${elem.desc}</div>
            </div>
        `
    }


    showTodoList() {
        if (!this.storageTodoList) {
            return;
        }
        let todoList = '';
        this.storageTodoList.forEach(elem => {
            this.lastId = elem.id;
          
            todoList += this.todoNode(elem)
        })
        document.querySelector('.todo__list').insertAdjacentHTML('beforeend', todoList)
    }

    addNewTodo(text, desc, ready) {

        this.lastId++;
        console.log(this.remainTime(new Date(ready).getTime() - Date.now()))
        let newTodo = {
            id: this.lastId,
            text: text,
            desc: desc,
            createDate: Date.now(),
            readyDate: new Date(ready).getTime(),
            complited: false,
        }
        
        let tasks = this.todoNode(newTodo)

        this.updateLocalStorage(newTodo)

        document.querySelector('.todo__list').insertAdjacentHTML('beforeend', tasks)
    }

    updateLocalStorage(newTodo) {
        this.storageTodoList.push(newTodo);
        localStorage.setItem('todoList', JSON.stringify(this.storageTodoList));

    }

    clickOnTask(event) {
        if (event.target.classList.contains('button-delete')) {
            this.deleteTask(event)
        } else if (event.target.classList.contains('button-done')) {
            this.compliteTask(event)
        }

    }

    compliteTask(event) {
        const parentNode = event.target.closest('.task__elem');
        parentNode.classList.toggle('todo__complite')
        this.storageTodoList.forEach((el, i) => {
            if (el.id === +parentNode.id) {
                this.storageTodoList[i].complited = !this.storageTodoList[i].complited;
            }
        })
        localStorage.setItem('todoList', JSON.stringify(this.storageTodoList))
    }

    deleteTask(event) {
        const parentNode = event.target.closest('.task__elem');
        this.storageTodoList.forEach((el, i) => {
            if (el.id === +parentNode.id) {
                this.storageTodoList.splice(i, 1)
            }
        })
        localStorage.setItem('todoList', JSON.stringify(this.storageTodoList))
        parentNode.remove()
    }
    
    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    remainTime(ms) {
        let seconds = Math.floor(ms / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;
    
        return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(
            seconds,
        )}`;
    }

}
