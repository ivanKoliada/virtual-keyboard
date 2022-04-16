import { keyLayoutRu } from "./modules/layoutRu.js";
import { keyLayoutEng } from "./modules/layoutEng.js";

const lang = "ru";
const myStorage = localStorage;
myStorage.setItem("lang", "ru");

class Keyboard {
  constructor() {
    this.main = null;
    this.keyboardInput = null;
    this.keyboardContainer = null;
    this.keys = [];
    this.spanKeys = [];
    this.capsLock = false;
    this.audio = null;
  }

  createTextArea() {
    //создаем инпут
    this.audio = document.createElement("AUDIO");
    this.audio.setAttribute("src", "./click.mp3");
    document.querySelector("body").appendChild(this.audio);
    this.keyboardInput = document.createElement("textarea");
    this.keyboardInput.classList.add("keyboard-input");
    this.keyboardInput.placeholder = "Please, type something here...";
  }

  createKeyboard() {
    //создаем мейн блок для контейнера
    this.main = document.createElement("div");
    this.main.classList.add("keyboard");

    //создаем контенер для клавиатуры
    this.keyboardContainer = document.createElement("div");
    this.keyboardContainer.classList.add("keyboard__keys");
    //добавляем кнопки в контейнер
    this.keyboardContainer.appendChild(this.createKeys());
    this.keys = this.keyboardContainer.querySelectorAll(".keyboard__key");
    this.spanKeys = this.keyboardContainer.querySelectorAll("span");

    //добавляем в дом элементы
    this.main.appendChild(this.keyboardContainer);
    document.body.appendChild(this.keyboardInput);
    document.body.appendChild(this.main);
  }

  // создаем функцию для создания кнопок
  createKeys() {
    const fragment = document.createDocumentFragment();

    const keyLayout =
      myStorage.getItem(lang) === "ru" ? keyLayoutRu : keyLayoutEng;

    keyLayout.forEach((key) => {
      const char = key.letter;
      const subchar = key.subletter;
      const keyCode = key.keyCode;
      const keyElement = document.createElement("button");
      const keySpan = document.createElement("span");
      const insertLineBreak =
        ["Backspace", "Delete", "Enter", "Shift "].indexOf(char) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.appendChild(keySpan);
      keyElement.addEventListener("click", () => {
        this.audio.currentTime = 0;
        this.audio.play();
      });
      keySpan.innerHTML = `<span data-code="${keyCode}" data-key="${subchar}">${char}</span>`;

      switch (char) {
        case "Backspace":
          keyElement.classList.add(
            "keyboard__key--normal",
            "keyboard__key--xl"
          );

          break;
        case "Tab":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "Del":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "CapsLock":
          keyElement.classList.add(
            "keyboard__key--normal",
            "keyboard__key--xl"
          );
          // keyElement.addEventListener("click", () => {
          //   this._toggleCapsLock();
          //   keyElement.classList.toggle("keyboard__key--active", this.capsLock);
          // });
          break;
        case "Enter":
          keyElement.classList.add(
            "keyboard__key--normal",
            "keyboard__key--xl"
          );
          break;
        case "Shift":
          keyElement.classList.add(
            "keyboard__key--normal",
            "keyboard__key--xl"
          );
          break;
        case "⇑":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "Shift ":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "Ctrl":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "Win":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "Alt":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "Space":
          keyElement.classList.add(
            "keyboard__key--normal",
            "keyboard__key--xxl"
          );
          break;
        case "Alt":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "Ctrl":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "⇐":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "⇓":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        case "⇒":
          keyElement.classList.add("keyboard__key--normal", "keyboard__key--m");
          break;
        default:
          keyElement.addEventListener("click", () => {
            for (const key of this.keys) {
              key.classList.remove("keyboard__key--active");
            }
            keyElement.classList.add("keyboard__key--active");
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
}

const keyboard = new Keyboard();

window.addEventListener("DOMContentLoaded", () => {
  keyboard.createTextArea();
  keyboard.createKeyboard();
});

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  keyboard.audio.currentTime = 0;
  keyboard.audio.play();

  if (event.altKey && event.shiftKey) {
    keyboard.main.remove();
    const curLang = myStorage.getItem(lang) === "ru" ? "eng" : "ru";
    myStorage.setItem(lang, curLang);
    keyboard.createKeyboard();
  }
});

// const toggleCapsLock = () => {
//   keyboard.capsLock = !keyboard.capsLock;

//   for (const key of keyboard.spanKeys) {
//     if (key.textContent.length === 1) {
//       key.textContent = keyboard.capsLock
//         ? key.textContent.toUpperCase()
//         : key.textContent.toLowerCase();
//     }
//   }
// };
