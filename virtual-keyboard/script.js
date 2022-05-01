import Keyboard from './modules/keyboard.js';
import controller from './modules/controller.js';

const keyboard = new Keyboard();
if (!localStorage.lang) {
  localStorage.setItem('lang', 'ru');
}

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});

window.addEventListener('keydown', (event) => {
  event.preventDefault();

  keyboard.keys.forEach((key) => {
    const char = key.getAttribute('data-code');
    if (event.code === char) {
      key.classList.add('keyboard__key--active');
      controller(char, key, keyboard);
    }
  });
});

window.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
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
