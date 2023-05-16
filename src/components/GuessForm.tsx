import React, { useState } from "react";

type GuessFormProps = {
  onSubmit: (guess: "up" | "down") => void;
};

const GuessForm = ({ onSubmit }: GuessFormProps) => {
  const [guess, setGuess] = useState<"up" | "down">();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guess) {
      onSubmit(guess);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Do you think the stock price will go up or down?
        <select
          value={guess}
          onChange={(e) => setGuess(e.target.value as "up" | "down")}
        >
          <option value="">Please select</option>
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
      </label>
      <button type="submit" disabled={!guess}>
        Submit
      </button>
    </form>
  );
};

export default GuessForm;
