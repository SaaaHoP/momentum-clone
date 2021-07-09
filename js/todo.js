const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
let todoArr = [];

const addTodo = (todoObject) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');

  li.className = todoObject.id;
  span.innerText = todoObject.text;
  button.innerText = 'delete';
  button.addEventListener('click', deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
};

const deleteTodo = (e) => {
  const selectedLi = e.target.parentElement;
  selectedLi.remove();
  todoArr = todoArr.filter((todoObject) => {
    //Date.now()는 정수, class와 id는 문자열이여서 parseInt 혹은 toString 써줘야한다.
    return todoObject.id !== parseInt(selectedLi.className);
  });
  localStorageSet();
};

const localStorageSet = () => {
  localStorage.setItem('todoArr', JSON.stringify(todoArr));
};

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoItem = todoInput.value;
  const todoObject = {
    text: todoItem,
    id: Date.now(),
  };
  todoInput.value = '';
  todoArr.push(todoObject);
  addTodo(todoObject);
  localStorageSet();
});

const savedTodoArr = JSON.parse(localStorage.getItem('todoArr'));

if (savedTodoArr !== null) {
  todoArr = savedTodoArr;
  todoArr.forEach((item) => {
    addTodo(item);
  });
}
