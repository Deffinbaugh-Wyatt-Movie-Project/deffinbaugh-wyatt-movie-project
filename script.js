//modal selectors
const modal = document.querySelector('.modal');
const modalOne = document.querySelector('.modal-one');
const modalTwo = document.querySelector('.modal-two');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-modal');
//var to hold the current button pressed
let currentButton;


let idsArr = [];

let movies = [];

getData();


// HOW TO GRAB STUFF
function getData() {
    setDisable();
    fetch("https://checker-debonair-trigonometry.glitch.me/movies")
        .then(res => res.json())
        .then(data => {
            $('#loading').addClass('hidden');
            $('#display-movies').removeClass('hidden');
            $('#addMovieSection').removeClass('hidden');
            movies = [];
            movies = data;
            console.log(data);
            displayMovies(movies);
            idsArr = [];
            data.forEach(item => idsArr.push(item.id));
            addEvents(idsArr);
            console.log("movies:")
            console.log(movies);
            setEnable()
        });
}


//adds event listeners to all edit and delete buttons
function addEvents(num) {
    //TODO change id iteration to match id's from the data instead of incrementing
    idsArr.forEach(num => {
        $(`#edit-${num}`).click(function () {
            showModalOne();
            currentButton = (this.id).slice(5);
        })
        $(`#delete-${num}`).click(function () {
            currentButton = (this.id).slice(7);
            console.log(currentButton)
            deleteMovie(currentButton);
        })
    })
}


//this function displays the movies
function displayMovies(data) {
    // html starter template for movie display
    let display = "";

    // data.forEach(movie => {
    //     display += `<tr>
    //     <td>${movie.title}</td>
    //     <td>${movie.genre}</td>
    //     <td>${movie.director}</td>
    //     <td>${movie.rating}</td>
    //     <td><button id="edit-${movie.id}">Edit</button></td>
    //     <td><button id="delete-${movie.id}">Delete</button></td>
    // </tr>`
    // });

    data.forEach(movie => {
        let stars = "";

        for(let i = 0; i < movie.rating; i++) {
            stars += "&#9733;";
        }

        display += `<div style="margin: 1em;">
                <div class="card" style="width: 16rem; min-height: 100%;">
                <div id="image-holder-${movie.id}">
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                <div>
                <h3>${movie.title}</h3>
                <h5>${movie.director}</h5>
                <p>${movie.genre}</p>
                </div>
                <div class="d-flex justify-content-between">
                <h6>${stars}</h6>
                <div>
                <button id="edit-${movie.id}">Edit</button>
                <button id="delete-${movie.id}">Delete</button>
                </div>
                </div>
                </div>
                </div>
                </div>`

        getPoster(movie.title, `#image-holder-${movie.id}`);
    });




    document.querySelector('#movie-container').innerHTML = display;
}



//function to add movie
function addMovie(director, genre, rating, title) {
    setDisable()
    let reviewObj = {
        director,
        genre,
        // id: startingID,
        rating,
        title
    };


    let url = 'https://checker-debonair-trigonometry.glitch.me/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewObj)
    };
    fetch(url, options)
        .then(response => console.log(response)).then(getData) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */

    // startingID++;

}

//function to delete movie
function deleteMovie(id) {
    setDisable()
    let url = `https://checker-debonair-trigonometry.glitch.me/movies/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch(url, options)
        .then(response => console.log(response)).then(getData) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

//function to edit movie
function editMovie(id, director, genre, rating, title) {
    setDisable()
    const editObj = {
        director,
        genre,
        rating,
        title
    };

    let url = `https://checker-debonair-trigonometry.glitch.me/movies/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editObj)
    };
    fetch(url, options)
        .then(response => console.log(response)).then(getData) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */

}

//adding a movie
$(document).ready(function () {
    $("#addMovie").click(function () {
        var title = $('#addTitle').val();
        var genre = $('#addGenre').val();
        var director = $('#addDirector').val();
        var rating = $('#addRating').val();
        addMovie(director, genre, rating, title);
    });
});


//save movie
$('#saveMovie').click(function () {
    save(currentButton);
});

function save(id) {
    var title = $('#editTitle').val();
    var genre = $('#editGenre').val();
    var director = $('#editDirector').val();
    var rating = $('#editRating').val();
    editMovie(id, director, genre, rating, title);
}


document.querySelector("#sort").addEventListener('change', function () {
    sort(this.value);
})

function sort(selected) {
    if (selected === "rating") {
        movies.sort((a, b) => {
            return a.rating - b.rating;
        });
    } else if (selected === "title") {
        movies.sort((a, b) => {
            let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
    } else if (selected === "genre") {
        movies.sort((a, b) => {
            let fa = a.genre.toLowerCase(),
                fb = b.genre.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
    } else if (selected === "director") {
        movies.sort((a, b) => {
            let fa = a.director.toLowerCase(),
                fb = b.director.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
    }
    displayMovies(movies);
    idsArr = [];
    movies.forEach(item => idsArr.push(item.id));
    addEvents(idsArr);
}


//MODAL STUFF
closeButton.addEventListener('click', closeModal);

function closeModal() {
    modalOne.classList.add('hidden');
    modalTwo.classList.add('hidden');
    overlay.classList.add('hidden');
}

function showModalOne() {
    modalOne.classList.remove('hidden');
    overlay.classList.remove('hidden');
    overlay.addEventListener('click', closeModal);
}

function showModalTwo() {
    modalTwo.classList.remove('hidden');
    overlay.classList.remove('hidden');
    overlay.addEventListener('click', closeModal);
}

document.addEventListener('keydown', e => {
    if (e.key === "Escape") closeModal()
});

$('#addAMovie').click(function () {
    showModalTwo();
})

$(`#search_button`).click(function () {
    var searchInput = $('#search_bar').val();
    let filteredMovies = movies.filter(movie => filterConditions(movie, searchInput));
    console.log(filteredMovies)
    displayMovies(filteredMovies);
    idsArr = [];
    filteredMovies.forEach(item => idsArr.push(item.id));
    addEvents(idsArr);
})

function filterConditions(movie, searchInput) {
    let byTitle = movie.title.toLowerCase().includes(searchInput.toLowerCase());
    let byDirector = movie.director.toLowerCase().includes(searchInput.toLowerCase());
    let byRating = movie.rating == searchInput;
    let byGenre = movie.genre.toLowerCase().includes(searchInput.toLowerCase())
    return byTitle || byDirector || byRating || byGenre;
}

function setDisable() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => $('button').attr("disabled", ""))
}

function setEnable() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => $('button').removeAttr("disabled"))
}


async function getPoster(searchTerm, location) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=6c2988bd`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data.Search);
    if (data.Search != undefined) {
        $(location).append(`<img src="${data.Search[0].Poster}" style="height:380px; width:255px;" class="card-img-top" alt="movie poster">`);
    } else {
        $(location).append(`<img src="img/film-projector.jpeg" class="card-img-top" alt="movie poster">`);
    }

}

// getPoster("star warhjkhjvkhjvkhvhgs:episode I", '#poster-testing');







