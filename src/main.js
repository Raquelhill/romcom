var savedCovers = [];
var currentCover;
var coverImage = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var tagLine1 = document.querySelector(".tagline-1");
var tagLine2 = document.querySelector(".tagline-2");
var createOwnCoverBtn = document.querySelector(".make-new-button");
var homeBtn = document.querySelector(".home-button");
var saveCoverBtn = document.querySelector(".save-cover-button");
var showRandomBtn = document.querySelector(".random-cover-button");
var viewSavedBtn = document.querySelector(".view-saved-button");
var makeMyBookBtn = document.querySelector(".create-new-book-button");
var homePageView = document.querySelector(".home-view");
var formInputView = document.querySelector(".form-view");
var savedCoverView = document.querySelector(".saved-view");
var descriptor1Input = document.querySelector("#descriptor1");
var descriptor2Input = document.querySelector("#descriptor2");
var imageInput = document.querySelector("#cover");
var titleInput = document.querySelector("#title");
var savedCoversGrid = document.querySelector(".saved-covers-section");


window.addEventListener("load", pageLoadCover);
showRandomBtn.addEventListener("click", pageLoadCover);
createOwnCoverBtn.addEventListener("click", makeNewForm);
viewSavedBtn.addEventListener("click", loadSavedPage);
homeBtn.addEventListener("click", loadHomePage);
makeMyBookBtn.addEventListener("click", makeMyBook);
saveCoverBtn.addEventListener("click", saveCurrentCover);
savedCoversGrid.addEventListener("dblclick", deleteSavedCover);


function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function random() {
  var cover = covers[getRandomIndex(covers)];
  var title = titles[getRandomIndex(titles)];
  var tagline1 = descriptors[getRandomIndex(descriptors)];
  var tagline2 = descriptors[getRandomIndex(descriptors)];
  return [cover, title, tagline1, tagline2];
};

function displayCover(bookCover1) {
  coverImage.src = bookCover1.cover;
  coverTitle.innerText = bookCover1.title;
  tagLine1.innerText = bookCover1.tagline1;
  tagLine2.innerText = bookCover1.tagline2;
};

function createCover(coverImg, title, desc1, desc2){
  return new Cover(coverImg, title, desc1, desc2);
};

function pageLoadCover() {
  var randomInfo = random();
  var randomCover = createCover(randomInfo[0], randomInfo[1], randomInfo[2], randomInfo[3]);
  coverImage.src = randomCover.cover;
  coverTitle.innerText = randomCover.title;
  tagLine1.innerText = randomCover.tagline1;
  tagLine2.innerText = randomCover.tagline2;
  currentCover = randomCover;
}

function hide(element) {
  element.classList.add('hidden');
  }

function show(element) {
  element.classList.remove('hidden');
  }
  
function makeNewForm() {
  hide(homePageView);
  hide(saveCoverBtn);
  hide(savedCoverView);
  hide(showRandomBtn);
  show(formInputView);
  show(homeBtn);
}

function loadSavedPage() {
  hide(formInputView);
  hide(homePageView);
  hide(saveCoverBtn);
  hide(viewSavedBtn);
  hide(showRandomBtn);
  show(homeBtn);
  show(savedCoverView);
  displaySaved();
}

function loadHomePage() {
  hide(formInputView);
  hide(savedCoverView);
  show(homePageView);
  show(saveCoverBtn);
  show(showRandomBtn);
}

function makeMyBook(e) {
  e.preventDefault()
  var userCover = new Cover(imageInput.value, titleInput.value, descriptor1Input.value, descriptor2Input.value);
  currentCover = userCover
  displayCover(userCover)
  pushToSavedCovers()
  loadHomePage()
}

function pushToSavedCovers() {
  covers.push(imageInput.value);
  titles.push(titleInput.value);
  descriptors.push(descriptor1Input.value);
  descriptors.push(descriptor2Input.value);
}

function saveCurrentCover(){
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover)
  }
}

function displaySaved() {
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
  console.log(event.target.parentNode.id)
  for(var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id == event.target.parentNode.id) {
      console.log('I am running!')
      savedCovers.splice(i, 1);
    }
  }
  displaySaved();
}