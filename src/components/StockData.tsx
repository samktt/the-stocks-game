import React, { useEffect, useState } from "react";

type StockDataProps = {
  stockSymbol: string;
  timeWindow: number;
};

const StockData = ({ stockSymbol, timeWindow }: StockDataProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Array<{ date: string; price: number }>>([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timeWindow);
    const endDate = new Date();
    const startDateString = startDate.toISOString().slice(0, 10);
    const endDateString = endDate.toISOString().slice(0, 10);
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${apiKey}&outputsize=compact&startdate=${startDateString}&enddate=${endDateString}`
    )
      .then((response) => response.json())
      .then((json) => {
        const data = json["Time Series (Daily)"];
        const prices = Object.keys(data).map((date) => ({
          date,
          price: parseFloat(data[date]["4. close"]),
        }));
        setData(prices);
        setIsLoading(false);
      });
  }, [stockSymbol, timeWindow]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map(({ date, price }) => (
            <li key={date}>
              {date}: ${price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockData;
