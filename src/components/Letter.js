import React, { useContext } from "react";
import { AppContext } from "../App";

// Letter component
const Letter = ({ letterPos, attempVal }) => {
  // Accessing relevant states from AppContext using useContext hook
  const { grid, gridColor, currPosition } = useContext(AppContext);
  const { selectedRow } = currPosition;

  // Getting the letter and its color from the grid and gridColor arrays
  const letter = grid[attempVal][letterPos];
  const letterColor = gridColor[attempVal][letterPos];

  return (
    <div className="letter" id={selectedRow > attempVal ? letterColor : ""}>
      {letter}
    </div>
  );
};

export default Letter;
