const tgbtn = document.querySelector("#checkbox");
const body = document.body;
console.log(tgbtn);
console.log(body);

tgbtn.addEventListener('change', () => {
    if(tgbtn.checked){
        body.classList.add("darkMode")
        console.log("dark");
    }else{
        body.classList.remove("darkMode")
        console.log("light");
    }
});



const googleBtn = document.querySelector('.gobtn');
const geminiBtn = document.querySelector('.gebtn');
const wikipediaBtn = document.querySelector('.wibtn');


googleBtn.addEventListener('click', () => search('google'));
geminiBtn.addEventListener('click', () => search('gemini'));
wikipediaBtn.addEventListener('click', () => search('wikipedia'));



async function search(engine) {
    
    const searchInput = document.getElementById("searchInput").value;

    
    let searchResults;

    
    if (engine === 'google') {
        searchResults = await searchGoogle(searchInput);
    } else if (engine === 'gemini') {
        
        searchResults = await searchGemini(searchInput, 'YOUR_GEMINI_API_KEY');
    } else if (engine === 'wikipedia') {
        searchResults = await searchWikipedia(searchInput);
    }


    handleSearchResults(searchResults, engine);
}


async function searchGoogle(query) {
    const apiKey = 'AIzaSyDxsQIY12ReFjt2uX2_uyJgM8E1uq3FllM';
    const cx = 'YOUR_CUSTOM_SEARCH_ENGINE_ID'; 
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.items; 
    } catch (error) {
        console.error('Error fetching data from Google:', error);
        return null;
    }
}


searchGoogle('OpenAI')
    .then(results => {
        console.log(results);
        
    })
    .catch(error => {
        console.error('Error:', error);
    });


async function searchGemini(query, apiKey) {
}


async function searchWikipedia(query) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.query.search;
    } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
        return null;
    }
}


function handleSearchResults(results, engine) {
    if (!results) {
        console.error('No search results found.');
        return;
    }

    console.log(`Search results from ${engine}:`, results);
}