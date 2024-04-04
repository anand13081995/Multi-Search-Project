function fetchDataFromWikipedia(searchTerm) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const callbackName = 'jsonpCallback';

        window[callbackName] = function (data) {
            resolve(data.query.search);
            document.body.removeChild(script);
            delete window[callbackName];
        };

        script.src = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&callback=${callbackName}`;
        document.body.appendChild(script);
    });
}

function displaySearchResultsInSameTab(searchResults) {
    let outputHTML = '';

    searchResults.forEach(result => {
        const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
        outputHTML += `<p><a href="${url}" target="_blank">${result.title}</a></p>`;
    });


    document.documentElement.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wiki Search Results</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="hbox">
                <h1>Search Results</h1>
                <div id="output">${outputHTML}</div>
            </div>
            <button id="backButton">Back to Main Page</button>
        </body>
        </html>
    `;

    
    document.getElementById('backButton').addEventListener('click', function() {
        
        window.location.href = 'index.html'; 
    });
}


document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm !== '') {
        fetchDataFromWikipedia(searchTerm)
            .then(displaySearchResultsInSameTab)
            .catch(error => console.error('Error:', error));
    }
});
