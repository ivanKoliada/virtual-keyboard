import Keyboard from './modules/keyboard.js';
import eventsCase from './modules/eventsCase.js';

let cutOrCopy = '';

const keyboard = new Keyboard();
if (!localStorage.lang) {
  localStorage.setItem('lang', 'ru');
}

function changeLayout(keyController) {
  const keyClass = keyController;
  keyClass.main.remove();
  const valueLang = localStorage.getItem('lang') === 'ru' ? 'eng' : 'ru';
  localStorage.setItem('lang', valueLang);
  keyClass.createKeyboard();
  keyClass.addEvents();
}

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  keyboard.audio.currentTime = 0;
  if (event.shiftKey && event.repeat) {
    keyboard.audio.pause();
  } else keyboard.audio.play();
  const caretStart = keyboard.keyboardInput.selectionStart;
  const caretEnd = keyboard.keyboardInput.selectionEnd;
  const caretPosition = (start, end) => {
    keyboard.keyboardInput.setSelectionRange(start, end);
  };

  if (event.ctrlKey && event.altKey) {
    changeLayout(keyboard);
  }

  if (event.ctrlKey && event.code === 'KeyX') {
    cutOrCopy = keyboard.keyboardInput.value.slice(caretStart, caretEnd);
    keyboard.keyboardInput.value = `${keyboard.keyboardInput.value.slice(
      0,
      caretStart,
    )}${keyboard.keyboardInput.value.slice(caretEnd)}`;
    caretPosition(caretStart, caretStart);
  }

  if (event.ctrlKey && event.code === 'KeyV') {
    keyboard.keyboardInput.value = `${keyboard.keyboardInput.value.slice(
      0,
      caretStart,
    )}${cutOrCopy}${keyboard.keyboardInput.value.slice(caretEnd)}`;
    caretPosition(caretStart + cutOrCopy.length, caretStart + cutOrCopy.length);
  }

  if (event.ctrlKey && event.code === 'KeyC') {
    cutOrCopy = keyboard.keyboardInput.value.slice(caretStart, caretEnd);
    caretPosition(caretStart + cutOrCopy.length, caretStart + cutOrCopy.length);
  }

  keyboard.keys.forEach((key) => {
    const char = key.getAttribute('data-code');
    if (event.code === char) {
      key.classList.add('keyboard__key--active');
      keyboard.keyboardInput.focus();

      eventsCase(char, key, keyboard, caretStart, caretEnd);
    }
  });
});

window.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.code === 'ShiftLeft') {
    keyboard.toggleShift();
  }
  keyboard.keys.forEach((key) => {
    const char = key.getAttribute('data-code');
    if (event.code === char) {
      key.classList.remove('keyboard__key--active');
    }
  });
});

export default keyboard;
