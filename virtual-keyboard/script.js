class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      keyboardInput: null,
      keyboardContainer: null,
      keys: [],
    };

    this.properties = {
      capsLock: false,
      value: "",
    };
  }

  init() {
    //создаем инпут
    this.elements.keyboardInput = document.createElement("textarea");
    this.elements.keyboardInput.classList.add("keyboard-input");
    this.elements.keyboardInput.placeholder = "Please, type something here...";

    //создаем мейн блок для контейнера
    this.elements.main = document.createElement("div");
    this.elements.main.classList.add("keyboard");

    //создаем контенер для клавиатуры
    this.elements.keyboardContainer = document.createElement("div");
    this.elements.keyboardContainer.classList.add("keyboard__keys");
    //добавляем кнопки в контейнер
    this.elements.keyboardContainer.appendChild(this._createKeys());
    this.elements.keys =
      this.elements.keyboardContainer.querySelectorAll(".keyboard__key");

    //добавляем в дом элементы
    this.elements.main.appendChild(this.elements.keyboardContainer);
    document.body.appendChild(this.elements.keyboardInput);
    document.body.appendChild(this.elements.main);
  }

  // создаем функцию для создания кнопок
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      { lett: "ё", sublett: "`", suplett: "~" },
      { lett: "1", sublett: "!", suplett: "!" },
      { lett: "2", sublett: "@", suplett: '"' },
      { lett: "3", sublett: "#", suplett: "№" },
      { lett: "4", sublett: "$", suplett: ";" },
      { lett: "5", sublett: "%", suplett: "%" },
      { lett: "6", sublett: "^", suplett: ":" },
      { lett: "7", sublett: "&", suplett: "?" },
      { lett: "8", sublett: "*", suplett: "*" },
      { lett: "9", sublett: "(", suplett: "(" },
      { lett: "0", sublett: ")", suplett: ")" },
      { lett: "-", sublett: "_", suplett: "_" },
      { lett: "=", sublett: "+", suplett: "+" },
      { lett: "Backspace", sublett: "Backspace", suplett: "Backspace" },
      { lett: "Tab", sublett: "Tab", suplett: "Tab" },
      { lett: "й", sublett: "q", suplett: "q" },
      { lett: "ц", sublett: "w", suplett: "w" },
      { lett: "у", sublett: "e", suplett: "e" },
      { lett: "к", sublett: "r", suplett: "r" },
      { lett: "е", sublett: "t", suplett: "t" },
      { lett: "н", sublett: "y", suplett: "y" },
      { lett: "г", sublett: "u", suplett: "u" },
      { lett: "ш", sublett: "i", suplett: "i" },
      { lett: "щ", sublett: "o", suplett: "o" },
      { lett: "з", sublett: "p", suplett: "p" },
      { lett: "х", sublett: "[", suplett: "{" },
      { lett: "ъ", sublett: "]", suplett: "}" },
      { lett: "/", sublett: "", suplett: "|" },
      { lett: "Del", sublett: "Del", suplett: "Del" },
      { lett: "Caps Lock", sublett: "Caps Lock", suplett: "Caps Lock" },
      { lett: "ф", sublett: "a", suplett: "r" },
      { lett: "ы", sublett: "s", suplett: "r" },
      { lett: "в", sublett: "d", suplett: "r" },
      { lett: "а", sublett: "f", suplett: "r" },
      { lett: "п", sublett: "g", suplett: "r" },
      { lett: "р", sublett: "h", suplett: "r" },
      { lett: "о", sublett: "j", suplett: "r" },
      { lett: "л", sublett: "k", suplett: "r" },
      { lett: "д", sublett: "l", suplett: "r" },
      { lett: "ж", sublett: ";", suplett: "r" },
      { lett: "э", sublett: "'", suplett: "r" },
      { lett: "Enter", sublett: "Enter", suplett: "Enter" },
      { lett: "Shift", sublett: "Shift", suplett: "Shift" },
      { lett: "я", sublett: "z", suplett: "z" },
      { lett: "ч", sublett: "x", suplett: "x" },
      { lett: "с", sublett: "c", suplett: "c" },
      { lett: "м", sublett: "v", suplett: "v" },
      { lett: "и", sublett: "b", suplett: "b" },
      { lett: "т", sublett: "n", suplett: "n" },
      { lett: "ь", sublett: "m", suplett: "m" },
      { lett: "б", sublett: ",", suplett: "<" },
      { lett: "ю", sublett: ".", suplett: ">" },
      { lett: ".", sublett: "/", suplett: "?" },
      { lett: "⇑", sublett: "⇑", suplett: "⇑" },
      { lett: "Shift ", sublett: "Shift ", suplett: "Shift " },
      { lett: "Ctrl", sublett: "Ctrl", suplett: "Ctrl" },
      { lett: "Win", sublett: "Win", suplett: "Win" },
      { lett: "Alt", sublett: "Alt", suplett: "Alt" },
      { lett: "Space", sublett: "Space", suplett: "Space" },
      { lett: "Alt", sublett: "Alt", suplett: "Alt" },
      { lett: "Ctrl", sublett: "Ctrl", suplett: "Ctrl" },
      { lett: "⇐", sublett: "⇐", suplett: "⇐" },
      { lett: "⇓", sublett: "⇓", suplett: "⇓" },
      { lett: "⇒", sublett: "⇒", suplett: "⇒" },
    ];

    keyLayout.forEach((key) => {
      const char = key.lett;
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["Backspace", "Del", "Enter", "Shift "].indexOf(char) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (char) {
        case "Backspace":
          keyElement.classList.add("keyboard__key--xl");
          keyElement.textContent = char;
          keyElement.addEventListener("click", () => {
            this.elements.keyboardInput.value =
              this.elements.keyboardInput.value.slice(0, -1);
          });

          break;
        case "Tab":
          keyElement.classList.add("keyboard__key--s");
          keyElement.textContent = char;
          break;
        case "Del":
          keyElement.classList.add("keyboard__key--s");
          keyElement.textContent = char;
          break;
        case "Caps Lock":
          keyElement.classList.add("keyboard__key--xl");
          keyElement.textContent = char;
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });
          break;
        case "Enter":
          keyElement.classList.add("keyboard__key--xl");
          keyElement.textContent = char;
          keyElement.addEventListener("click", () => {
            this.elements.keyboardInput.value += "\n";
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
          keyElement.classList.add("keyboard__key--s");
          keyElement.textContent = char;
          break;
        case "Ctrl":
          keyElement.classList.add("keyboard__key--m");
          keyElement.textContent = char;
          break;
        case "Win":
          keyElement.classList.add("keyboard__key--xs");
          keyElement.textContent = char;
          break;
        case "Alt":
          keyElement.classList.add("keyboard__key--xs");
          keyElement.textContent = char;
          break;
        case "Space":
          keyElement.classList.add("keyboard__key--xxl");
          keyElement.textContent = char;
          keyElement.addEventListener("click", () => {
            this.elements.keyboardInput.value += " ";
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
            this.elements.keyboardInput.value += this.properties.capsLock
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
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.textContent.length === 1) {
        key.textContent = this.properties.capsLock
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
