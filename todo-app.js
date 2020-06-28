//Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.filter-todos');

//Event listeners
document.addEventListener('DOMContentLoaded',  getTodos);
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck);
filter.addEventListener('click', filterTodo)
//Funtions

function addTodo(e) {
    //Prevent form from submitting
    e.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to local storage
    savaLocalTodos(todoInput.value);
  
    // Check Button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);
     // Trash Button
     const trashBtn = document.createElement('button');
     trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
     trashBtn.classList.add('trash-btn');
     todoDiv.appendChild(trashBtn);
     //Append to list

     todoList.appendChild(todoDiv);
     //clear todo input value
     todoInput.value = '';
}

//Delete function
function deleteCheck(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation 
        todo.classList.add('fall');
        clearLocalStorage(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
       
    }

    //check mark
    if(item.classList[0] == 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(e.target.value) {
            case "all": 
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
        }
    });   
}

function savaLocalTodos(todo){
    //Check === Hey Do I have already thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
     //Check === Hey Do I have already thing in there?
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function(todo){
         //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Check Button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn);
        // Trash Button
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);
        //Append to list

        todoList.appendChild(todoDiv);
     })
}

function clearLocalStorage(todo){
     //Check === Hey Do I have already thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem('todos', JSON.stringify(todos));
}