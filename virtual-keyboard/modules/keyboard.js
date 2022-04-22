import { keyLayoutRu } from "./layoutRu.js";
import { keyLayoutEng } from "./layoutEng.js";

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
    this.createKeyboard();
    this.addEvents();
  }

  createAudio() {
    this.audio = document.createElement("AUDIO");
    this.audio.setAttribute("src", "./assets/audio/click.mp3");
    document.querySelector("body").appendChild(this.audio);
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

    this.main.appendChild(this.keyboardContainer);
    document.body.appendChild(this.keyboardInput);
    document.body.appendChild(this.main);
    this.keys = document.querySelectorAll("button");
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

        switch (char) {
          case "Backspace":
            if (caretStart === caretEnd) {
              this.keyboardInput.value = `${this.keyboardInput.value.slice(
                0,
                caretStart - 1
              )}${this.keyboardInput.value.slice(caretStart)}`;
              this.keyboardInput.setSelectionRange(
                caretStart - 1,
                caretStart - 1
              );
            } else {
              this.keyboardInput.value = `${this.keyboardInput.value.slice(
                0,
                caretStart
              )}${this.keyboardInput.value.slice(caretEnd)}`;
              this.keyboardInput.setSelectionRange(caretStart, caretStart);
            }
            break;
          case "Tab":
            this.keyboardInput.value += "    ";
            break;
          case "Delete":
            if (caretStart === caretEnd) {
              this.keyboardInput.value = `${this.keyboardInput.value.slice(
                0,
                caretStart
              )}${this.keyboardInput.value.slice(caretStart + 1)}`;
              this.keyboardInput.setSelectionRange(caretStart, caretStart);
            } else {
              this.keyboardInput.value = `${this.keyboardInput.value.slice(
                0,
                caretStart
              )}${this.keyboardInput.value.slice(caretEnd)}`;
              this.keyboardInput.setSelectionRange(caretStart, caretStart);
            }
            break;
          case "CapsLock":
            button.classList.toggle("keyboard__key--caps", !this.capsLock);
            this._toggleCapsLock();
            break;
          case "Enter":
            this.keyboardInput.value += "\n";
            break;
          case "ShiftLeft":
            this._toggleShift();
            break;
          case "ShiftRight":
            this._toggleShift();
            break;
          case "ControlLeft":
            break;
          case "ControlRight":
            break;
          case "MetaLeft":
            break;
          case "Space":
            this.keyboardInput.value += " ";
            break;
          case "AltLeft":
            break;
          case "AltRight":
            break;
          case "ArrowLeft":
            this.keyboardInput.setSelectionRange(
              caretStart - 1,
              caretStart - 1
            );
            break;
          case "ArrowRight":
            this.keyboardInput.setSelectionRange(
              caretStart + 1,
              caretStart + 1
            );
            break;
          case "ArrowUp":
            this.keyboardInput.setSelectionRange(
              caretStart - 123,
              caretStart - 123
            );
            break;
          case "ArrowDown":
            this.keyboardInput.setSelectionRange(
              caretStart + 123,
              caretStart + 123
            );
            break;
          default:
            this.keyboardInput.value += button.textContent;
            break;
        }
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
