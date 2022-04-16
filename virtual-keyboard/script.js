import { keyLayoutRu } from "./modules/layoutRu.js";
import { keyLayoutEng } from "./modules/layoutEng.js";
class Keyboard {
  constructor() {
    this.main = null;
    this.keyboardInput = null;
    this.keyboardContainer = null;
    this.keys = [];
    this.capsLock = false;
    this.lang = "ru";
  }

  init() {
    //создаем инпут
    this.keyboardInput = document.createElement("textarea");
    this.keyboardInput.classList.add("keyboard-input");
    this.keyboardInput.placeholder = "Please, type something here...";

    //создаем мейн блок для контейнера
    this.main = document.createElement("div");
    this.main.classList.add("keyboard");

    //создаем контенер для клавиатуры
    this.keyboardContainer = document.createElement("div");
    this.keyboardContainer.classList.add("keyboard__keys");
    //добавляем кнопки в контейнер
    this.keyboardContainer.appendChild(this._createKeys());
    this.keys = this.keyboardContainer.querySelectorAll(".keyboard__key");

    //добавляем в дом элементы
    this.main.appendChild(this.keyboardContainer);
    document.body.appendChild(this.keyboardInput);
    document.body.appendChild(this.main);
  }

  // создаем функцию для создания кнопок
  _createKeys() {
    const fragment = document.createDocumentFragment();

    keyLayoutRu.forEach((key) => {
      const char = key.letter;
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["Backspace", "Delete", "Enter", "Shift "].indexOf(char) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (char) {
        case "Backspace":
          keyElement.classList.add("keyboard__key--xl");
          keyElement.textContent = char;
          keyElement.addEventListener("click", () => {
            this.keyboardInput.value = this.keyboardInput.value.slice(0, -1);
          });

          break;
        case "Tab":
          keyElement.classList.add("keyboard__key--m");
          keyElement.textContent = char;
          break;
        case "Delete":
          keyElement.classList.add("keyboard__key--m");
          keyElement.textContent = char;
          break;
        case "CapsLock":
          keyElement.classList.add("keyboard__key--xl");
          keyElement.textContent = char;
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.capsLock);
          });
          break;
        case "Enter":
          keyElement.classList.add("keyboard__key--xl");
          keyElement.textContent = char;
          keyElement.addEventListener("click", () => {
            this.keyboardInput.value += "\n";
          });
          break;
        case "Shift":
          keyElement.classList.add("keyboard__key--xl");
          keyElement.textContent = char;
          break;
        case "⇑":
          keyElement.classList.add("keyboard__key--xs");
          keyElement.textContent = char;
          break;
        case "Shift ":
          keyElement.classList.add("keyboard__key--xl");
          keyElement.textContent = char;
          break;
        case "Ctrl":
          keyElement.classList.add("keyboard__key--m");
          keyElement.textContent = char;
          break;
        case "Win":
          keyElement.classList.add("keyboard__key--s");
          keyElement.textContent = char;
          break;
        case "Alt":
          keyElement.classList.add("keyboard__key--s");
          keyElement.textContent = char;
          break;
        case "Space":
          keyElement.classList.add("keyboard__key--xxl");
          keyElement.textContent = char;
          keyElement.addEventListener("click", () => {
            this.keyboardInput.value += " ";
          });
          break;
        case "Alt":
          keyElement.classList.add("keyboard__key--xs");
          keyElement.textContent = char;
          break;
        case "Ctrl":
          keyElement.classList.add("keyboard__key--m");
          keyElement.textContent = char;
          break;
        case "⇐":
          keyElement.classList.add("keyboard__key--xs");
          keyElement.textContent = char;
          break;
        case "⇓":
          keyElement.classList.add("keyboard__key--xs");
          keyElement.textContent = char;
          break;
        case "⇒":
          keyElement.classList.add("keyboard__key--xs");
          keyElement.textContent = char;
          break;
        default:
          keyElement.textContent = char.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.keyboardInput.value += this.capsLock
              ? char.toUpperCase()
              : char.toLowerCase();
          });
          break;
      }
      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  }
  _toggleCapsLock() {
    this.capsLock = !this.capsLock;

    for (const key of this.keys) {
      if (key.textContent.length === 1) {
        key.textContent = this.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  }
}

const keyboard = new Keyboard();

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});
