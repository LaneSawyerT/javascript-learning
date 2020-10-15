const fetchData = async searchTerm => {
  const response = await axios.get('https://www.omdbapi.com/', {
    params: {
      apikey: 'e7f4960b',
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
  const movies = await fetchData(event.target.value);

// removes the small piece of dropdown menu if click somewhere else
  if(!movies.length) {
      dropdown.classList.remove('is-active');
      return;
  }

  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const option = document.createElement('a');
    // if film image is not working it wont appear
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;
    // once an option is clicked it removes the dropdown
    option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        // will put the movie title into the search bar
        input.value = movie.Title;
        onMovieSelect(movie);
    });

    resultsWrapper.appendChild(option);
  }
};
// waits for a split second to search so not to overuse the api
input.addEventListener('input', debounce(onInput, 500));

// click anywhere else and the dropdown menu will close
document.addEventListener('click', event => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});

const onMovieSelect = async movie => {
    const response = await axios.get('https://www.omdbapi.com/', {
    params: {
      apikey: 'e7f4960b',
      i: movie.imdbID
    }
  });
    console.log(response.data);
};

const movieTemplate = (movieDetail) => {

};