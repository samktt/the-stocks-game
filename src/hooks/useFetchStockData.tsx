import React, { useEffect, useState } from "react";

interface StockPriceData {
  date: string;
  price: number;
}

function useFetchStockData(stockSymbol: string, timeWindow: number) {
  const [data, setData] = useState<StockPriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${apiKey}&outputsize=compact`
        );
        const json = await response.json();
        const data = json["Time Series (Daily)"];
        const prices = Object.keys(data)
          .slice(0, timeWindow)
          .map((date) => ({
            date,
            price: parseFloat(data[date]["4. close"]),
          }))
          .reverse(); // Reverse order to get older dates first
        setData(prices);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [stockSymbol, timeWindow]);

  return { data, isLoading };
}

export default useFetchStockData;
