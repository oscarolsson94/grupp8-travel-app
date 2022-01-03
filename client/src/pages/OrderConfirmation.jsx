import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { formatDate } from "../utils/helpers";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../styles/generalStyles.css";

export const OrderConfirmation = () => {
  const [trip, setTrip] = useState();
  const [ticketType, setTicketType] = useState("");
  const [price, setPrice] = useState(0);
  const [ticketClass, setTicketClass] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [showStops, setShowStops] = useState(false);

  const history = useHistory();
  const { email } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_STARTING_URL}api/bookings/${email}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setTrip(data);
    };
        fetchData();
  }, [email, user.token]);

  return (
    <div className="heroDivStyle">
      <Typography variant="h2" color="white">
        Orderbekräftelse
      </Typography>
      <div className="containerStyleVertical">
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
              Resa
            </Divider>
            <div className="flexSpaceEven">
              <div className="nameVariableColumns">
                <Typography variant="subtitle1" padding={1}>
                  Från: 
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" padding={1}>
                {trip.fromLocation}
                </Typography>
                <Divider flexItem />
                <Typography variant="subtitle1" padding={1}>             
                Avgår:
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" padding={1}>
                {formatDate(trip.departureTimeAndDate)} -
                {trip.departureTimeAndDate.substr(11, 5)}
                </Typography>
                <Divider flexItem />
                <Typography variant="subtitle1" padding={1}>
                Till:
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" padding={1}>
                {trip.toLocation}
                </Typography>
                <Divider flexItem />
                <Typography variant="subtitle1" padding={1}>
                Framme:
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" padding={1}>
                {formatDate(trip.arrivalTimeAndDate)} -
                {trip.arrivalTimeAndDate.substr(11, 5)}
                </Typography>
              </div>                       
            </div>
      </div>
    </div>
  );
};