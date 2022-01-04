import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import "../styles/generalStyles.css";

export const Contact = () => {
  return (
    <div className="heroDivStyle">
      <Typography variant="h2" color="white">
        Tack för din bokning!
      </Typography>
      <div className="containerStyle">
         <Stepper sx={{ width: "100%" }} activeStep={3} alternativeLabel>
          <Step>
            <StepLabel>Sök resa</StepLabel>
          </Step>
          <Step>
            <StepLabel>Anpassa din resa</StepLabel>
          </Step>
          <Step>
            <StepLabel>Bokning</StepLabel>
          </Step>
  </Stepper>
      </div>
    </div>
  );
};
