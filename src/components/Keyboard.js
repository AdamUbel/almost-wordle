import React from "react";

import Key from "./Key";

function Keyboard() {
  const keyRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyRow3 = ["DEL", "Z", "X", "C", "V", "B", "N", "M", "ENTER"];

  return (
    <div className="keyboard">
      <div className="key-row1">
        {keyRow1.map((key, i) => (
          <Key keyVal={key} key={i} />
        ))}
      </div>
      <div className="key-row2">
        {keyRow2.map((key, i) => (
          <Key keyVal={key} key={i} />
        ))}
      </div>
      <div className="key-row3">
        {keyRow3.map((key, i) => (
          <Key keyVal={key} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
