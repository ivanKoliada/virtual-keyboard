import keyLayoutRu from './layoutRu.js';

import keyLayoutEng from './layoutEng.js';

import controller from './controller.js';

export default class Keyboard {
  constructor() {
    this.capsLock = false;
    this.shift = false;
    this.keys = null;
    this.main = null;
    this.keyboardContainer = null;
    this.keyboardInput = null;
    this.recognizer = null;
    this.microphone = null;
    this.copyText = '';
    this.tempValue = [];
  }

  init() {
    this.createAudio();
    this.createSpeechRecognition();
    this.createTextArea();
    this.createInstruction();
    this.createKeyboard();
    this.addEvents();
  }

  createAudio() {
    this.audio = document.createElement('AUDIO');
    this.audio.setAttribute('src', './assets/audio/click.mp3');
    document.body.append(this.audio);
  }

  createSpeechRecognition() {
    this.recognizer = new webkitSpeechRecognition();
    this.recognizer.interimResults = true;
    this.recognizer.onresult = (e) => {
      const result = e.results[e.resultIndex];
      if (result.isFinal) {
        const recText = result[0].transcript;
        const caretStart = this.keyboardInput.selectionStart;
        this.keyboardInput.value = `${this.keyboardInput.value.slice(
          0,
          this.keyboardInput.selectionStart,
        )}${recText}${this.keyboardInput.value.slice(this.keyboardInput.selectionStart)}`;
        this.keyboardInput.setSelectionRange(
          caretStart + recText.length,
          caretStart + recText.length,
        );
      }
    };
  }

  createTextArea() {
    this.keyboardInput = document.createElement('textarea');
    this.keyboardInput.classList.add('keyboard-input');
    this.keyboardInput.placeholder = 'Please, type something here...';
  }

  createKeyboard() {
    this.main = document.createElement('div');
    this.main.classList.add('keyboard');

    this.keyboardContainer = document.createElement('div');
    this.keyboardContainer.classList.add('keyboard__keys');
    this.keyboardContainer.innerHTML = this.createKeys();

    this.main.append(this.keyboardContainer);
    document.body.insertBefore(this.keyboardInput, this.instruction);
    document.body.insertBefore(this.main, this.instruction);
    this.keys = document.querySelectorAll('button');
  }

  createInstruction() {
    this.instruction = document.createElement('div');
    this.instruction.classList.add('instruction');
    this.instruction.innerHTML = `<pre>
    The keyboard has been created in the Windows.
    Desktop resolution only (>= 1024).
    To change layout press alt + ctrl (via keyboard or mouse).
    </pre>`;
    document.body.append(this.instruction);
  }

  createKeys() {
    let fragment = '';
    const keyLayout = localStorage.getItem('lang') === 'ru' ? keyLayoutRu : keyLayoutEng;

    keyLayout.forEach((key) => {
      const char = this.capsLock && key.letter.length === 1 ? key.letter.toUpperCase() : key.letter;
      const { subletter: subchar, keyCode } = key;
      const insertLineBreak = ['Backspace', 'Delete', 'Enter', 'Shift '].indexOf(char) !== -1;

      if (char === 'mic' || char === 'mic ') {
        fragment += `<button class="keyboard__key" data-code="${keyCode}"><span data-key="${subchar}"><svg id="microphone" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" fill="#fff">
        <g>
          <g>
            <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"/>
            <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"/>
          </g>
        </g>
      </svg></span></button>`;
      } else {
        fragment += `<button class="keyboard__key" data-code="${keyCode}"><span data-key="${subchar}">${char}</span></button>`;
        if (insertLineBreak) {
          fragment += '<br/>';
        }
      }
    });

    return fragment;
  }

  addEvents() {
    this.microphone = document.getElementById('microphone');
    this.keyboardContainer.addEventListener('click', (event) => {
      const button = event.target.closest('.keyboard__key');
      if (button) {
        const char = button.getAttribute('data-code');

        controller(char, button, this, event);
      }
    });
    this.recognizer.addEventListener('audiostart', () => {
      this.microphone.classList.add('active_pulse');
    });

    this.recognizer.addEventListener('end', () => {
      this.microphone.classList.remove('active_pulse');
    });
  }

  toggleLayout() {
    this.main.remove();
    const valueLang = localStorage.getItem('lang') === 'ru' ? 'eng' : 'ru';
    localStorage.setItem('lang', valueLang);
    this.createKeyboard();
    this.addEvents();
  }

  toggleCapsLock() {
    this.capsLock = !this.capsLock;
    this.keys.forEach((el) => {
      const key = el;
      const value = key.textContent;
      if (value.length === 1) {
        if (this.capsLock && this.shift) {
          key.firstChild.innerHTML = value.toLowerCase();
        } else if (!this.capsLock && this.shift) {
          key.firstChild.innerHTML = value.toUpperCase();
        } else key.firstChild.innerHTML = this.capsLock ? value.toUpperCase() : value.toLowerCase();
      }
    });
  }

  toggleShift() {
    this.shift = !this.shift;

    this.keys.forEach((el) => {
      const key = el;
      const inner = key.firstChild;
      const value = key.textContent;
      if (!inner.getAttribute('data-key') && value.length === 1) {
        if (this.capsLock && this.shift) {
          inner.innerHTML = value.toLowerCase();
        } else if (this.capsLock && !this.shift) {
          inner.innerHTML = value.toUpperCase();
        } else inner.innerHTML = this.shift ? value.toUpperCase() : value.toLowerCase();
      }
      if (inner.getAttribute('data-key') && value.length === 1) {
        [inner.textContent, inner.dataset.key] = [inner.dataset.key, inner.textContent];
      }
    });
  }
}
