import React, { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';

const ProgressBar = ({flashcards}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          return 0;
        }
        else {
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
    <LinearProgress color="secondary" variant="determinate" value={progress} style={{width: '50em', height:'10px'}}></LinearProgress>
  );
};

export default ProgressBar;