const inputBox = document.querySelector('#inputBox');
const addBtn = document.querySelector('#addBtn');
const todoList = document.querySelector('#todoList');

let edittodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert('Please enter a todo');
        return;
    }

    if (addBtn.value === 'Update') {
        edittodo.target.parentElement.querySelector('p').innerHTML = inputText;
        addBtn.value = 'Add';
        inputBox.value = '';
        return;
    }

    const li = document.createElement('li');
    const p = document.createElement('p');
    p.innerHTML = inputText;
    li.appendChild(p);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.classList.add('delete');
    li.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.classList.add('edit');
    li.appendChild(editBtn);

    todoList.appendChild(li);
    inputBox.value = '';

    saveLocalTodos(inputText);
}

const updatetodo = (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        removeLocalTodos(e.target.parentElement);
    }
    if (e.target.classList.contains('edit')) {
        inputBox.value = e.target.parentElement.querySelector('p').innerHTML;
        inputBox.focus();
        addBtn.value = 'Update';
        edittodo = e;
    }
}

const saveLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const removeLocalTodos = (todoElement) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoText = todoElement.querySelector('p').innerHTML;
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updatetodo);