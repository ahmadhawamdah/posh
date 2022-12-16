import React, { useEffect, useState } from "react";

interface Props {
  bgcolor: string;
}

const LoadingBar = ({ bgcolor }: Props) => {
  const element = document.getElementById("element");
  if (element) {
    element.style.opacity = "0";
  }

  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCompleted((progress: number) => progress + 14);
    }, 200);
    if (completed > 70) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [completed]);

  const containerStyles = {
    height: 10,
    width: "100%",
    borderRadius: 50,
    margin: 50,
    transition: "all 2.5s ease-in-out",
    opacity: 1,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  const textStyles = {
    borderRadius: 0,
    fontSize: "14px",
    fontWeight: "500",
    color: "#FFCC00",
  };
  return (
    <div
      className="fadeOut"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-70%, -50%)",
      }}
    >
      <div id="element" style={containerStyles}>
        <div style={textStyles}> FINDING THE BEST EVENTS FOR YOU ...</div>
        <div style={fillerStyles}>
          <span style={labelStyles}></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
