import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  firstDelay: 0,
  newTime: 0,
  stepDelay: 0,
  amountF: 0,
};


refs.formEl.addEventListener('input', onСhangeValue);
refs.formEl.addEventListener('submit', onSubmitForm);


function onСhangeValue(e) {
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  refs.firstDelay = Number(delay.value);
  refs.newTime = Number(delay.value);
  refs.stepDelay = Number(step.value);
  refs.amountF = Number(amount.value);
}

function onSubmitForm(e) {
  e.preventDefault();
  for (let i = 1; i <= refs.amountF; i += 1) {
    createPromise(i, refs.firstDelay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        }, delay);
      });
    refs.firstDelay += refs.stepDelay;
  }
  refs.firstDelay = refs.newTime;
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        return Promise.resolve({ position, delay });
      } else {
        return Promise.reject({ position, delay });
      }
}






