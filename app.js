let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendSearchReasult(result) {
    let {
        title,
        link,
        description
    } = result;
    let resultEl = document.createElement('div');
    resultEl.classList.add('result-item');
    searchResultsEl.appendChild(resultEl);
    let resultTitle = document.createElement('a');
    resultTitle.classList.add('result-title');
    resultTitle.textContent = title;
    resultTitle.href = link;
    resultTitle.target = "_blank";
    resultEl.appendChild(resultTitle);

    let titleBreakeElement = document.createElement('br');
    resultEl.appendChild(titleBreakeElement);

    let urlEL = document.createElement('a');
    urlEL.href = link;
    urlEL.target = "_blank";
    urlEL.textContent = link;
    resultEl.appendChild(urlEL);

    let lineBreakeEl = document.createElement('br');
    resultEl.appendChild(lineBreakeEl);

    let descriptionEL = document.createElement('p');
    descriptionEL.classList.add('line-description');
    descriptionEL.textContent = description;
    resultEl.appendChild(descriptionEL);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle('d-none');
    for (let results of searchResults) {
        createAndAppendSearchReasult(results);
    }
}

function searchWekipeadia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        let searchInputValue = searchInputEl.value;
        spinnerEl.classList.toggle('d-none');
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWekipeadia);