import React, { useState, useEffect } from "react";
import { flushSync } from "react-dom";

const UpToTopButton = () => {
  const [upButton, setUpButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setUpButton(true);
      } else {
        setUpButton(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {upButton && (
        <i
          class="fa-solid fa-up-long"
          style={{
            color: "white",
            backgroundColor: "rgb(0, 110, 255)",
            borderRadius: "50%",
            padding: "10px",
            position: "fixed",
            bottom: "50px",
            right: "50px",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            fontSize: "20px",
          }}
          onClick={scrollUp}
        ></i>
      )}
    </>
  );
};

export default UpToTopButton;
