//call the api and get stuffs back
            //-make pretty html
//edit and delete button
let startingID;


// HOW TO GRAB STUFF
fetch("https://checker-debonair-trigonometry.glitch.me/movies")
    .then(res => res.json())
    .then(data => {
    console.log(data);
    displayMovies(data);
	startingID = data.length;
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




function addMovie(director,genre,rating,title) {
	let reviewObj = {
		director,
		genre,
		id: startingID,
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
		.then( response => console.log(response) ) /* review was created successfully */
		.catch( error => console.error(error) ); /* handle errors */

	// startingID++;
}

function deleteMovie(id) {
	let url = `https://checker-debonair-trigonometry.glitch.me/movies/${id}`;
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		}
	};
	fetch(url, options)
		.then( response => console.log(response) ) /* review was created successfully */
		.catch( error => console.error(error) ); /* handle errors */
}

function editMovie(id,director, genre,rating,title) {
	const editObj = {
		director,
		genre,
		id,
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
		.then( response => console.log(response) ) /* review was created successfully */
		.catch( error => console.error(error) ); /* handle errors */
}


// addMovie("kitty cat", "comedy", 4, "this is a movie");
// addMovie("kitty cat2", "comedy", 4, "this is a movie");
// deleteMovie(11);
// deleteMovie(12);
// deleteMovie(13);
// deleteMovie(14);
// editMovie(20, "kitty meow", "comedy", 4, "this is a movie");



//form for new movie
//movie title, rating
//post request
//(prevent default)


//edit existing movie


//delete movies