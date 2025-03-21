import "./styles.css";
import { useState, useEffect } from 'react';

export default function App() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [color, setColor] = useState("lightgreen");
  const [state, setState] = useState("Start");
  const [intervalId, setIntervalId] = useState(null); // To store the interval id

  // Format the time as "MM:SS:SSS"
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000); // 60,000 ms in a minute
    const seconds = Math.floor((milliseconds % 60000) / 1000); // 1000 ms in a second
    const ms = milliseconds % 1000; // Remaining milliseconds

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
  };

  // useEffect to manage the interval when the state changes
  useEffect(() => {
    let id;
    
    if (state === "Stop") {
      // Start the stopwatch
      id = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10ms
      }, 10); // Update every 10 milliseconds
      setIntervalId(id); // Store the interval ID to clear later
    } else if (state === "Start") {
      // Stop the stopwatch
      clearInterval(intervalId); // Stop the interval
    }

    // Cleanup the interval when the component unmounts or state changes
    return () => {
      clearInterval(id);
    };
  }, [state]); // Dependency array is [state], so the effect runs when the state changes

  const handleButtonClick = () => {
    if (state === "Start") {
      setState("Stop");
      setColor("red");
    } else if (state === "Stop") {
      setState("Start");
      setColor("lightgreen");
    }
  };

  const handleReset = () => {
    setState("Start");
    setColor("lightgreen");
    clearInterval(intervalId);
    setTime(0); // Reset time to 0
  };

  return (
    <div className="App">
      <div className="clock">
        <h1>{formatTime(time)}</h1> <br />
        <button
          id="start"
          onClick={handleButtonClick}
          style={{ backgroundColor: color }}
        >
          {state}
        </button>
        <button
          id="reset"
          onClick={handleReset}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
