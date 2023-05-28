import React, { useState } from "react";
import { stockSymbols } from "./symbols";
import Button from "./components/Button";
import useChartInstance from "./hooks/useChartInstance";
import useFetchStockData from "./hooks/useFetchStockData";

function App() {
  const [randomStockSymbol, setRandomStockSymbol] = useState(stockSymbols[0]);
  const [timeWindow, setTimeWindow] = useState(0);
  const [isHigher, setIsHigher] = useState<boolean | null>(null); // Track the user's guess
  const [rightAnswer, setRightAnswer] = useState(true);

  const { data, isLoading } = useFetchStockData(
    randomStockSymbol.symbol,
    timeWindow
  );
  const { chartRef, chartInstanceRef } = useChartInstance(data);

  const handleNewStock = () => {
    const randomIndex = Math.floor(Math.random() * stockSymbols.length);
    setRandomStockSymbol(stockSymbols[randomIndex]);
    const randomTimeWindow = Math.floor(Math.random() * 99) + 2;

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

  //add latest datapoint to graph after guess made
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

  //changes bg color to reflect correct or wrong answer
  const backgroundColor =
    isHigher === null ? "#0b132b" : isHigher === rightAnswer ? "green" : "red";

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#1c2541",
        color: "#c7c7d9",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
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

      {randomStockSymbol.symbol !== "" && timeWindow !== 0 && (
        <div style={{ paddingTop: "0px" }}>
          <h1 style={{ margin: "0px" }}>{randomStockSymbol.companyName}</h1>
          <h3 style={{ marginTop: "0px" }}>{randomStockSymbol.symbol}</h3>
          <div
            style={{
              backgroundColor:
                isHigher === null
                  ? "#0b132b"
                  : isHigher === rightAnswer
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
