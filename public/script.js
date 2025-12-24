const getUserBtn = document.getElementById('getUserBtn');
const loading = document.getElementById('loading');
const content = document.getElementById('content');

getUserBtn.addEventListener('click', fetchRandomUser);

async function fetchRandomUser() {
    loading.classList.remove('hidden');
    content.classList.add('hidden');
    
    try {
        const response = await fetch('/api/random-user');
        const data = await response.json();
        
        displayUserData(data);
        
        loading.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
        loading.classList.add('hidden');
        alert('Failed to fetch user data. Please try again.');
    }
}

function displayUserData(data) {
    // User info
    document.getElementById('userPhoto').src = data.user.picture;
    document.getElementById('userName').textContent = `${data.user.firstName} ${data.user.lastName}`;
    document.getElementById('userGender').textContent = data.user.gender;
    document.getElementById('userAge').textContent = data.user.age;
    document.getElementById('userDob').textContent = data.user.dateOfBirth;
    document.getElementById('userLocation').textContent = `${data.user.city}, ${data.user.country}`;
    document.getElementById('userAddress').textContent = data.user.address;
    
    // Country info
    document.getElementById('countryFlag').src = data.country.flag;
    document.getElementById('countryName').textContent = data.country.name;
    document.getElementById('countryCapital').textContent = data.country.capital;
    document.getElementById('countryLanguages').textContent = data.country.languages;
    document.getElementById('countryCurrency').textContent = `${data.country.currencyName} (${data.country.currency})`;
    
    // Exchange rates
    document.getElementById('exchangeUSD').textContent = `1 ${data.exchange.currency} = ${data.exchange.toUSD} USD`;
    document.getElementById('exchangeKZT').textContent = `1 ${data.exchange.currency} = ${data.exchange.toKZT} KZT`;
    
    // News
    displayNews(data.news);
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        
        newsCard.innerHTML = `
            ${article.image ? `<img src="${article.image}" alt="News image">` : ''}
            <div class="news-content">
                <h4>${article.title}</h4>
                <p>${article.description || 'No description available'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `;
        
        newsContainer.appendChild(newsCard);
    });
}
