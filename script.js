//modal selectors
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-modal');
//var to hold the current button pressed
let currentButton;
// html starter template for movie display
let display = `<tr>
        <th>Movie Title</th>
        <th>Genre</th>
        <th>Director</th>
        <th>Rating</th>
        <th>PH</th>
        <th>PH</th>
    </tr>`

let idsArr = [];



// HOW TO GRAB STUFF
fetch("https://checker-debonair-trigonometry.glitch.me/movies")
    .then(res => res.json())
    .then(data => {
    console.log(data);
    displayMovies(data);
	data.forEach(item => idsArr.push(item.id));
	addEvents(idsArr);
});




//adds event listeners to all edit buttons
function addEvents(num) {
	//TODO change id iteration to match id's from the data instead of incrementing
	idsArr.forEach(num => {
		$(`#edit-${num}`).click(function() {
			showModal();
			currentButton = (this.id).slice(5);
		})
		$(`#delete-${num}`).click(function() {
			currentButton = (this.id).slice(7);
			console.log(currentButton)
			deleteMovie(currentButton);
		})
	})
}


//this function displays the movies
function displayMovies(data) {
    data.forEach(movie => {
        display += `<tr>
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.director}</td>
        <td>${movie.rating}</td>
        <td><button id="edit-${movie.id}">Edit</button></td>
        <td><button id="delete-${movie.id}">Delete</button></td>
    </tr>`
    })



    document.querySelector('#display-movies').innerHTML = display;
}

//function to add movie
function addMovie(director,genre,rating,title) {
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
		.then( response => console.log(response) ) /* review was created successfully */
		.catch( error => console.error(error) ); /* handle errors */

	// startingID++;
}

//function to delete movie
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

//function to edit movie
function editMovie(id,director, genre,rating,title) {
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
		.then( response => console.log(response) ) /* review was created successfully */
		.catch( error => console.error(error) ); /* handle errors */
}

//adding a movie
	$(document).ready(function (){
		$("#addMovie").click(function (){
			var title = $('#addTitle').val();
			var genre = $('#addGenre').val();
			var director = $('#addDirector').val();
			var rating = $('#addRating').val();
			addMovie(director, genre, rating, title);
		});
	});


//save movie
$('#saveMovie').click(function() {
	save(currentButton);
});

function save(id) {
	var title = $('#editTitle').val();
	var genre = $('#editGenre').val();
	var director = $('#editDirector').val();
	var rating = $('#editRating').val();
	editMovie(id, director, genre, rating, title);
}



//MODAL STUFF
closeButton.addEventListener('click', closeModal);

function closeModal() {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
}

function showModal() {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
	overlay.addEventListener('click', closeModal);
}

document.addEventListener('keydown', e => {if(e.key === "Escape") closeModal()});


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