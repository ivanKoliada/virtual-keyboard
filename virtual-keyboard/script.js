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
  let caretStart = keyboard.keyboardInput.selectionStart;
  let caretEnd = keyboard.keyboardInput.selectionEnd;
  const rowLength = 105;

  if (event.ctrlKey && event.altKey) {
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
          if (caretStart === caretEnd) {
            keyboard.keyboardInput.value = `${keyboard.keyboardInput.value.slice(
              0,
              caretStart - 1
            )}${keyboard.keyboardInput.value.slice(caretStart)}`;
            keyboard.keyboardInput.setSelectionRange(
              caretStart - 1,
              caretStart - 1
            );
          } else {
            keyboard.keyboardInput.value = `${keyboard.keyboardInput.value.slice(
              0,
              caretStart
            )}${keyboard.keyboardInput.value.slice(caretEnd)}`;
            keyboard.keyboardInput.setSelectionRange(caretStart, caretStart);
          }
          break;
        case "Tab":
          keyboard.keyboardInput.value += "    ";
          break;
        case "Delete":
          if (caretStart === caretEnd) {
            keyboard.keyboardInput.value = `${keyboard.keyboardInput.value.slice(
              0,
              caretStart
            )}${keyboard.keyboardInput.value.slice(caretStart + 1)}`;
            keyboard.keyboardInput.setSelectionRange(caretStart, caretStart);
          } else {
            keyboard.keyboardInput.value = `${keyboard.keyboardInput.value.slice(
              0,
              caretStart
            )}${keyboard.keyboardInput.value.slice(caretEnd)}`;
            keyboard.keyboardInput.setSelectionRange(caretStart, caretStart);
          }
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
        case "ArrowLeft":
          keyboard.keyboardInput.setSelectionRange(
            caretStart - 1,
            caretStart - 1
          );
          break;
        case "ArrowRight":
          keyboard.keyboardInput.setSelectionRange(
            caretStart + 1,
            caretStart + 1
          );
          break;
        case "ArrowUp":
          if (caretStart <= rowLength) {
            keyboard.keyboardInput.setSelectionRange(caretStart, caretStart);
          } else {
            keyboard.keyboardInput.setSelectionRange(
              caretStart - rowLength,
              caretStart - rowLength
            );
          }
          break;
        case "ArrowDown":
          keyboard.keyboardInput.setSelectionRange(
            caretStart + rowLength,
            caretStart + rowLength
          );
          break;
        default:
          keyboard.keyboardInput.value = `${keyboard.keyboardInput.value.slice(
            0,
            caretStart
          )}${key.textContent}${keyboard.keyboardInput.value.slice(
            caretStart
          )}`;
          keyboard.keyboardInput.setSelectionRange(
            caretStart + 1,
            caretStart + 1
          );
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
