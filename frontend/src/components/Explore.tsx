import React, {useLayoutEffect, useState } from "react";
import styles from "./Explore.module.scss";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

interface Props {
  setLocations: React.Dispatch<React.SetStateAction<string>>;
}

const Explore = ({setLocations}: Props) => {
  const navigate = useNavigate();
  // making confetti responsive
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
 
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    useLayoutEffect(() => {
      handleSize();
      window.addEventListener("resize", handleSize);
      return () => window.removeEventListener("resize", handleSize);
    }, []);
    return windowSize;
  };

  const { width, height } = useWindowSize();

  function handleClick(location: string) {

  setLocations(location);
  navigate(`/eventslist/`);
  }
  return (
    <div className={styles.Container}>
      <Confetti wind={0.05} width={width} height={height} colors = {["#fc0", "#fb0", "#8B8000"]}/>
      <div className={styles.citySelector}>
        <div className={styles.CitySelectorPrompt}>
          WHERE ARE YOU LOOKING FOR EXPERIENCES?
        </div>
        <div className={styles.CitySelectorCities}>
          <div className={styles.gold1} onClick ={() => handleClick("New York")}> 🗽 NEW YORK </div>
          <div className={styles.gold2} onClick ={() => handleClick("Miami")}> 🌴 MIAMI </div>
          <div className={styles.gold3} onClick ={() => handleClick("Los Angeles County")}> ☀️ LOS ANGELES </div>
          <div className={styles.blue}> 📍 NEAR ME </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
