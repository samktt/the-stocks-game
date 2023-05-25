import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { stockSymbols } from "./symbols";
import {
  appContainerStyle,
  stockButtonStyle,
  arrowButtonStyle,
} from "./styles";

interface StockPriceData {
  date: string;
  price: number;
}

function App() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [timeWindow, setTimeWindow] = useState(7);
  const [isHigher, setIsHigher] = useState<boolean | null>(null); // Track the user's guess
  const [lastDataPoint, setLastDataPoint] = useState<StockPriceData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<StockPriceData[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);
  const [rightAnswer, setRightAnswer] = useState(true);

  function addData(chart: any, label: string, data: number) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(data);
      setRightAnswer(
        dataset.data[dataset.data.length - 1] >
          dataset.data[dataset.data.length - 2]
      );
    });
    chart.update();
  }

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
        setLastDataPoint(data[data.length - 1]);
        const chartLabels = data.slice(0, -1).map(({ date }) => date);
        const chartPrices = data.slice(0, -1).map(({ price }) => price);

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

  const handleNewStock = () => {
    const randomIndex = Math.floor(Math.random() * stockSymbols.length);
    const randomStockSymbol = stockSymbols[randomIndex];
    const randomTimeWindow = Math.floor(Math.random() * 99) + 2;
    setStockSymbol(randomStockSymbol.symbol);
    setCompanyName(randomStockSymbol.companyName);
    setTimeWindow(randomTimeWindow);
    setIsHigher(null); // Reset the user's guess
  };

  const handleArrowClick = (up: boolean) => {
    setIsHigher(up);

    if (lastDataPoint) {
      addData(
        chartInstanceRef.current,
        lastDataPoint.date,
        lastDataPoint.price
      );
      setLastDataPoint(null);
    }
  };

  return (
    <div className="App" style={appContainerStyle}>
      <h1 style={{ marginBottom: "40px", marginTop: "60px" }}>
        The Stocks Game
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <button style={stockButtonStyle} onClick={handleNewStock}>
          New Stock
        </button>
        <button style={arrowButtonStyle} onClick={() => handleArrowClick(true)}>
          ⬆
        </button>
        <button
          style={{ ...arrowButtonStyle, backgroundColor: "#bb4430" }}
          onClick={() => handleArrowClick(false)}
        >
          ⬇
        </button>
      </div>

      {stockSymbol && timeWindow && (
        <div style={{ paddingTop: "0px" }}>
          <h1 style={{ margin: "0px" }}>{companyName}</h1>
          <h3>{stockSymbol}</h3>
          <div
            style={{
              backgroundColor:
                isHigher === null
                  ? "#0b132b"
                  : isHigher == rightAnswer
                  ? "green"
                  : "red",
              borderRadius: "10px",
              padding: "0px",
              height: "50vh",
              width: "80vw",
            }}
          >
            {isLoading ? <p>Loading...</p> : <canvas ref={chartRef} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
