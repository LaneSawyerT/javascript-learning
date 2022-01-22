const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {

  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;
  
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');
  
  const onInput = async event => {
    const items = await fetchData(event.target.value);
  
  // removes the small piece of dropdown menu if click somewhere else
    if(!items.length) {
        dropdown.classList.remove('is-active');
        return;
    }
  
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let item of items) {
      const option = document.createElement('a');
  
      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);
      // once an option is clicked it removes the dropdown
      option.addEventListener('click', () => {
          dropdown.classList.remove('is-active');
          // will put the movie title into the search bar
          inputValue(item);
          onOptionSelect(item);
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
  
  };
  