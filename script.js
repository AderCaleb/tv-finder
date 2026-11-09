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
    console.log(data);
  } catch (error) { // catch receives any error that was thrown.
    console.error(error);
  }
}

loadPopularShows();