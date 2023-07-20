import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  date: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
btnDisabled();
refs.btnStart.addEventListener('click', onTargetStartBtn)

let remainingTime = 0;
let timerId = null;
let boolean = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (boolean) {
          const setTime = selectedDates[0].getTime();
          if (setTime > Date.now()) {
            remainingTime = setTime;
            rmBtnDisabled();
            return Notiflix.Notify.success('A valid date is selected',{position: 'center-top'});
          }

          btnDisabled();
          return Notiflix.Notify.failure('Please choose a date in the future', {
            position: 'center-top',
          });
      }
  },
};

const flatpickr = new Flatpickr(refs.date, options);

function onTargetStartBtn(e) {
    if (boolean) {
        btnDisabled();
        boolean = false;
        timerId = setInterval(() => {
          const { days, hours, minutes, seconds } = convertMs(
            remainingTime - Date.now()
          );
          if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
              clearInterval(timerId);
              boolean = true;
              flatpickr.clear();
          }
          settingTheTime({ days, hours, minutes, seconds });
        }, 1000); 
    }  
};



function settingTheTime({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function btnDisabled() {
    refs.btnStart.setAttribute('disabled', '');
}

function rmBtnDisabled() {
  refs.btnStart.removeAttribute('disabled');
}
