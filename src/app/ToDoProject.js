import ToDoItem from './ToDoItems.js';

export default class ToDoProject {
    #name;
    #description;
    #todoItems;

    constructor(name, description) {
        this.#name = name;
        this.#description = description;
        this.#todoItems = [];
    }
    get name() { return this.#name; }
    set name(name){this.#name=name;}
    get description() { return this.#description; }
    set description(description) { this.#description=description;}
    get todoItems() { return this.#todoItems; }
    set todoItems(todoItems) { this.#todoItems=todoItems; }

    createProjectCard() {
        const div = document.createElement('div');
        div.classList.add('todoproject');

        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const addBtn = document.createElement('button');
        const deleteBtn=document.createElement('button');
        const todoListDiv = document.createElement('div');
        const buttonDiv=document.createElement('div');

        h2.innerText = this.#name;
        p.innerText = this.#description;
        addBtn.innerText = 'Add';
        addBtn.classList.add('add-todo');
        todoListDiv.classList.add('todo-list');
        deleteBtn.classList.add('delete');
        deleteBtn.innerText='Delete';
        buttonDiv.classList.add('buttonDiv');
        buttonDiv.append(addBtn, deleteBtn);



        addBtn.onclick = () => this.showAddToDoPopup(todoListDiv);
        deleteBtn.onclick=()=>this.deleteTodoProjectCard(div);
        

        div.append(h2, p, buttonDiv);
        return div;
    }

    showAddToDoPopup(todoListDiv) {
        const popup = document.createElement('div');
        popup.classList.add('popup');

        const titleInput = document.createElement('input');
        const descInput = document.createElement('input');
        const dueDateInput = document.createElement('input');
        const prioritySelect = document.createElement('select');
        const saveBtn = document.createElement('button');
        const closeBtn = document.createElement('button');
        const buttonDiv =document.createElement('div');

        titleInput.placeholder = 'Title';
        descInput.placeholder = 'Description';
        dueDateInput.type = 'datetime-local';
        
        prioritySelect.innerHTML = `
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        `;

        saveBtn.innerText = 'Save';
        closeBtn.innerText = 'Close';
        closeBtn.onclick = () => popup.remove();

        saveBtn.onclick = () => {
        if(titleInput.value.trim()&& descInput.value.trim()){
            const newToDo = new ToDoItem(
                titleInput.value,
                descInput.value,
                dueDateInput.value || undefined,
                prioritySelect.value
            );
            this.#todoItems.push(newToDo);
            todoListDiv.appendChild(newToDo.createToDoItemCard());
                // Call renderActiveProjectToDos() to refresh UI
            const appInstance = window.appInstance; // Access the global instance
            if (appInstance) {
                appInstance.renderActiveProjectToDos();
            }
            popup.remove();
        
        }   
        else{
            alert('Oops! Title or Description Fields are Incomplete');
        }
    };
    
    buttonDiv.classList.add('buttonDiv');
    buttonDiv.append(saveBtn, closeBtn);

    popup.append(titleInput, descInput, dueDateInput, prioritySelect, buttonDiv);
    document.body.appendChild(popup);
      
    }
    deleteTodoProjectCard(todoproject) {
        todoproject?.remove();
        const appInstance = window.appInstance;
        if (appInstance) {
            appInstance.projects = appInstance.projects.filter(proj => proj !== this);
            appInstance.renderProjects(); // Refresh project list
        }
    }
}
