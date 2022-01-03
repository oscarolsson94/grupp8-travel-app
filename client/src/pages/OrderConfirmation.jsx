import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import "../styles/generalStyles.css";

export const OrderConfirmation = () => {
  return (
    <div className="heroDivStyle">
      <Typography variant="h2" color="white">
        Orderbekräftelse
      </Typography>
      <div className="containerStyle">
        <Stepper sx={{ width: "100%" }} activeStep={2} alternativeLabel>
          <Step>
            <StepLabel>Sök resa</StepLabel>
          </Step>
          <Step>
            <StepLabel>Anpassa din resa</StepLabel>
          </Step>
          <Step>
            <StepLabel>Orderbekräftelse</StepLabel>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};
