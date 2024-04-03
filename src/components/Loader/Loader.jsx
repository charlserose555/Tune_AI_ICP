import React, {useState, useEffect} from "react";
import "./Loader.css";
import CircularSpinner from "../Animated/CircularSpinner";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    console.log("dddfdf");

    interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prevProgress => prevProgress + 1);
      } else {
        clearInterval(interval);
      }
    }, 18); // Adjust the interval as needed for the desired speed of progress

    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  return (
    <div className="spinner-container">
      <div className="flex justify-center items-center">        
        <CircularSpinner/>
        <div className="absolute items-center flex justify-center flex-col">
          <img src="/logo.png" style={{width: '48px', height: '54px'}}></img>
          <span style={{fontFamily: "Plus Jakarta Sans", fontWeight:700, fontSize:"16px", lineHeight: "20px", color:"white"}} className="mt-2 text-blue-100">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
