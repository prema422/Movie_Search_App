const apiKey ="http://www.omdbapi.com/?i=tt3896198&apikey=e8cfff44";

async function searchMovie(){
    const movieName = document.getElementById("movieInput").value.trim();
    const moviesContainer = document.getElementById("movies");

    if(movieName === "") return;

    moviesContainer.innerHTML = "Loading...";

    try{
        const response = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`);
        const data = await response.json();

        if(data.Response === "False"){
            moviesContainer.innerHTML = "<p>No movies found!</p>";
            return;
        }

        moviesContainer.innerHTML = "";

        data.Search.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";

            movieCard.innerHTML = `
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x280"}">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <p>Type: ${movie.Type}</p>
            `;

            moviesContainer.appendChild(movieCard);
        });

    } catch(error){
        moviesContainer.innerHTML = "<p>Error fetching data!</p>";
    }
}
