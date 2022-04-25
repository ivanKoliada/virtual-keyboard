import { keyLayoutRu } from "./layoutRu.js";
import { keyLayoutEng } from "./layoutEng.js";
import { eventsCase } from "./eventsCase.js";
export class Keyboard {
  constructor() {
    this.capsLock = false;
    this.shift = false;
    this.keys = null;
    this.keyboardContainer = null;
    this.keyboardInput = null;
  }
  init() {
    this.createAudio();
    this.createTextArea();
    this.createInstruction();
    this.createKeyboard();
    this.addEvents();
  }

  createAudio() {
    this.audio = document.createElement("AUDIO");
    this.audio.setAttribute("src", "./assets/audio/click.mp3");
    document.body.append(this.audio);
  }

  createTextArea() {
    this.keyboardInput = document.createElement("textarea");
    this.keyboardInput.classList.add("keyboard-input");
    this.keyboardInput.placeholder = "Please, type something here...";
  }

  createKeyboard() {
    this.main = document.createElement("div");
    this.main.classList.add("keyboard");

    this.keyboardContainer = document.createElement("div");
    this.keyboardContainer.classList.add("keyboard__keys");
    this.keyboardContainer.innerHTML = this.createKeys();

    this.main.append(this.keyboardContainer);
    document.body.insertBefore(this.keyboardInput, this.instruction);
    document.body.insertBefore(this.main, this.instruction);
    this.keys = document.querySelectorAll("button");
  }

  createInstruction() {
    this.instruction = document.createElement("div");
    this.instruction.classList.add("instruction");
    this.instruction.innerHTML = `<pre>
    The keyboard was created in the Windows.
    Desktop resolution only (>= 1024).
    To change layout press left alt + ctrl.
    </pre>`;
    document.body.append(this.instruction);
  }

  createKeys() {
    let fragment = "";
    const keyLayout =
      localStorage.getItem("lang") === "ru" ? keyLayoutRu : keyLayoutEng;

    keyLayout.forEach((key) => {
      const char =
        this.capsLock && key.letter.length === 1
          ? key.letter.toUpperCase()
          : key.letter;
      const subchar = key.subletter;
      const keyCode = key.keyCode;
      const insertLineBreak =
        ["Backspace", "Delete", "Enter", "Shift "].indexOf(char) !== -1;

      fragment += `<button class="keyboard__key" data-code="${keyCode}"><span data-key="${subchar}">${char}</span></button>`;
      if (insertLineBreak) {
        fragment += "<br/>";
      }
    });

    return fragment;
  }

  addEvents() {
    this.keyboardContainer.addEventListener("click", ({ target }) => {
      const button = target.closest(".keyboard__key");
      if (button) {
        const char = button.getAttribute("data-code");
        this.audio.currentTime = 0;
        this.audio.play();
        this.keyboardInput.focus();
        let caretStart = this.keyboardInput.selectionStart;
        let caretEnd = this.keyboardInput.selectionEnd;

        eventsCase(char, button, this, caretStart, caretEnd, );
      }
    });
  }

  _toggleCapsLock() {
    this.capsLock = !this.capsLock;

    for (const key of this.keys) {
      const value = key.textContent;
      if (value.length === 1) {
        this.capsLock
          ? (key.firstChild.innerHTML = value.toUpperCase())
          : (key.firstChild.innerHTML = value.toLowerCase());
      }
    }
  }

  _toggleShift() {
    this.shift = !this.shift;

    for (const key of this.keys) {
      const inner = key.firstChild;
      const value = key.textContent;
      if (!inner.getAttribute("data-key") && value.length === 1) {
        this.shift
          ? (inner.innerHTML = value.toUpperCase())
          : (inner.innerHTML = value.toLowerCase());
      }
      if (inner.getAttribute("data-key") && value.length === 1) {
        [inner.textContent, inner.dataset.key] = [
          inner.dataset.key,
          inner.textContent,
        ];
      }
    }
  }
}
