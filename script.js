const apiUrl = 'https://dummyjson.com/quotes';
const quoteList = document.getElementById('listOfQuotes');
const filterInput = document.getElementById('filterInput');
const errorDiv = document.getElementById('error');

async function fetchQuotes() {
    try {
        const response = await fetch(apiUrl);
        if (response.status === 404) {
            throw new Error('Quotes not found');
        } else if (response.status === 500) {
            throw new Error('Server Error');
        } else if (!response.ok) {
            throw new Error('Network Error');
        }

        const data = await response.json();
        return data.quotes;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        errorDiv.textContent = 'Failed to load quotes. Please try again later.';
    }
}

function displayQuotes(quotes) {
    quoteList.innerHTML = ''; // Clear the list 
    quotes.forEach(q => {
        const li = document.createElement('li');
        li.textContent = `${q.quote}`;
        quoteList.appendChild(li);
    });
}

function filterQuotes(quotes) {
    const searchTerm = filterInput.value.toLowerCase();
    const filteredQuotes = quotes.filter(quote => 
        quote.quote.toLowerCase().includes(searchTerm));
    
    if (filteredQuotes.length === 0) {
        quoteList.innerHTML = '<li>No quotes found</li>';
        return;
    }
    displayQuotes(filteredQuotes);
}

async function init() {
    const quotes = await fetchQuotes();
    if (quotes) {
        displayQuotes(quotes);
        filterInput.addEventListener('input', () => filterQuotes(quotes));
    }
}

init();


