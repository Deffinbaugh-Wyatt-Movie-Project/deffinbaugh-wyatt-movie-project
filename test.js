async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=bfd6b563`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data.Search);
    // if(data.Response == "True") displayMovieList(data.Search);
}

loadMovies("Star Wars: Episode 1");