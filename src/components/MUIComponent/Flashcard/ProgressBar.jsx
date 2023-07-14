import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const ProgressBar = ({ flashcards }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          return 0;
        } else {
          // progress =
          return 50;
        }
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    // <LinearProgress color="secondary" variant="determinate" value={progress} style={{width: '70%', height:'10px'}}></LinearProgress>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box sx={{ width: "40%" }}>
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress}
        />
      </Box>
    </div>
  );
};

export default ProgressBar;
