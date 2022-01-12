import {
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { formatDate, formatTime } from "../utils/helpers";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Redirect } from "react-router-dom";
import "../styles/generalStyles.css";

export const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState();
  //const [showStops, setShowStops] = useState(false);

  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("hej");
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_STARTING_URL}api/bookings/single/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log(data);
      setOrderDetails(data);
    };
        fetchData();
  }, [id, user.token]);

  if (!user.token) return <Redirect to="/login" />;


  return (
    <div className="heroDivStyle">
      <Typography variant="h2" color="white">
        Orderbekräftelse
      </Typography>
      {orderDetails && (<div className="containerStyle" style={{ maxHeight: "100vh" }}>
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
        <br />
        <div>
          <br />
          <span>Tack för din bokning {user.firstName}!</span>
        </div>
        <br />
        <Divider flexItem textAlign="left">
          Din bokning
        </Divider>
        <div className="flexSpaceEven">
          <div className="nameVariableColumns" >
            <Typography variant="subtitle1" padding={1}>
              Från: {orderDetails.fromLocation}
            </Typography>
            <Divider flexItem />
            <Typography variant="subtitle1" padding={1}>
              Avgår: {formatDate(orderDetails.departureTimeAndDate)} -
              {formatTime(orderDetails.departureTimeAndDate)}
            </Typography>
            <Divider flexItem />
            <Typography variant="subtitle1" padding={1}>
              Till: {orderDetails.toLocation}
            </Typography>
            <Divider flexItem />
            <Typography variant="subtitle1" padding={1}>
              Framme: {formatDate(orderDetails.arrivalTimeAndDate)} - 
              {formatTime(orderDetails.arrivalTimeAndDate)}
            </Typography>
            <Divider flexItem />
            <Typography variant="subtitle1" padding={1}>
              Resenär: {orderDetails.passengerType} / {orderDetails.ticketClass}
            </Typography>
            <Divider flexItem />
            <Typography variant="subtitle1" padding={1}>
              Pris: {orderDetails.price} sek
            </Typography>
            <Divider flexItem />            
            <Typography variant="subtitle1" padding={1}>
              Bokningsnummer: {orderDetails._id}
            </Typography>
            <Divider flexItem /> 
          </div>
        </div>
        <div>
          <br />
          <span>Din bokning har skickats till {user.email}. Där finns information om resan och hur du betalar din biljett.</span>
          <br />
        </div>        
      </div>
      )}
    </div>
  );
};
