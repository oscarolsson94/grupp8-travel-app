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

  return (
    <div className="heroDivStyle">
      <Typography variant="h2" color="white">
        Orderbekräftelse
      </Typography>
      {orderDetails && (<div className="containerStyle">
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
        <Divider flexItem textAlign="left">
          Din bokning
        </Divider>
        <div className="flexSpaceEven">
          <div className="nameVariableColumns">
            <Typography variant="subtitle1" padding={1}>
              Från:
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1" padding={1}>
              {orderDetails.fromLocation}
            </Typography>
            <Divider flexItem />
            <Typography variant="subtitle1" padding={1}>
              Avgår:
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1" padding={1}>
              {formatDate(orderDetails.departureTimeAndDate)} -
              {formatTime(orderDetails.departureTimeAndDate)}
            </Typography>
            <Divider flexItem />
            <Typography variant="subtitle1" padding={1}>
              Till:
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1" padding={1}>
              {orderDetails.toLocation}
            </Typography>
            <Divider flexItem />
            <Typography variant="subtitle1" padding={1}>
              Framme:
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1" padding={1}>
              {formatDate(orderDetails.arrivalTimeAndDate)} -
              {formatTime(orderDetails.arrivalTimeAndDate)}
            </Typography>
          </div>
        </div>
      </div>
      )}

    </div>
  );
};
