const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-form input');
const displayName = document.querySelector('.greeting');
const localStorageUserName = localStorage.getItem('username');
const hideTodoForm = document.querySelector('.todo-form');

const displayGreetings = (username) => {
  const date = new Date();
  if (date.getHours() >= 6 && date.getHours() < 12) {
    displayName.innerText = `Good Morning, ${username}.`;
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    displayName.innerText = `Good Afternoon, ${username}.`;
  } else {
    displayName.innerText = `Good Evening, ${username}.`;
  }
  displayName.classList.remove('hidden');
  hideTodoForm.classList.remove('hidden');
};

document.body.classList.add('reveal');

if (localStorageUserName === null) {
  loginForm.classList.remove('hidden');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginInput.value;
    loginForm.classList.add('hidden');
    localStorage.setItem('username', username);
    displayGreetings(username);
  });
} else {
  displayGreetings(localStorageUserName);
}
