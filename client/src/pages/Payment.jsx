import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import PaymentForm from "../components/Bookings/PaymentForm";
import "../styles/generalStyles.css";

export const Payment = () => {
  return (
    <div className="heroDivStyle">
      <Typography variant="h2" color="white">
        Betalning
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
            <StepLabel>Betalning</StepLabel>
          </Step>
        </Stepper>
      </div>
      <div className="paymentform">
        <PaymentForm/>
      </div>
    </div>
  );
};
