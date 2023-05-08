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
        <td><button>Edit</button></td>
        <td><button>Delete</button></td>
    </tr>`
    })
    document.querySelector('#display-movies').innerHTML = display;
}

let display = `<tr>
        <th>Movie Title</th>
        <th>Genre</th>
        <th>Director</th>
        <th>Rating</th>
        <th>PH</th>
        <th>PH</th>
    </tr>`

const reviewObj = {
	director: "Stephen King",
	genre: 'comedy',
	id: 12,
	rating: 5,
	title: "It Floats"
};


const url = 'https://checker-debonair-trigonometry.glitch.me/movies/12';
const options = {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(reviewObj)
};
fetch(url, options)
	.then( response => console.log(response) ) /* review was created successfully */
	.catch( error => console.error(error) ); /* handle errors */








//form for new movie
//movie title, rating
//post request
//(prevent default)


//edit existing movie


//delete movies