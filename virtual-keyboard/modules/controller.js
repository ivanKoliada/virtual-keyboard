export default function controller(char, key, keyController) {
  const instance = keyController;
  const caretStart = instance.keyboardInput.selectionStart;
  const caretEnd = instance.keyboardInput.selectionEnd;
  const caretPosition = (start, end) => {
    instance.keyboardInput.setSelectionRange(start, end);
  };
  instance.tempValue = instance.tempValue.slice(-1);
  instance.tempValue.push(key.textContent);

  if (!event.repeat) {
    instance.audio.currentTime = 0;
    instance.audio.play();
  }

  instance.keyboardInput.focus();
  switch (char) {
    case 'Backspace':
      if (caretStart === caretEnd) {
        instance.keyboardInput.value = `${instance.keyboardInput.value.slice(
          0,
          caretStart - 1,
        )}${instance.keyboardInput.value.slice(caretStart)}`;
        caretPosition(caretStart - 1, caretStart - 1);
      } else {
        instance.keyboardInput.value = `${instance.keyboardInput.value.slice(
          0,
          caretStart,
        )}${instance.keyboardInput.value.slice(caretEnd)}`;
        caretPosition(caretStart, caretStart);
      }
      break;
    case 'Tab':
      instance.keyboardInput.value = `${instance.keyboardInput.value.slice(
        0,
        caretStart,
      )}    ${instance.keyboardInput.value.slice(caretStart)}`;
      caretPosition(caretStart + 4, caretStart + 4);
      break;
    case 'Delete':
      if (caretStart === caretEnd) {
        instance.keyboardInput.value = `${instance.keyboardInput.value.slice(
          0,
          caretStart,
        )}${instance.keyboardInput.value.slice(caretStart + 1)}`;
        caretPosition(caretStart, caretStart);
      } else {
        instance.keyboardInput.value = `${instance.keyboardInput.value.slice(
          0,
          caretStart,
        )}${instance.keyboardInput.value.slice(caretEnd)}`;
        caretPosition(caretStart, caretStart);
      }
      break;
    case 'CapsLock':
      key.classList.toggle('keyboard__key--caps', !instance.capsLock);
      instance.toggleCapsLock();
      break;
    case 'Enter':
      instance.keyboardInput.value = `${instance.keyboardInput.value.slice(
        0,
        caretStart,
      )}\n${instance.keyboardInput.value.slice(caretStart)}`;
      caretPosition(caretStart + 1, caretStart + 1);
      break;
    case 'ShiftLeft':
      if (!event.repeat) {
        instance.toggleShift();
      }
      break;
    case 'ShiftRight':
      if (!event.repeat) {
        instance.toggleShift();
      }
      break;
    case 'ControlLeft':
      if (event.altKey || instance.tempValue[0] === 'Alt') {
        instance.tempValue = [];
        instance.toggleLayout();
      }
      break;
    case 'ControlRight':
      if (event.altKey || instance.tempValue[0] === 'Alt') {
        instance.tempValue = [];
        instance.toggleLayout();
      }
      break;
    case 'MetaLeft':
      break;
    case 'Space':
      instance.keyboardInput.value = `${instance.keyboardInput.value.slice(
        0,
        caretStart,
      )} ${instance.keyboardInput.value.slice(caretStart)}`;
      caretPosition(caretStart + 1, caretStart + 1);
      break;
    case 'AltRight':
      if (event.ctrlKey || instance.tempValue[0] === 'Ctrl') {
        instance.tempValue = [];
        instance.toggleLayout();
      }
      break;
    case 'AltLeft':
      if (event.ctrlKey || instance.tempValue[0] === 'Ctrl') {
        instance.tempValue = [];
        instance.toggleLayout();
      }
      break;
    case 'ArrowLeft':
      caretPosition(caretStart - 1, caretStart - 1);
      break;
    case 'ArrowRight':
      caretPosition(caretStart + 1, caretStart + 1);
      break;
    case 'ArrowUp':
      window.getSelection().modify('move', 'left', 'paragraph');
      break;
    case 'ArrowDown':
      window.getSelection().modify('move', 'right', 'paragraph');
      break;
    case 'mic ':
      instance.recognizer.lang = 'eng-Eng';
      instance.recognizer.start();

      break;
    case 'mic':
      instance.recognizer.lang = 'ru-Ru';
      instance.recognizer.start();
      break;
    default:
      if (event?.ctrlKey && event?.code === 'KeyX') {
        instance.copyText = instance.keyboardInput.value.slice(caretStart, caretEnd);
        instance.keyboardInput.value = `${instance.keyboardInput.value.slice(
          0,
          caretStart,
        )}${instance.keyboardInput.value.slice(caretEnd)}`;
        caretPosition(caretStart, caretStart);
        break;
      } else if (event?.ctrlKey && event?.code === 'KeyV') {
        instance.keyboardInput.value = `${instance.keyboardInput.value.slice(0, caretStart)}${
          instance.copyText
        }${instance.keyboardInput.value.slice(caretEnd)}`;
        caretPosition(caretStart + instance.copyText.length, caretStart + instance.copyText.length);
        break;
      } else if (event?.ctrlKey && event?.code === 'KeyC') {
        instance.copyText = instance.keyboardInput.value.slice(caretStart, caretEnd);
        caretPosition(caretStart + instance.copyText.length, caretStart + instance.copyText.length);
        break;
      } else if (event?.ctrlKey && event?.code === 'KeyA') {
        caretPosition(0, instance.keyboardInput.value.length);
        break;
      } else if (caretStart === caretEnd) {
        instance.keyboardInput.value = `${instance.keyboardInput.value.slice(0, caretStart)}${
          key.textContent
        }${instance.keyboardInput.value.slice(caretStart)}`;
        caretPosition(caretStart + 1, caretStart + 1);
      } else {
        instance.keyboardInput.value = `${instance.keyboardInput.value.slice(0, caretStart)}${
          key.textContent
        }${instance.keyboardInput.value.slice(caretEnd)}`;
        caretPosition(caretStart + 1, caretStart + 1);
      }
      break;
  }
}
