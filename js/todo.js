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
  span.classList.add('todo');
  button.innerText = '❌';
  if (todoObject.clicked) {
    span.classList.add('todoClicked');
  } else {
    span.classList.remove('todoClicked');
  }
  button.addEventListener('click', deleteTodo);
  span.addEventListener('click', todoClicked);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
};

//todo 클릭했을때 가운데 줄 그어주기, 그어져 있으면 취소하기
const todoClicked = (e) => {
  const clickedTodo = e.target;
  const selectedLi = e.target.parentElement;
  clickedTodo.classList.toggle('todoClicked');
  todoArr.forEach((item) => {
    if (item.id === parseInt(selectedLi.className)) {
      item.clicked = !item.clicked;
    }
  });
  localStorageSet();
};

//todo 삭제하기
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
    clicked: false,
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
