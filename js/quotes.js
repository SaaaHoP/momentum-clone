//로컬 인용문을 api quotes로 바꿔서 더 많은 인용문 랜덤으로 가져오기
fetch('https://type.fit/api/quotes')
  .then((res) => res.json())
  .then((data) => {
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const todayQuote = data[Math.floor(Math.random() * data.length)];

    quote.innerText = `"${todayQuote.text}"`;
    author.innerText = `\u00A0- ${todayQuote.author}`;
  });
