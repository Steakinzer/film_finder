let apiUrl = "http://www.omdbapi.com/?s=batman&apikey=926cdf5";
let detailsApiUrl =
  "http://www.omdbapi.com/?t=Ich bin ein Star - Holt mich hier raus!&apikey=926cdf5";
let cross = document.querySelector(".cross");
class Movie {
  constructor(title, year, type, poster) {
    this.title = title;
    this.year = year;
    this.type = type;
    this.poster = poster;
  }
}
search__button.addEventListener("click", function findMovies() {
  moviesList = [];
  cards.innerHTML = "";
  apiUrl = `http://www.omdbapi.com/?s=${search.value}&apikey=926cdf5`;
  getMovies(apiUrl);
});

async function getMovie(movie, img) {
  try {
    console.log(movie);
    const response = await fetch(
      `http://www.omdbapi.com/?t=${movie}&apikey=926cdf5`
    );
    const data = await response.json();
    createPopup(data, img);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getMovies(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    createMovies(data.Search);
    moviesList.map((movie) => createDiv(movie));
  } catch (error) {
    console.log(error);
  }
}

let moviesList = [];
function createMovies(movies) {
  for (i = 0; i < movies.length; i++) {
    let title = movies[i].Title;
    let year = movies[i].Year;
    let type = movies[i].Type;
    let poster = movies[i].Poster;
    moviesList.push(new Movie(title, year, type, poster));
  }
}
let moviesDivList = [];
function createDiv(movie) {
  let card = document.createElement("div");
  card.classList.add("card");
  cards.appendChild(card);
  cardContent = document.createElement("div");
  cardContent.classList.add("card__content");
  card.appendChild(cardContent);
  poster = document.createElement("img");
  poster.classList.add("poster");
  poster.setAttribute("src", movie.poster);
  title = document.createElement("h1");
  title.classList.add("title");
  titleText = document.createTextNode(movie.title);

  year = document.createElement("p");
  year.classList.add("year");
  yearText = document.createTextNode(movie.year);

  type = document.createElement("p");
  type.classList.add("type");
  typeText = document.createTextNode(movie.type);

  button = document.createElement("button");
  button.classList.add("details__button");
  buttonText = document.createTextNode("Détails");
  button.addEventListener("click", function (e) {
    popup.style.display = "flex";
    cross.style.display = "block";
    console.log(e.target.parentNode.parentNode.firstChild.src);
    getMovie(
      e.target.parentNode.firstChild.textContent,
      e.target.parentNode.parentNode.firstChild.src
    );
  });

  card.append(poster, cardContent);

  title.appendChild(titleText);
  year.appendChild(yearText);
  type.appendChild(typeText);
  button.appendChild(buttonText);
  cardContent.append(title, year, type, button);
}

let body = document.querySelector("body");
function createPopup(movie, img) {
  body.appendChild(popup);
  popupImage = document.createElement("div");
  popupImage.classList.add("popup__image");

  popupPoster = document.createElement("img");
  popupPoster.setAttribute("src", img);
  popupPoster.classList.add("popup__poster");
  popupImage.appendChild(popupPoster);

  popupContent = document.createElement("div");
  popupContent.classList.add("popup__content");

  popupTitle = document.createElement("p");
  popupTitle.classList.add("popup__title");

  popupDescribe = document.createElement("p");
  popupDescribe.classList.add("popup__describe");

  popupContent.append(popupTitle, popupDescribe);
  popupDescribeText = document.createTextNode(movie.Plot);
  popupTitleText = document.createTextNode(movie.Title);
  popupDescribe.appendChild(popupDescribeText);
  popupTitle.appendChild(popupTitleText);
  popup.append(popupImage, popupContent);
}

cross.addEventListener("click", function () {
  popup.style.display = "none";
  cross.style.display = "none";
  popup.innerHTML = "";
});
