const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-form input');
const displayName = document.querySelector('.greeting');
const localStorageUserName = localStorage.getItem('username');

const displayGreetings = (username) => {
  displayName.innerText = `Hello, ${username}`;
  displayName.classList.remove('hidden');
};

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
