import * as React from "react";
import { useState, useEffect, useRef } from "react";
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

const vectorSubtract = (vector1, vector2) => {
  return {
    x: (vector1.x - vector2.x) * 0.1,
    y: (vector1.y - vector2.y) * 0.1,
  };
};

const vectorAdd = (vector1, vector2) => {
  return {
    x: vector1.x + vector2.x,
    y: vector1.y + vector2.y,
  };
};

const Circle = () => {
  const [pos, setPos] = useState({ x: 200, y: 200 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const ref = useRef({ x: 200, y: 200 });

  const mouseMoveHandler = () => {
    window.addEventListener("mousemove", (e) => {
      setMousePos({
        x: e.offsetX,
        y: e.offsetY,
      });
    });
  };

  const updateVelocity = () => {
    // so the math is mouse position - our position * delta to make it small
    const newVelo = vectorSubtract(mousePos, pos);
    // setVelocity(newVelo);
  };

  useEffect(() => {
    mouseMoveHandler();
  }, []);

  const vectorAwayFromMouse = vectorSubtract(ref.current, mousePos);
  const newVelo = vectorAdd(ref.current, vectorAwayFromMouse);

  const newPos = vectorAdd(ref.current, newVelo);
  ref.current.x = newPos.x;
  ref.current.y = newPos.y;

  return (
    <>
      <text x={250} y={50}>
        {mousePos.x}, {mousePos.y}
      </text>
      <text x={250} y={70}>
        {vectorAwayFromMouse.x}, {vectorAwayFromMouse.y}
      </text>
      <text x={250} y={90}>
        {newVelo.x}, {newVelo.y}
      </text>
      <text x={250} y={110}>
        {ref.current.x}, {ref.current.y}
      </text>
      <circle
        className="circle"
        r={10}
        style={{
          transform: `translate(${ref.current.x}px, ${ref.current.y}px)`,
        }}
      />
      <circle
        r={2}
        style={{ transform: `translate(${newVelo.x}px, ${newVelo.y}px)` }}
      />
    </>
  );
};
