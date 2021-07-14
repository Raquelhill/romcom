// Create variables targeting the relevant DOM elements here 👇
var coverImage = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var tagLine1 = document.querySelector(".tagline-1");
var tagLine2 = document.querySelector(".tagline-2");
var showRandomButton = document.querySelector(".random-cover-button");
var viewSavedButton = document.querySelector(".view-saved-button");
var makeOwnCoverButton = document.querySelector(".make-new-button");
var saveCoverButton = document.querySelector(".save-cover-button")
var homeButton = document.querySelector(".home-button")
var homePage = document.querySelector(".home-view");
var newCoverForm = document.querySelector(".form-view");
var savedCoverForm = document.querySelector(".saved-view");
// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;


// Add your event listeners here 👇
window.addEventListener("load", pageLoadCover);
showRandomButton.addEventListener("click", pageLoadCover);
makeOwnCoverButton.addEventListener("click", makeNewForm);
viewSavedButton.addEventListener("click", viewSavedCoversPage);
homeButton.addEventListener("click", pageLoadCover);

// viewSavedButton.addEventListener("click", )
// Create your event handlers and other functions here 👇
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// We've provided one function to get you started

function createCover(coverImg, title, desc1, desc2){
  return new Cover(coverImg, title, desc1, desc2);
}

function pageLoadCover() {
var randomCover = createCover();
  randomCover.random();
  coverImage.src = randomCover.cover;
  coverTitle.innerHTML = randomCover.title;
  tagLine1.innerHTML = randomCover.tagline1;
  tagLine2.innerHTML = randomCover.tagline2;
  currentCover = randomCover;
};

function makeNewForm() {
  homePage.classList.add('hidden');
  newCoverForm.classList.remove('hidden');
  showRandomButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  homeButton.classList.remove('hidden');
  savedCoverForm.classList.add('hidden');
};

function viewSavedCoversPage() {
  homePage.classList.add('hidden');
  showRandomButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  savedCoverForm.classList.remove('hidden');
  homeButton.classList.remove('hidden');
}

