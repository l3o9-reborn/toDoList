import './style.css';
import ToDoProject from './app/ToDoProject.js';


document.addEventListener('DOMContentLoaded', () => {
const projectContainer = document.getElementById('project-container');
const addProjectBtn = document.getElementById('add-project-btn');
const todoContainer = document.getElementById('todo-container');

class App{
    #projects;
    #activeProject;
    constructor(){
        this.#projects=[];
        this.#activeProject=null;
        window.appInstance = this; // Set global reference
    }
    get projects(){ return this.#projects};
    set projects(projects){ this.#projects=projects};

    setActiveProject(project) {
        this.#activeProject = project;
        this.renderActiveProjectToDos(); // Render to-dos for active project
    }
    renderProjects(){
        projectContainer.innerHTML='';
        this.#projects.forEach((project)=>{
            const projectCard= project.createProjectCard();
            projectCard.addEventListener('click',()=>{
                this.setActiveProject(project);

            // Remove active class from all projects
            document.querySelectorAll('.todoproject').forEach(card => 
                card.classList.remove('active-project'));
            
            // Add active class to clicked project
            projectCard.classList.add('active-project');

            })
            projectContainer.appendChild(projectCard);
        })
    }
    renderActiveProjectToDos(){
        todoContainer.innerHTML='';
        const todoListDiv = document.createElement('div');
        todoListDiv.classList.add('todo-list');
    
            this.#activeProject.todoItems.forEach(todo => {
                todoListDiv.appendChild(todo.createToDoItemCard());
            });

        
        todoContainer.appendChild(todoListDiv);
    }
    showAddToDoPopup() {
        const popup = document.createElement('div');
        popup.classList.add('popup');

        const titleInput = document.createElement('input');
        const descInput = document.createElement('input');
        const saveBtn = document.createElement('button');
        const closeBtn = document.createElement('button');
        const buttonDiv=document.createElement('div');

        buttonDiv.classList.add('buttonDiv');

        titleInput.placeholder = 'Title';
        descInput.placeholder = 'Description';  
        saveBtn.innerText = 'Save';
        closeBtn.innerText = 'Close';
        closeBtn.onclick = () => popup.remove();

        saveBtn.onclick = () => {
            if(titleInput.value.trim() && descInput.value.trim())
                {
                    const newProject= new ToDoProject(titleInput.value, descInput.value);
                    this.#projects.push(newProject);
        
                    
                    // Append the new project card to the DOM
                    this.renderProjects();
                    popup.remove();
                }
                else{
                    alert('Oops! Title or Description Fields are Incomplete');
                }
                
        }
        buttonDiv.append(saveBtn, closeBtn);
        popup.append(titleInput, descInput, buttonDiv);
        document.body.appendChild(popup);
    }

}

const appInstance = new App();

addProjectBtn.addEventListener('click',()=>{
    appInstance.showAddToDoPopup();
});

appInstance.renderProjects();

});

const toggleBtn = document.getElementById("dark-mode-toggle");
const body = document.body;

// Check if user has previously enabled dark mode
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
    toggleBtn.style.backgroundColor='#fff';
    toggleBtn.style.color='#1e1e1e';
}
else{
    toggleBtn.style.backgroundColor='#1e1e1e';
    toggleBtn.style.color='#fff';
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save user preference
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
        toggleBtn.textContent = "☀️ Light Mode";
        toggleBtn.style.backgroundColor='#fff';
        toggleBtn.style.color='#1e1e1e';

    } else {
        localStorage.setItem("dark-mode", "disabled");
        toggleBtn.textContent = "🌙 Dark Mode";
        toggleBtn.style.backgroundColor='#1e1e1e';
        toggleBtn.style.color='#fff';
    }
});