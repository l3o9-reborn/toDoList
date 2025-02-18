export default class ToDoItems {
    #title;
    #description;
    #dueDate;
    #priority;
    #isComplete;

    constructor(title, description, dueDate=new Date(), priority, isComplete = false) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = new Date(dueDate).toISOString().replace('T', ' ').substring(0, 19);
        this.#priority = priority;
        this.#isComplete = isComplete;
    }

    get title() { return this.#title; }
    set title(value) { this.#title = value; }

    get description() { return this.#description; }
    set description(value) { this.#description = value; }

    get dueDate() { return this.#dueDate; }
    set dueDate(value) { this.#dueDate = value; }

    get priority() { return this.#priority; }
    set priority(value) { this.#priority = value; }

    get isComplete() { return this.#isComplete; }
    set isComplete(value) { this.#isComplete = value; }

    createToDoItemCard() {
        const div = document.createElement('div');
        div.classList.add('todoitem');

        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const dueDateSpan = document.createElement('span');
        const prioritySpan = document.createElement('span');
        const checkBox = document.createElement('input');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        h3.innerText = this.#title;
        p.innerText = this.#description;
        dueDateSpan.innerText = `Due Date: ${this.#dueDate}`;
        prioritySpan.innerText = `Priority: ${this.#priority}`;

        checkBox.type = 'checkbox';
        checkBox.checked = this.#isComplete;
        checkBox.onchange = () => this.isComplete = checkBox.checked;

        deleteBtn.classList.add('delete');
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = () => this.deleteTodoItemCard(div);

        editBtn.classList.add('edit');
        editBtn.innerText = 'Edit';
        editBtn.onclick = () => this.editTodoItem(h3, p, dueDateSpan, prioritySpan, editBtn);

        div.append(checkBox, h3, p, dueDateSpan, prioritySpan, editBtn, deleteBtn);
        return div;
    }

    editTodoItem(titleElement, descElement, dueDateElement, priorityElement, editBtn) {
        const titleInput = document.createElement('input');
        const descInput = document.createElement('input');
        const dueDateInput = document.createElement('input');
        const priorityInput = document.createElement('select');
        const saveBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');

        titleInput.value = this.title;
        descInput.value = this.description;
        dueDateInput.type = 'datetime-local';
        dueDateInput.value = this.dueDate;

        priorityInput.innerHTML = `
            <option value="Low" ${this.priority === 'Low' ? 'selected' : ''}>Low</option>
            <option value="Medium" ${this.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${this.priority === 'High' ? 'selected' : ''}>High</option>
        `;

        saveBtn.innerText = 'Save';
        cancelBtn.innerText = 'Cancel';

        titleElement.replaceWith(titleInput);
        descElement.replaceWith(descInput);
        dueDateElement.replaceWith(dueDateInput);
        priorityElement.replaceWith(priorityInput);
        editBtn.replaceWith(saveBtn);
        saveBtn.after(cancelBtn);

        saveBtn.onclick = () => {
            this.title = titleInput.value;
            this.description = descInput.value;
            this.dueDate = dueDateInput.value;
            this.priority = priorityInput.value;

            titleInput.replaceWith(titleElement);
            descInput.replaceWith(descElement);
            dueDateInput.replaceWith(dueDateElement);
            priorityInput.replaceWith(priorityElement);

            titleElement.innerText = this.title;
            descElement.innerText = this.description;
            dueDateElement.innerText = `Due Date: ${this.dueDate}`;
            priorityElement.innerText = `Priority: ${this.priority}`;

            saveBtn.replaceWith(editBtn);
            cancelBtn.remove();
        };

        cancelBtn.onclick = () => {
            titleInput.replaceWith(titleElement);
            descInput.replaceWith(descElement);
            dueDateInput.replaceWith(dueDateElement);
            priorityInput.replaceWith(priorityElement);
            saveBtn.replaceWith(editBtn);
            cancelBtn.remove();
        };
    }

    deleteTodoItemCard(todoItem) {
        todoItem?.remove();
    }
}
