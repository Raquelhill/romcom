var savedCovers = [];
var currentCover;

var coverImage = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var tagLine1 = document.querySelector(".tagline-1");
var tagLine2 = document.querySelector(".tagline-2");
var createOwnCoverBtn = document.querySelector(".make-new-button");
var homeBtn = document.querySelector(".home-button");
var makeMyCoverBtn = document.querySelector(".create-new-book-button");
var saveCoverBtn = document.querySelector(".save-cover-button");
var showRandomBtn = document.querySelector(".random-cover-button");
var viewSavedCoversBtn = document.querySelector(".view-saved-button");
var homePageView = document.querySelector(".home-view");
var formInputView = document.querySelector(".form-view");
var savedCoverView = document.querySelector(".saved-view");
var descriptor1Input = document.querySelector("#descriptor1");
var descriptor2Input = document.querySelector("#descriptor2");
var imageInput = document.querySelector("#cover");
var titleInput = document.querySelector("#title");
var savedCoversGrid = document.querySelector(".saved-covers-section");

createOwnCoverBtn.addEventListener("click", loadCreateCoverPage);
homeBtn.addEventListener("click", loadHomePage);
makeMyCoverBtn.addEventListener("click", submitCustomCover);
saveCoverBtn.addEventListener("click", saveCurrentCover);
savedCoversGrid.addEventListener("dblclick", deleteSavedCover);
showRandomBtn.addEventListener("click", generateRandomCover);
viewSavedCoversBtn.addEventListener("click", loadSavedCoversPage);
window.addEventListener("load", generateRandomCover);

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(coverImg, title, desc1, desc2){
  return new Cover(coverImg, title, desc1, desc2);
}

function setHomeCover(cover) {
    coverImage.src = cover.cover;
    coverTitle.innerText = cover.title;
    tagLine1.innerText = cover.tagline1;
    tagLine2.innerText = cover.tagline2;
    currentCover = cover;
}

function generateRandomCover() {
  var cover = covers[getRandomIndex(covers)];
  var title = titles[getRandomIndex(titles)];
  var tagline1 = descriptors[getRandomIndex(descriptors)];
  var tagline2 = descriptors[getRandomIndex(descriptors)];
  var randomCover = createCover(cover, title, tagline1, tagline2);
  setHomeCover(randomCover);
}

function submitCustomCover(e) {
  e.preventDefault();
  currentCover = createCover(imageInput.value, titleInput.value, descriptor1Input.value, descriptor2Input.value);
  setHomeCover(currentCover);
  saveInputData();
  loadHomePage();
}

function saveInputData() {
  covers.push(imageInput.value);
  titles.push(titleInput.value);
  descriptors.push(descriptor1Input.value);
  descriptors.push(descriptor2Input.value);
}

function saveCurrentCover(){
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
}

function hide(element) {
  element.classList.add('hidden');
  }

function show(element) {
  element.classList.remove('hidden');
  }

function loadCreateCoverPage() {
  hide(homePageView);
  hide(saveCoverBtn);
  hide(savedCoverView);
  hide(showRandomBtn);
  show(formInputView);
  show(homeBtn);
  show(viewSavedCoversBtn);
}

function loadSavedCoversPage() {
  hide(formInputView);
  hide(homePageView);
  hide(saveCoverBtn);
  hide(viewSavedCoversBtn);
  hide(showRandomBtn);
  show(homeBtn);
  show(savedCoverView);
  displaySavedCovers();
}

function loadHomePage() {
  hide(formInputView);
  hide(savedCoverView);
  hide(homeBtn);
  show(homePageView);
  show(saveCoverBtn);
  show(showRandomBtn);
  show(viewSavedCoversBtn);
}

function displaySavedCovers() {
  savedCoversGrid.innerHTML = "";
  for (var i = 0; i < savedCovers.length; i++) {
    savedCoversGrid.innerHTML += `
      <section class="mini-cover" id="${savedCovers[i].id}">
        <img class="cover-image" src="${savedCovers[i].cover}">
        <h2 class="cover-title">${savedCovers[i].title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
        <img class="price-tag" src="./assets/price.png">
        <img class="overlay" src="./assets/overlay.png">
      </section>`;
  }
}

function deleteSavedCover(event) {
  for(var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id == event.target.parentNode.id) {
      savedCovers.splice(i, 1);
    }
  }
  displaySavedCovers();
}