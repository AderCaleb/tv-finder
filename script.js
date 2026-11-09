const showSelect = document.getElementById("show-select");
const showDetails = document.getElementById("show-details");

const requestOptions = {
    method: "GET",
    // options.headers carries two headers.
    headers: {
        // accept asks for JSON.
      accept: "application/json",
        // Authorization holds the bearer token, built with a template literal: the word Bearer, a space, then TMDB_TOKEN.
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  };

async function loadShowDetails(id) {
    const url = `https://api.themoviedb.org/3/tv/${id}`;

    try {
        const res = await fetch(url, requestOptions);
        
        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        const show = await res.json();
        displayDetails(show)
    } catch (error) {
        console.log(error);
    }
}

showSelect.addEventListener("change", function () {
    const id = showSelect.value;

    // The if (id === "") check stops a request from being sent when the placeholder is chosen, because its value is an empty string.
    if (id === "") {
        return;
    }

    loadShowDetails(id);
});

// async function marks a function that is allowed to use await.
async function loadPopularShows() {
  const url = "https://api.themoviedb.org/3/tv/popular";

  // try/catch wraps the code that can fail, and
  try {
    // await fetch(url, requestOptions) pauses the function until the response arrives, then continues with the Response object.
    const res = await fetch(url, requestOptions);

    // res.ok is false for statuses outside 200 to 299.
    if (!res.ok) {
        // A throw sends that failure to catch, because fetch() does not reject on a bad status by itself.
      throw new Error(`Request failed with status ${res.status}`);
    }

    // await res.json() parses the body. It also returns a Promise, so it needs await.
    const data = await res.json();
    // data is the entire response object | data.results is just the arry containing the TV shows
    fillDropdown(data.results);
  } catch (error) { // catch receives any error that was thrown.
    console.error(error);
  }
}

// fillDropdown() needs the shows, not the entire folder | That's why when it is called, it needs data.results and not data
function fillDropdown(results) {
    // Clear the dropdown
    showSelect.textContent = "";

    // Create the paceholder option
    const placeholder = document.createElement("option");
    placeholder.textContent = "Select a show";
    placeholder.value = "";
    showSelect.appendChild(placeholder);

    // Create an option for each show
    results.forEach(show => {
        const option = document.createElement("option");
        option.textContent = show.name;
        option.value = show.id;
        showSelect.appendChild(option);
    });
}

function displayDetails(show) {
    // Clear the details
    showDetails.textContent = "";

    // Create the name heading
    const name = document.createElement("h2");
    name.textContent = show.name;
    showDetails.appendChild(name);

    // Create the poster image (if available)
    // If True
    if (show.poster_path) {
        const poster = document.createElement("img");
        poster.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
        poster.alt = `${show.name} poster`;
        showDetails.appendChild(poster);
    } else { // If False/Null
        const noPoster = document.createElement("p");
        noPoster.textContent = "No poster available";
        showDetails.appendChild(noPoster);
    }

    // Display the genres
    const genres = document.createElement("p");
    // .map() method loops through the array and create a new array containing only the genre names
    // .join() method combines the array elements into one string, putting a comma and space between each element.
    genres.textContent = `Genres: ${show.genres.map(genre => genre.name).join(", ")}`;
    showDetails.appendChild(genres);

    // Display number of seasons
    const seasons = document.createElement("p");
    seasons.textContent = `Seasons: ${show.number_of_seasons}`;
    showDetails.appendChild(seasons);

    // Display number of episodes
    const episodes = document.createElement("p");
    episodes.textContent = `Episodes: ${show.number_of_episodes}`;
    showDetails.appendChild(episodes);

    // Display status
    const status = document.createElement("p");
    status.textContent = `Status: ${show.status}`;
    showDetails.appendChild(status);
}

loadPopularShows();