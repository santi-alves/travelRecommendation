const fetchData = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

const getSearchResults = (data, inputElement) => {
  return Object.entries(data).filter((item) =>
    item[0].includes(inputElement.value.trim().toLowerCase())
  );
};

const generateHTMLDynamicContent = () => {
  const searchForm = document.querySelector("#search-form");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchBar = searchForm.querySelector("#search-bar");

    const searchResultsContainer = document.querySelector(
      "#search-results-container"
    );

    const data = await fetchData("travel_recommendation_api.json");

    const searchResults = getSearchResults(data, searchBar);

    if (searchBar.value) {
      if (
        searchBar.value.trim().toLowerCase() === "countries" ||
        searchBar.value.trim().toLowerCase() === "country"
      ) {
        searchResults[0][1].map((countries) =>
          countries.cities.map(
            (city) =>
              (searchResultsContainer.innerHTML += `<div>
          <img
            src="${city.imageUrl}"
            alt="${city.name}" 
          />
          <div>
            <h3>${city.name}</h3>
            <p>${city.description}</p>
            <a href="#" id="visit">Visit</a>
          </div>
        </div>`)
          )
        );
      } else if (searchResults.length > 0) {
        searchResults[0][1].map(
          (place) =>
            (searchResultsContainer.innerHTML += `<div>
          <img
            src="${place.imageUrl}"
            alt="${place.name}"
          />
          <div>
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <a href="#" id="visit">Visit</a>
          </div>
        </div>`)
        );
      }
    }
  });
};

const clearSearchResults = () => {
  const clearBtn = document.querySelector("#clear-btn");

  clearBtn.addEventListener("click", () => {
    const searchResultsContainer = document.querySelector(
      "#search-results-container"
    );

    searchResultsContainer.innerHTML = "";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  generateHTMLDynamicContent();
  clearSearchResults();
});
