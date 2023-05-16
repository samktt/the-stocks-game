import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

type StockDataProps = {
  stockSymbol: string;
  timeWindow: number;
};

type StockPriceData = {
  date: string;
  price: number;
};

const StockData = ({ stockSymbol, timeWindow }: StockDataProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<StockPriceData[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

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

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chartLabels = data.map(({ date }) => date);
        const chartPrices = data.map(({ price }) => price);

        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartLabels,
            datasets: [
              {
                label: "Stock Price",
                data: chartPrices,
                borderColor: "#5bc0be",
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "#c7c7d9",
                },
              },
              y: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "#c7c7d9",
                },
              },
            },
            elements: {
              point: {
                borderWidth: 1,
                radius: 0,
                hitRadius: 5,
                hoverRadius: 5,
              },
            },
          },
        });
      }
    }
  }, [data]);

  return (
    <div
      style={{
        background: "#0b132b",
        borderRadius: "10px",
        padding: "0px",
        height: "50vh",
        width: "80vw",
      }}
    >
      {isLoading ? <p>Loading...</p> : <canvas ref={chartRef} />}
    </div>
  );
};

export default StockData;
