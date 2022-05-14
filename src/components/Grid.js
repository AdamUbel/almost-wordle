import React from "react";
import Letter from "./Letter";

function Grid() {
  const rows = [0, 1, 2, 3, 4, 5];
  const letters = [0, 1, 2, 3, 4];

  return (
    <div className="grid">
      {rows.map((row, rowIndx) => (
        <div className="row" key={rowIndx}>
          {letters.map((letter, letterIndx) => (
            <Letter key={letterIndx} letterPos={letter} attempVal={row} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
