//로컬 이미지 불러올때
// const images = ['0.jpeg', '1.jpeg', '2.jpeg'];
// const randomImage = images[Math.floor(Math.random() * images.length)];

//random image api 사용
const background = document.createElement('img');
background.classList.add('background');
background.src = 'https://random.imagecdn.app/1920/1080';

document.body.append(background);
