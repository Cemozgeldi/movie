const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//UI objesini başlatma

const ui = new UI();

//!Create a storage object
const storage = new Storage();

//!all events load

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });
  secCardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}
function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //error
    ui.displayMessages("Tüm alanları doldurun!", "danger");
  } else {
    //! new film
    const newFilm = new Film(title, director, url);
    ui.addFilmToUI(newFilm);
    storage.addFilmToStorage(newFilm);
    ui.displayMessages("Film başarıyla eklendi.", "success");
  }
  ui.clearInputs(titleElement, urlElement, directorElement);

  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    ui.displayMessages("Silme işlemi başarılı", "success");
  }
}
function clearAllFilms() {
  if (confirm("Emin Misiniz?")) {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
}
