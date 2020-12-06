import * as React from "react";
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <svg className="svg">
        <Circle />
      </svg>
    </div>
  );
}

const Circle = () => {
  const [pos, setPos] = useState({ x: 50, y: 0 });

  const mouseMoveHandler = () => {
    window.addEventListener("mousemove", (e) => {
      setPos({
        x: e.offsetX,
        y: e.offsetY,
      });
    });
  };

  React.useEffect(() => {
    // mouseMoveHandler();
  }, []);

  return (
    <circle
      className="circle"
      r={10}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    />
  );
};
