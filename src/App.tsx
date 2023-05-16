import React, { useState } from "react";
import StockData from "./components/StockData";
import { stockSymbols } from "./symbols";

function App() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [timeWindow, setTimeWindow] = useState(7);

  const handleNewStock = () => {
    const randomIndex = Math.floor(Math.random() * stockSymbols.length);
    const randomStockSymbol = stockSymbols[randomIndex];
    const randomTimeWindow = Math.floor(Math.random() * 99) + 2;
    setStockSymbol(randomStockSymbol.symbol);
    setCompanyName(randomStockSymbol.companyName);
    setTimeWindow(randomTimeWindow);
  };

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
      <h1
        style={{
          marginBottom: "40px",
          marginTop: "60px",
        }}
      >
        The Stocks Game
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            backgroundColor: "#508991",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            width: "200px",
            height: "50px",
          }}
          onClick={handleNewStock}
        >
          New Stock
        </button>
        <button
          style={{
            marginLeft: "10px",
            backgroundColor: "#748e54",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            width: "50px",
            height: "50px",
          }}
          onClick={() => console.log("up")}
        >
          ⬆
        </button>
        <button
          style={{
            marginLeft: "10px",
            backgroundColor: "#bb4430",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            width: "50px",
            height: "50px",
          }}
          onClick={() => console.log("down")}
        >
          ⬇
        </button>
      </div>

      {stockSymbol && timeWindow && (
        <div style={{ paddingTop: "0px" }}>
          <h1 style={{ margin: "0px" }}>{companyName}</h1>
          <h3>{stockSymbol}</h3>
          <StockData stockSymbol={stockSymbol} timeWindow={timeWindow} />
        </div>
      )}
    </div>
  );
}

export default App;
