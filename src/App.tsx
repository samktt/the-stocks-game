import React, { useState } from "react";
import StockForm from "./components/StockForm";
import StockData from "./components/StockData";
import GuessForm from "./components/GuessForm";

function App() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [timeWindow, setTimeWindow] = useState(7);
  const [guess, setGuess] = useState<"up" | "down" | null>(null);

  const handleStockSubmit = ({
    stockSymbol,
    timeWindow,
  }: {
    stockSymbol: string;
    timeWindow: number;
  }) => {
    setStockSymbol(stockSymbol);
    setTimeWindow(timeWindow);
    setGuess(null);
  };

  const handleGuessSubmit = (guess: "up" | "down") => {
    setGuess(guess);
  };

  return (
    <div className="App">
      <h1>Stock Price Guessing Game</h1>
      <StockForm onSubmit={handleStockSubmit} />
      {stockSymbol && timeWindow && (
        <div>
          <h2>Stock Data</h2>
          <StockData stockSymbol={stockSymbol} timeWindow={timeWindow} />
          {!guess && <GuessForm onSubmit={handleGuessSubmit} />}
          {guess && <p>Your guess: {guess === "up" ? "Up" : "Down"}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
