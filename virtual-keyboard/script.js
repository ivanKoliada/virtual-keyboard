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
  keyboard.audio.currentTime = 0;
  if (event.shiftKey && event.repeat) {
    keyboard.audio.pause();
  } else keyboard.audio.play();

  keyboard.keys.forEach((key) => {
    const char = key.getAttribute('data-code');
    if (event.code === char) {
      key.classList.add('keyboard__key--active');
      keyboard.keyboardInput.focus();

      controller(char, key, keyboard);
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
