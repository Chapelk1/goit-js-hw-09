function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  body: document.body,
  btnStart: document.querySelector('[data-start-01]'),
  btnStop: document.querySelector('[data-stop-01]'),
};

let timerId = null;

refs.btnStart.addEventListener('click', onTargetStartBtn);
refs.btnStop.addEventListener('click', onTargetStopBtn);

function onTargetStartBtn() {
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
  }, 1000);
  refs.btnStart.setAttribute('disabled', '');
  refs.btnStop.removeAttribute('disabled');
}

function onTargetStopBtn() {
  clearInterval(timerId);
  refs.btnStop.setAttribute('disabled', '');
  refs.btnStart.removeAttribute('disabled');
}