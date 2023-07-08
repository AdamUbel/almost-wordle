import React from "react";
import Key from "./Key";

// Keyboard component
function Keyboard() {
  // Key rows
  const keyRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyRow3 = ["DEL", "Z", "X", "C", "V", "B", "N", "M", "ENTER"];

  return (
    <div className="keyboard">
      <div className="key-row1">
        {/* Mapping through the keys in keyRow1 */}
        {keyRow1.map((key, i) => (
          <Key keyVal={key} key={i} />
        ))}
      </div>
      <div className="key-row2">
        {/* Mapping through the keys in keyRow2 */}
        {keyRow2.map((key, i) => (
          <Key keyVal={key} key={i} />
        ))}
      </div>
      <div className="key-row3">
        {/* Mapping through the keys in keyRow3 */}
        {keyRow3.map((key, i) => (
          <Key keyVal={key} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
