//call the api and get stuffs back
            //-make pretty html
//edit and delete button

// HOW TO GRAB STUFF
fetch("https://checker-debonair-trigonometry.glitch.me/movies")
    .then(res => res.json())
    .then(data => {
    console.log(data);
    displayMovies(data);
});

function displayMovies(data) {
    data.forEach(movie => {
        display += `<tr>
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.director}</td>
        <td>${movie.rating}</td>
    </tr>`
    })
    document.querySelector('#display-movies').innerHTML = display;
}

let display = `<tr>
        <th>Movie Title</th>
        <th>Genre</th>
        <th>Director</th>
        <th>Rating</th>
    </tr>`




//form for new movie
//movie title, rating
//post request
//(prevent default)


//edit existing movie


//delete movies