export function eventsCase(char, key, keyClass, caretStart, caretEnd) {
  const rowLength = 105;
  const caretPosition = (start, end) => {
    keyClass.keyboardInput.setSelectionRange(start, end);
  };
  switch (char) {
    case "Backspace":
      if (caretStart === caretEnd) {
        keyClass.keyboardInput.value = `${keyClass.keyboardInput.value.slice(
          0,
          caretStart - 1
        )}${keyClass.keyboardInput.value.slice(caretStart)}`;
        caretPosition(caretStart - 1, caretStart - 1);
      } else {
        keyClass.keyboardInput.value = `${keyClass.keyboardInput.value.slice(
          0,
          caretStart
        )}${keyClass.keyboardInput.value.slice(caretEnd)}`;
        caretPosition(caretStart, caretStart);
      }
      break;
    case "Tab":
      keyClass.keyboardInput.value += "    ";
      break;
    case "Delete":
      if (caretStart === caretEnd) {
        keyClass.keyboardInput.value = `${keyClass.keyboardInput.value.slice(
          0,
          caretStart
        )}${keyClass.keyboardInput.value.slice(caretStart + 1)}`;
        caretPosition(caretStart, caretStart);
      } else {
        keyClass.keyboardInput.value = `${keyClass.keyboardInput.value.slice(
          0,
          caretStart
        )}${keyClass.keyboardInput.value.slice(caretEnd)}`;
        caretPosition(caretStart, caretStart);
      }
      break;
    case "CapsLock":
      key.classList.toggle("keyboard__key--caps", !keyClass.capsLock);
      keyClass._toggleCapsLock();
      break;
    case "Enter":
      keyClass.keyboardInput.value = `${keyClass.keyboardInput.value.slice(
        0,
        caretStart
      )}\n${keyClass.keyboardInput.value.slice(caretStart)}`;
      caretPosition(caretStart + 1, caretStart + 1);
      break;
    case "ShiftLeft":
      if (!event.repeat) {
        keyClass._toggleShift();
      }
      break;
    case "ShiftRight":
      keyClass._toggleShift();
      break;
    case "ControlLeft":
      break;
    case "ControlRight":
      break;
    case "MetaLeft":
      break;
    case "Space":
      keyClass.keyboardInput.value = `${keyClass.keyboardInput.value.slice(
        0,
        caretStart
      )} ${keyClass.keyboardInput.value.slice(caretStart)}`;
      caretPosition(caretStart + 1, caretStart + 1);
      break;
    case "AltRight":
      break;
    case "AltLeft":
      break;
    case "ArrowLeft":
      caretPosition(caretStart - 1, caretStart - 1);
      break;
    case "ArrowRight":
      caretPosition(caretStart + 1, caretStart + 1);
      break;
    case "ArrowUp":
      if (caretStart <= rowLength) {
        caretPosition(0, 0);
      } else {
        caretPosition(caretStart - rowLength, caretStart - rowLength);
      }
      break;
    case "ArrowDown":
      caretPosition(caretStart + rowLength, caretStart + rowLength);
      break;
    case "mic ":
      keyClass.recognizer.lang = "eng-Eng";
      keyClass.recognizer.start();
      
      break;
    case "mic":
      keyClass.recognizer.lang = "ru-Ru";
      keyClass.recognizer.start();
      break;
    default:
      if (event.ctrlKey && event.code === "KeyX") {
        break;
      } else if (event.ctrlKey && event.code === "KeyV") {
        break;
      } else if (event.ctrlKey && event.code === "KeyC") {
        break;
      } else {
        if (caretStart === caretEnd) {
          keyClass.keyboardInput.value = `${keyClass.keyboardInput.value.slice(
            0,
            caretStart
          )}${key.textContent}${keyClass.keyboardInput.value.slice(
            caretStart
          )}`;
          caretPosition(caretStart + 1, caretStart + 1);
        } else {
          keyClass.keyboardInput.value = `${keyClass.keyboardInput.value.slice(
            0,
            caretStart
          )}${key.textContent}${keyClass.keyboardInput.value.slice(caretEnd)}`;
          caretPosition(caretStart + 1, caretStart + 1);
        }
      }
      break;
  }
}
