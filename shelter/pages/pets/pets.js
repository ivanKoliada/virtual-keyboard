const pets = [
  {
    id: "0",
    name: "Jennifer",
    img: "./../../assets/img/pets-jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "1",
    name: "Sophia",
    img: "./../../assets/img/pets-sophia.png",
    type: "Dog",
    breed: "Shih tzu",
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "2",
    name: "Woody",
    img: "./../../assets/img/pets-woody.png",
    type: "Dog",
    breed: "Golden Retriever",
    description:
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: ["none"],
  },
  {
    id: "3",
    name: "Scarlett",
    img: "./../../assets/img/pets-scarlet.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "4",
    name: "Katrine",
    img: "./../../assets/img/pets-katrine.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "5",
    name: "Timmy",
    img: "./../../assets/img/pets-timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: ["none"],
  },
  {
    id: "6",
    name: "Freddie",
    img: "./../../assets/img/pets-freddie.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    id: "7",
    name: "Charly",
    img: "./../../assets/img/pets-charly.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"],
  },
];

//pagination

const cards = document.querySelector(".cards");
const btns = document.querySelectorAll("[data-pag]");
const pageNumber = document.querySelector("[data-btn-number]");
const btnStart = document.querySelector("[data-btn-start]");
const btnEnd = document.querySelector("[data-btn-end]");
const bntNext = document.querySelector("[data-btn-next]");
const btnPrev = document.querySelector("[data-btn-prev]");
const indexArray = [];
const startRange = 0;
const endRange = pets.length;
const laptop = 1280;
const tablet = 768;
let index = 0;
let randomId;
let numOfPages = 6;
let numOfCards = 8;
let temp = "";

function getPagesAndCards() {
  if (window.innerWidth >= laptop) {
    (numOfPages = 6), (numOfCards = 8);
  } else if (window.innerWidth >= tablet) {
    (numOfPages = 8), (numOfCards = 6);
  } else (numOfPages = 16), (numOfCards = 3);
}

getPagesAndCards();
window.addEventListener("resize", () => {
  index = 0;
  getPagesAndCards(), getIndexArray(numOfPages, numOfCards), createCards(index);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getIndexArray(numOfPages, numOfCards) {
  for (let i = 0; i < numOfPages; i++) {
    let tempArr = [];
    for (let j = 0; j < numOfCards; j++) {
      do {
        randomId = getRandomInt(startRange, endRange);
      } while (tempArr.includes(randomId));
      tempArr.push(randomId);
    }
    indexArray.push(tempArr);
  }
}

getIndexArray(numOfPages, numOfCards);

function removeDisabled() {
  for (btn of btns) {
    btn.removeAttribute("disabled");
  }
}

function stateOfBtns(index) {
  if (index === 0) {
    removeDisabled();
    btnStart.setAttribute("disabled", "");
    btnPrev.setAttribute("disabled", "");
  } else if (index === numOfPages - 1) {
    removeDisabled();
    btnEnd.setAttribute("disabled", "");
    bntNext.setAttribute("disabled", "");
  } else removeDisabled();
}

function fadeIn() {
  cards.style.opacity = 0;
  (function fade() {
    let val = parseFloat(cards.style.opacity);
    if (!((val += 0.03) > 1)) {
      cards.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function createCards(index) {
  temp = "";
  for (let i = 0; i < numOfCards; i++) {
    temp += `<div class="card" data-key=${pets[indexArray[index][i]]["id"]}>
              <img
                src=${pets[indexArray[index][i]]["img"]}
                alt=${pets[indexArray[index][i]]["name"]}
              />
              <p>${pets[indexArray[index][i]]["name"]}</p>
              <button>Learn more</button>
            </div>`;
  }
  cards.innerHTML = temp;
  pageNumber.innerHTML = index + 1;
  stateOfBtns(index);
  fadeIn();
}

function nextSlide() {
  if (index === numOfPages - 1) {
    index = numOfPages - 1;
  } else index++;
  createCards(index);
  stateOfBtns(index);
}

function prevSlide() {
  if (index === 0) {
    index = 0;
  } else index--;
  createCards(index);
  stateOfBtns(index);
}

function startSlide() {
  index = 0;
  createCards(index);
  stateOfBtns(index);
}

function endSlide() {
  index = numOfPages - 1;
  createCards(index);
  stateOfBtns(index);
}

createCards(index);

bntNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);
btnEnd.addEventListener("click", endSlide);
btnStart.addEventListener("click", startSlide);

//popup

const body = document.querySelector("body");
const popup = document.querySelector(".popup-bg");
const wrapper = document.querySelector("[data-popup-cards]");
const popupCloseBtn = document.querySelector("[data-close]");
const popupText = document.querySelector("[data-popup-text]");
const popupImage = document.querySelector("[data-popup-image]");

function openPopup() {
  popup.classList.add("show");
  popup.classList.remove("hide");
  body.classList.add("hidden");
}

function closePopup() {
  popup.classList.add("hide");
  popup.classList.remove("show");
  body.classList.remove("hidden");
}

wrapper.addEventListener("click", ({ target }) => {
  const activeCard = target.closest(".card");
  if (activeCard) {
    const currentCard = pets[activeCard.dataset.key];
    popupImage.innerHTML = `<img src=${currentCard["img"]} alt=${currentCard["name"]} />`;
    popupText.innerHTML = `
    <div class="title">${currentCard["name"]}</div>
                    <div class="description">
                        <div class="type">${currentCard["type"]} - ${currentCard["breed"]}</div>
                        <div class="excerpt">
                            ${currentCard["description"]}
                        </div>
                        <ul class="specification">
                            <li><span>Age:</span> ${currentCard["age"]}</li>
                            <li><span>Inoculations:</span> ${currentCard["inoculations"]}</li>
                            <li><span>Diseases:</span> ${currentCard["diseases"]}</li>
                            <li><span>Parasites:</span> ${currentCard["parasites"]}</li>
                        </ul>
                    </div>
    `;
    openPopup();
  }
});

popupCloseBtn.addEventListener("click", closePopup);

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

// burger

const burger = document.querySelector(".header-burger");
const nav = document.querySelector("nav");
const overlay = document.querySelector(".overlay");

function openCloseMenu() {
  burger.classList.toggle("rotate-burger");
  nav.classList.toggle("active-menu");
  body.classList.toggle("hidden");
  overlay.classList.toggle("show");
}

burger.addEventListener("click", openCloseMenu);
overlay.addEventListener("click", ({ target }) => {
  if (target === overlay) openCloseMenu();
});

//our link
const ourlink = document.querySelector(".our-link");
ourlink.addEventListener("click", () => {
  if (nav.classList.contains("active-menu")) {
    openCloseMenu();
  }
});

// contact link

const contactLink = document.querySelector(".contact-link");
contactLink.addEventListener("click", () => {
  if (nav.classList.contains("active-menu")) {
    openCloseMenu();
  }
});
