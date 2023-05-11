"use strict";

(function() {
    //modal selectors
    const modalOne = document.querySelector('.modal-one');
    const modalTwo = document.querySelector('.modal-two');
    const overlay = document.querySelector('.overlay');
    const closeButtons = document.querySelectorAll('.close-modal');
    //var to hold the current button pressed
    let currentButton;
    //array to hold ids
    let idsArr = [];
    //array to hold movie objects for sorting
    let movies = [];

    //timeout to show off our cool loading gif
    var timeoutId = setTimeout(function() {
        //initial call to the database
        getData();
    },2000)

    //click events
    $(document).ready(function () {
        //bring up add movie modal
        $('#addAMovie').click(function () {
            showModalTwo();
        });

        //adding a movie
        $("#addMovie").click(function () {
            var title = $('#addTitle').val();
            var genre = $('#addGenre').val();
            var director = $('#addDirector').val();
            var rating = $('#addRating').val();
            addMovie(director, genre, rating, title);
        });

        //save movie
        $('#saveMovie').click(function () {
            var title = $('#editTitle').val();
            var genre = $('#editGenre').val();
            var director = $('#editDirector').val();
            var rating = $('#editRating').val();
            editMovie(currentButton, director, genre, rating, title);
        });

        //sort movies
        document.querySelector("#sort").addEventListener('change', function () {
            sort(this.value);
        });


        //enable search button
        $(`#search_button`).click(function () {
            var searchInput = $('#search_bar').val();
            let filteredMovies = movies.filter(movie => filterConditions(movie, searchInput));
            displayMovies(filteredMovies);
            idsArr = [];
            filteredMovies.forEach(item => idsArr.push(item.id));
            addEvents(idsArr);
        });

        //clear search
        $('#reset_button').click(function() {
            getData();
        })


        //MODAL STUFF
        closeButtons[0].addEventListener('click', closeModal);
        closeButtons[1].addEventListener('click', closeModal);
        document.addEventListener('keydown', e => {
            if (e.key === "Escape") closeModal()
        });
    });


    //function that fetches the data and then displays it accordingly
    function getData() {
        //disable buttons while fetching
        setDisable();
        fetch("https://checker-debonair-trigonometry.glitch.me/movies")
            .then(res => res.json())
            .then(data => {
                //remove loading screen and display movies
                $('#loading').addClass('hidden');
                $('#display-movies').removeClass('hidden');
                $('#addMovieSection').removeClass('hidden');
                $('.surround').removeClass('hidden');
                movies = [];
                movies = data;
                displayMovies(movies);
                idsArr = [];
                data.forEach(item => idsArr.push(item.id));
                addEvents(idsArr);
                //re-enable the buttons
                clearInputs();
                setEnable();
            });
    }


    //adds event listeners to all edit and delete buttons
    function addEvents(num) {
        idsArr.forEach(num => {
            //edit buttons
            $(`#edit-${num}`).click(function () {
                showModalOne();
                //grabbing the movie id from the button
                currentButton = (this.id).slice(5);
                //disable buttons while fetching
                setDisable();
                //fetching the current movie information to pre-filled in
                fetch(`https://checker-debonair-trigonometry.glitch.me/movies/${currentButton}`)
                    .then(res => res.json())
                    .then(data => {
                        $('#editTitle').val(`${data.title}`);
                        $('#editGenre').val(`${data.genre}`);
                        $('#editDirector').val(`${data.director}`);
                        $('#editRating').val(`${data.rating}`);
                    });
                //re-enabling buttons
                setEnable();
            })

            //delete buttons
            $(`#delete-${num}`).click(function () {
                currentButton = (this.id).slice(7);
                deleteMovie(currentButton);
            })
        })
    }


    //this function displays the movies
    function displayMovies(data) {
        // html starter template for movie display
        let display = "";

        data.forEach(movie => {
            //creating star string for ratings
            let stars = "";
            for (let i = 0; i < movie.rating; i++) {
                stars += "&#9733;";
            }

            //movie card
            display += `<div class="card-surround">
                            <div class="card">
                                <div id="image-holder-${movie.id}"></div>
                                    <div class="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h3>${movie.title}</h3>
                                            <h5>${movie.director}</h5>
                                            <p>${movie.genre}</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <h6>${stars}</h6>
                                                <div>
                                                    <button class="noBorders" id="edit-${movie.id}"><i class="fa-solid fa-pen"></i></button>
                                                    <button class="noBorders" id="delete-${movie.id}"><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                        </div>
                                    </div>
                            </div>
                        </div>`

            //getting the movie poster and appending it to the movie card
            getPoster(movie.title, `#image-holder-${movie.id}`);
        });

        //adding the movie cards to the html
        document.querySelector('#movie-container').innerHTML = display;
    }


    //function to add movie
    function addMovie(director, genre, rating, title) {
        setDisable();
        let reviewObj = {
            director,
            genre,
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
            .then(getData)
            .catch(error => console.error(error));
    }

    //used to reset the input fields after a movie is added
    function clearInputs() {
        $('#addTitle').val('');
        $('#addGenre').val('');
        $('#addDirector').val('');
        $('#addRating').val('');
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
            .then(getData)
            .catch(error => console.error(error));
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
            .then(getData)
            .catch(error => console.error(error));

    }


    function sort(selected) {
        //sort by rating
        if (selected === "rating") {
            movies.sort((a, b) => {
                return b.rating - a.rating;
            });
        //sort by anything else
        } else {
            movies.sort((a, b) => {
                let fa,fb;
                //determine sort parameter
                switch(selected) {
                    case "title" :
                        fa = a.title.toLowerCase();
                        fb = b.title.toLowerCase();
                        break;
                    case "genre":
                        fa = a.genre.toLowerCase();
                        fb = b.genre.toLowerCase();
                        break;
                    case "director":
                        fa = a.director.toLowerCase();
                        fb = b.director.toLowerCase();
                        break;
                    default:
                        fa = a.title.toLowerCase();
                        fb = b.title.toLowerCase();
                        break;
                }

                //perform sort
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }

        //re-display movies and reset id array so buttons still work
        displayMovies(movies);
        idsArr = [];
        movies.forEach(item => idsArr.push(item.id));
        addEvents(idsArr);
    }




    function closeModal() {
        modalOne.classList.add('hidden');
        modalTwo.classList.add('hidden');
        overlay.classList.add('hidden');
    }

    //modal for editing
    function showModalOne() {
        modalOne.classList.remove('hidden');
        overlay.classList.remove('hidden');
        overlay.addEventListener('click', closeModal);
    }

    //modal for adding
    function showModalTwo() {
        modalTwo.classList.remove('hidden');
        overlay.classList.remove('hidden');
        overlay.addEventListener('click', closeModal);
    }

    function filterConditions(movie, searchInput) {
        let byTitle = movie.title.toLowerCase().includes(searchInput.toLowerCase());
        let byDirector = movie.director.toLowerCase().includes(searchInput.toLowerCase());
        let byRating = movie.rating == searchInput;
        let byGenre = movie.genre.toLowerCase().includes(searchInput.toLowerCase())
        return byTitle || byDirector || byRating || byGenre;
    }

    function setDisable() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => $('button').attr("disabled", ""));
        $('#addAMovie').addClass('disableLinks');
        $('#sort').addClass('disableLinks');

    }

    function setEnable() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => $('button').removeAttr("disabled"));
        $('#addAMovie').removeClass('disableLinks');
        $('#sort').removeClass('disableLinks');
    }


    async function getPoster(searchTerm, location) {
        const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=6c2988bd`;
        const res = await fetch(`${URL}`);
        const data = await res.json();
        if (data.Search != undefined && data.Search[0].Poster != "N/A") {
            $(location).append(`<img src="${data.Search[0].Poster}" class="card-img-top" alt="movie poster">`);
        } else {
            $(location).append(`<img src="../img/film-projector.jpeg" class="card-img-top" alt="movie poster">`);
        }

    }

})();









