import React, { useState } from "react";

type StockFormProps = {
  onSubmit: ({
    stockSymbol,
    timeWindow,
  }: {
    stockSymbol: string;
    timeWindow: number;
  }) => void;
};

const StockForm = ({ onSubmit }: StockFormProps) => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [timeWindow, setTimeWindow] = useState(7);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ stockSymbol, timeWindow });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Stock Symbol:
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />
      </label>
      <label>
        Time Window:
        <input
          type="number"
          value={timeWindow}
          onChange={(e) => setTimeWindow(Number(e.target.value))}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StockForm;
