const clock = document.querySelector('.clock');

const clockStart = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  clock.innerText = `${hours}:${minutes}:${seconds}`;
};

clockStart();
setInterval(clockStart, 1000);
