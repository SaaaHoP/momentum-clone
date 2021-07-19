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
  buttonRevise.addEventListener('click', openEdit);
  span.addEventListener('click', todoClicked);
  li.appendChild(span);
  li.appendChild(buttonDelete);
  buttonDelete.appendChild(deleteIcon);
  li.appendChild(buttonRevise);
  buttonRevise.appendChild(reviseIcon);
  todoList.appendChild(li);

  //더보기 팝업창 추가
  const reviseBox = document.createElement('div');
  const reviseButton = document.createElement('button');
  const reviseIcon2 = document.createElement('i');
  const highlightButton = document.createElement('button');
  const highlightIcon = document.createElement('i');

  reviseBox.className = 'arrow-box';
  reviseIcon2.className = 'far fa-edit';
  reviseIcon2.classList.add('reviseIcon2');
  highlightIcon.className = 'fas fa-highlighter';
  highlightIcon.classList.add('highlightIcon');

  li.appendChild(reviseBox);
  reviseBox.appendChild(reviseButton);
  reviseBox.appendChild(highlightButton);
  reviseButton.appendChild(reviseIcon2);
  highlightButton.appendChild(highlightIcon);
  reviseButton.addEventListener('click', reviseTodo);
};

// 더보기창 영역외 눌렀을시 닫아버리기
// document.querySelector('.main-box').addEventListener('click', (e) => {
//   console.log(e.target.parentElement);
//   const arrowBoxes = document.querySelectorAll('.arrow-box');
//   if (e.target !== arrowBoxes ) {
//     arrowBoxes.forEach((item) => {
//       item.classList.remove('arrow-box-reveal');
//     });
//   }
// });

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
const openEdit = (e) => {
  e.currentTarget.parentElement
    .querySelector('.arrow-box')
    .classList.toggle('arrow-box-reveal');
};

//todo 수정하기
const reviseTodo = (e) => {
  const reviseForm = document.createElement('form');
  const reviseInput = document.createElement('input');
  const li = e.currentTarget.parentElement.parentElement;
  const span =
    e.currentTarget.parentElement.parentElement.querySelector('span');
  reviseInput.classList.add('revise-input');
  //hidden전에 span 길이 저장
  reviseInput.style.width = `${span.clientWidth + 4}px`;

  span.classList.add('hidden');
  li.prepend(reviseForm);
  reviseForm.appendChild(reviseInput);
  reviseInput.value = span.innerText;
  reviseInput.focus();

  reviseForm.addEventListener('submit', (e) => {
    console.log(e);
    e.preventDefault();
    todoArr.forEach((item) => {
      if (item.id === parseInt(li.className)) {
        item.text = reviseInput.value;
      }
    });
    span.innerText = reviseInput.value;
    localStorageSet();
    span.classList.remove('hidden');
    reviseInput.classList.add('hidden');

    //입력하고 난 뒤, 열려있던 팝업창 닫아주기
    openEdit(e);
  });
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
