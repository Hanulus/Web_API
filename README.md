# Web_API

A web application that generates random user profiles with country information, currency exchange rates, and related news headlines.

## Features

- Random user generation with personal details
- Country information including flag, capital, and languages
- Real-time currency exchange rates (USD and KZT)
- Latest news headlines related to the user's country

## Technologies Used

- Node.js
- Express.js
- HTML/CSS/JavaScript
- REST APIs

## APIs Integrated

1. **Random User API** - Generates random user data
2. **REST Countries API** - Provides country information
3. **ExchangeRate API** - Returns currency conversion rates
4. **News API** - Fetches latest news headlines

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Web_API.git
cd Web_API
```

2. Install dependencies:
```bash
npm install
```

3. Get API keys:
   - News API: Register at https://newsapi.org/
   - ExchangeRate API: Register at https://www.exchangerate-api.com/

4. Create a `.env` file in the root directory:
```
NEWSAPI_KEY=your_news_api_key
EXCHANGERATE_KEY=your_exchange_rate_key
```

5. Start the server:
```bash
npm start
```

6. Open your browser and visit:
```
http://localhost:3000
```

## Project Structure
```
Web_API/
├── server.js           # Backend server with API endpoints
├── public/
│   ├── index.html      # Frontend interface
│   ├── style.css       # Styling
│   └── script.js       # Client-side logic
├── .env                # Environment variables (not tracked)
├── .env.example        # Example environment file
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies
└── README.md           # Documentation
```

## Design Decisions

- **Server-side API calls**: All API requests are made on the backend to keep API keys secure and prevent CORS issues
- **Single endpoint**: The `/api/random-user` endpoint fetches all data in one request to improve efficiency
- **Error handling**: Graceful handling of missing data and API failures
- **Responsive design**: Mobile-friendly interface that works on all devices

## Usage

1. Click the "Get Random User" button
2. View user information with profile picture
3. See country details with flag
4. Check currency exchange rates
5. Browse related news articles
