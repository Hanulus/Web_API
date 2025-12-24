const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Get random user with all related data
app.get('/api/random-user', async (req, res) => {
    try {
        // Fetch random user
        const userResponse = await fetch('https://randomuser.me/api/');
        const userData = await userResponse.json();
        const user = userData.results[0];

        // Extract user info
        const userInfo = {
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            picture: user.picture.large,
            age: user.dob.age,
            dateOfBirth: user.dob.date.split('T')[0],
            city: user.location.city,
            country: user.location.country,
            address: `${user.location.street.number} ${user.location.street.name}`
        };

        // Fetch country data
        const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${userInfo.country}?fullText=true`);
        const countryData = await countryResponse.json();
        const country = countryData[0];

        const countryInfo = {
            name: country.name.common,
            capital: country.capital ? country.capital[0] : 'N/A',
            languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
            currency: country.currencies ? Object.keys(country.currencies)[0] : 'N/A',
            currencyName: country.currencies ? Object.values(country.currencies)[0].name : 'N/A',
            flag: country.flags.png
        };

        // Fetch exchange rates
        const currencyCode = countryInfo.currency;
        const exchangeResponse = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_KEY}/latest/${currencyCode}`);
        const exchangeData = await exchangeResponse.json();

        const exchangeRates = {
            currency: currencyCode,
            toUSD: exchangeData.conversion_rates?.USD || 'N/A',
            toKZT: exchangeData.conversion_rates?.KZT || 'N/A'
        };

        // Fetch news
        const newsResponse = await fetch(
            `https://newsapi.org/v2/everything?q=${userInfo.country}&language=en&pageSize=5&apiKey=${process.env.NEWSAPI_KEY}`
        );
        const newsData = await newsResponse.json();

        const news = newsData.articles?.slice(0, 5).map(article => ({
            title: article.title,
            description: article.description,
            image: article.urlToImage,
            url: article.url
        })) || [];

        res.json({
            user: userInfo,
            country: countryInfo,
            exchange: exchangeRates,
            news: news
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
