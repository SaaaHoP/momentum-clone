const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
let todoArr = [];

const addTodo = (todoObject) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const buttonDelete = document.createElement('button');
  const buttonRevise = document.createElement('button');
  const deleteIcon = document.createElement('i');
  const reviseIcon = document.createElement('i');

  li.className = todoObject.id;
  span.innerText = todoObject.text;
  span.classList.add('todo');
  deleteIcon.className = 'far fa-trash-alt';
  buttonDelete.classList.add('delete-button');
  reviseIcon.className = 'fas fa-ellipsis-h';
  buttonRevise.classList.add('revise-button');

  if (todoObject.clicked) {
    span.classList.add('todoClicked');
  } else {
    span.classList.remove('todoClicked');
  }
  buttonDelete.addEventListener('click', deleteTodo);
  buttonRevise.addEventListener('click', editTodo);
  span.addEventListener('click', todoClicked);
  li.appendChild(span);
  li.appendChild(buttonDelete);
  buttonDelete.appendChild(deleteIcon);
  li.appendChild(buttonRevise);
  buttonRevise.appendChild(reviseIcon);
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
  const selectedLi = e.currentTarget.parentElement;
  selectedLi.remove();
  todoArr = todoArr.filter((todoObject) => {
    //Date.now()는 정수, class와 id는 문자열이여서 parseInt 혹은 toString 써줘야한다.
    return todoObject.id !== parseInt(selectedLi.className);
  });
  localStorageSet();
};

//todo 수정창 열기
const editTodo = (e) => {
  const reviseBox = document.createElement('div');
  const reviseButton = document.createElement('button');
  const reviseIcon = document.createElement('i');
  const highlightButton = document.createElement('button');
  const highlightIcon = document.createElement('i');
  reviseBox.className = 'arrow-box';
  reviseIcon.className = 'far fa-edit';
  reviseIcon.classList.add('reviseIcon');
  highlightIcon.className = 'fas fa-highlighter';
  highlightIcon.classList.add('highlightIcon');
  document.body.appendChild(reviseBox);
  // e.currentTarget.parentElement.appendChild(reviseBox);

  reviseBox.appendChild(reviseButton);
  reviseBox.appendChild(highlightButton);
  reviseButton.appendChild(reviseIcon);
  highlightButton.appendChild(highlightIcon);
  reviseButton.addEventListener('click', reviseTodo);

  reviseBox.style.left = e.currentTarget.offsetLeft + 20 + 'px';
  reviseBox.style.top = e.currentTarget.offsetTop - 10 + 'px';
  reviseBox.classList.add('arrow-box-reveal');
};

//todo 수정하기
const reviseTodo = (e) => {};

//화면 밖 클릭시 수정화면 끄기
document.body.addEventListener('click', (e) => {
  const reviseBox = document.querySelectorAll('.arrow-box');
  console.log(e.target.parentElement);
  if (
    e.target == e.currentTarget.querySelector('.arrow-box') ||
    e.target == e.currentTarget.querySelector('.reviseIcon') ||
    e.target == e.currentTarget.querySelector('.highlightIcon')
  ) {
    e.currentTarget.querySelector('.arrow-box').style.opacity = '1';
    console.log('안쪽클릭1');
    return;
  }

  if (
    e.target.parentElement == e.currentTarget.querySelector('.revise-button')
  ) {
    e.currentTarget.querySelector('.arrow-box').style.opacity = '1';
    console.log('안쪽클릭2');
    return;
  }

  reviseBox.forEach((item) => {
    item.style.opacity = '0';
  });
});

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
