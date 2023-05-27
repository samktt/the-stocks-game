import React, { useEffect, useState, useRef } from "react";
import { stockSymbols } from "./symbols";
import { appContainerStyle } from "./styles";
import Button from "./components/Button";
import useChartInstance from "./hooks/useChartInstance";
import useFetchStockData from "./hooks/useFetchStockData";

function App() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [timeWindow, setTimeWindow] = useState(0);
  const [isHigher, setIsHigher] = useState<boolean | null>(null); // Track the user's guess
  const [rightAnswer, setRightAnswer] = useState(true);
  const { data, isLoading } = useFetchStockData(stockSymbol, timeWindow);
  const { chartRef, chartInstanceRef } = useChartInstance(data);

  function addData(chart: any, label: string, data: number) {
    console.log(label);
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
    if (data[data.length - 1]) {
      addData(
        chartInstanceRef.current,
        data[data.length - 1].date,
        data[data.length - 1].price
      );
    }
  };

  return (
    <div className="App" style={appContainerStyle}>
      <h1 style={{ marginBottom: "40px", marginTop: "60px" }}>
        The Stocks Game
      </h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button onClick={handleNewStock}>New Stock</Button>
        <Button
          onClick={() => handleArrowClick(true)}
          width="50px"
          backgroundColor="#748e54"
        >
          ⬆
        </Button>
        <Button
          onClick={() => handleArrowClick(false)}
          width="50px"
          backgroundColor="#bb4430"
        >
          ⬇
        </Button>
      </div>

      {stockSymbol && timeWindow && (
        <div style={{ paddingTop: "0px" }}>
          <h1 style={{ margin: "0px" }}>{companyName}</h1>
          <h3 style={{ marginTop: "0px" }}>{stockSymbol}</h3>
          <div
            style={{
              backgroundColor:
                isHigher === null
                  ? "#0b132b"
                  : isHigher == rightAnswer
                  ? "green"
                  : "red",
              borderRadius: "10px",
              padding: "10px",
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
