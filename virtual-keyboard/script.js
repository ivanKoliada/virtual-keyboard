import { Keyboard } from "./modules/keyboard.js";

const keyboard = new Keyboard();
if (!localStorage["lang"]) {
  localStorage.setItem("lang", "ru");
}

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init();
});

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  keyboard.audio.currentTime = 0;
  keyboard.audio.play();

  if (event.altKey && event.shiftKey) {
    keyboard.main.remove();
    const valueLang = localStorage.getItem("lang") === "ru" ? "eng" : "ru";
    localStorage.setItem("lang", valueLang);
    keyboard.createKeyboard();
    keyboard.addEvents();
  }

  keyboard.keys.forEach((key) => {
    const char = key.getAttribute("data-code");
    if (event.code === char) {
      key.classList.add("keyboard__key--active");
      keyboard.keyboardInput.focus();
      switch (char) {
        case "Backspace":
          keyboard.keyboardInput.value = keyboard.keyboardInput.value.slice(
            0,
            -1
          );
          break;
        case "Tab":
          keyboard.keyboardInput.value += "    ";
          break;
        case "Delete":
          break;
        case "CapsLock":
          key.classList.toggle("keyboard__key--caps", !keyboard.capsLock);
          keyboard._toggleCapsLock();
          break;
        case "Enter":
          keyboard.keyboardInput.value += "\n";
          break;
        case "ShiftLeft":
          keyboard._toggleShift();
          break;
        case "ShiftRight":
          keyboard._toggleShift();
          break;
        case "ControlLeft":
          break;
        case "ControlRight":
          break;
        case "MetaLeft":
          break;
        case "Space":
          keyboard.keyboardInput.value += " ";
          break;
        case "AltLeft":
          break;
        case "AltRight":
          break;
        default:
          keyboard.keyboardInput.value += key.textContent;
          break;
      }
    }
  });
});

window.addEventListener("keyup", (event) => {
  event.preventDefault();

  keyboard.keys.forEach((key) => {
    const char = key.getAttribute("data-code");
    if (event.code === char) {
      key.classList.remove("keyboard__key--active");
    }
  });
});
