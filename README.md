# the-stocks-game

Can you predict stock prices based on a short window of historical data?
This is a simple web application that allows players to guess whether the stock price of a randomly selected company will go up or down over a given time period.

## Features

- Fetches historical stock price data from the Alpha Vantage API.
- Displays historical stock price data as a chart using the Chart.js library.
- Allows users to submit their guess as to whether the stock price will go up or down in the future.

## Tech Stack

- React.js for building the user interface.
- TypeScript for type checking.
- Chart.js for displaying the stock price data as a chart.
  Alpha Vantage API for fetching historical stock price data.

## How to run the app

1. Clone the repository to your local machine.
2. Run npm install to install the dependencies.
3. Obtain an Alpha Vantage API key from https://www.alphavantage.co/support/#api-key
4. Create a .env file in the project root and add the following line, replacing YOUR_API_KEY with your Alpha Vantage API key:
   makefile

```
REACT_APP_ALPHA_VANTAGE_API_KEY=YOUR_API_KEY
```

5. Run npm start to start the development server.
6. Open http://localhost:3000 in your browser to view the app.
