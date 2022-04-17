import { keyLayoutRu } from "./modules/layoutRu.js";
import { keyLayoutEng } from "./modules/layoutEng.js";

const lang = "ru";
const myStorage = localStorage;
myStorage.setItem("lang", "ru");

class Keyboard {
  constructor() {
    this.capsLock = false;
  }
  init() {
    this.createTextArea();
    this.createKeyboard();
  }

  createTextArea() {
    this.audio = document.createElement("AUDIO");
    this.audio.setAttribute("src", "./click.mp3");
    document.querySelector("body").appendChild(this.audio);
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
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    fragment.innerHTML = "";
    const keyLayout =
      myStorage.getItem(lang) === "ru" ? keyLayoutRu : keyLayoutEng;

    keyLayout.forEach((key) => {
      const char = key.letter;
      const subchar = key.subletter;
      const keyCode = key.keyCode;
      const insertLineBreak =
        ["Backspace", "Delete", "Enter", "Shift "].indexOf(char) !== -1;

      fragment.innerHTML += `<button class="keyboard__key" data-code="${keyCode}"><span data-key="${subchar}">${char}</span></button>`;
      if (insertLineBreak) {
        fragment.innerHTML += "<br/>";
      }
    });

    return fragment.innerHTML;
  }
}

const keyboard = new Keyboard();

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init();
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

// keyElement.addEventListener("click", () => {
//   this.audio.currentTime = 0;
//   this.audio.play();
// });

// switch (char) {
//   case "Backspace":

//     break;
//   case "Tab":
//     break;
//   case "Del":
//     break;
//   case "CapsLock":
//     // keyElement.addEventListener("click", () => {
//     //   this._toggleCapsLock();
//     //   keyElement.classList.toggle("keyboard__key--active", this.capsLock);
//     // });
//     break;
//   case "Enter":
//     break;
//   case "Shift":
//     break;
//   case "⇑":
//     break;
//   case "Shift ":
//     break;
//   case "Ctrl":
//     break;
//   case "Win":
//     break;
//   case "Alt":
//     break;
//   case "Space":
//     break;
//   case "Alt":
//     break;
//   case "Ctrl":
//     break;
//   case "⇐":
//     break;
//   case "⇓":
//     break;
//   case "⇒":
//     break;
//   default:
//     keyElement.addEventListener("click", () => {
//       for (const key of this.keys) {
//         key.classList.remove("keyboard__key--active");
//       }
//       keyElement.classList.add("keyboard__key--active");
//       this.keyboardInput.value += this.capsLock
//         ? char.toUpperCase()
//         : char.toLowerCase();
//     });
//     break;
// }
