import React, { useContext } from "react";

import { AppContext } from "../App";

const Letter = ({ letterPos, attempVal }) => {
  const { grid, gridColor, currPosition } = useContext(AppContext);
  const { selectedRow } = currPosition;

  const letter = grid[attempVal][letterPos];

  const letterColor = gridColor[attempVal][letterPos];

  return (
    <div className="letter" id={selectedRow > attempVal ? letterColor : ""}>
      {letter}
    </div>
  );
};

export default Letter;
