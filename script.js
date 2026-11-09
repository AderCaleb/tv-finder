const showSelect = document.getElementById("show-select");

// async function marks a function that is allowed to use await.
async function loadPopularShows() {
  const url = "https://api.themoviedb.org/3/tv/popular";

  const options = {
    method: "GET",
    // options.headers carries two headers.
    headers: {
        // accept asks for JSON.
      accept: "application/json",
        // Authorization holds the bearer token, built with a template literal: the word Bearer, a space, then TMDB_TOKEN.
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  };

//   try/catch wraps the code that can fail, and
  try {
    // await fetch(url, options) pauses the function until the response arrives, then continues with the Response object.
    const res = await fetch(url, options);

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

loadPopularShows();