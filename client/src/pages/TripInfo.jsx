import {
  Button,
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

const PRICES = {
  YOUTH: 199,
  ADULT: 399,
  SENIOR: 249,
};

const heroDivStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  minHeight: "60vh",
  width: "50%",
  background: "white",
  padding: 20,
  borderRadius: 20,
};

export const TripInfo = () => {
  const [trip, setTrip] = useState();
  const [ticketType, setTicketType] = useState("");
  const [price, setPrice] = useState(0);
  const [ticketClass, setTicketClass] = useState("");
  const [multiplier, setMultiplier] = useState(1);

  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/planTrip/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setTrip(response.data);
    };

    fetchData();
  }, []);

  const handlePurchase = async () => {
    history.push("/payment");
  };

  const handleChange = (e) => {
    setTicketType(e.target.value);
    switch (e.target.value) {
      case "Pensionär":
        setPrice(PRICES.SENIOR);
        break;
      case "Ungdom":
        setPrice(PRICES.YOUTH);
        break;
      case "Vuxen":
        setPrice(PRICES.ADULT);
        break;
      default:
        setPrice(0);
    }
  };

  if (!user.token) return <Redirect to="/" />;
  return (
    <>
      <div style={heroDivStyle}>
        <Typography variant="h2" color="white">
          Reseinformation
        </Typography>
        {trip && (
          <div style={containerStyle}>
            <Stepper sx={{ width: "100%" }} activeStep={1} alternativeLabel>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography paddingRight={2}>
                Från: {trip.fromLocation}
              </Typography>
              <Typography paddingRight={2}>Till: {trip.toLocation}</Typography>
              <Typography paddingRight={2}>
                Avgår: {formatDate(trip.departureTimeAndDate)}
              </Typography>
              <Typography paddingRight={2}>
                Framme: {formatDate(trip.arrivalTimeAndDate)}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" paddingRight={2}>
                Byten:
              </Typography>
              {trip.stops.map((stop, i) => (
                <div key={i}>
                  <Typography paddingRight={2}>
                    Station: {stop.location}
                  </Typography>
                  <Typography paddingRight={2}>
                    Anländer: {stop.arrivalTime.substr(11, 5)}
                  </Typography>
                  <Typography paddingRight={2}>
                    Avgår: {stop.departureTime.substr(11, 5)}
                  </Typography>
                </div>
              ))}
            </div>
            <div>
              <FormControl
                sx={{
                  m: 5,
                  minWidth: 200,
                }}
              >
                <InputLabel>Biljettyp</InputLabel>
                <Select
                  MenuProps={{ disableScrollLock: true, variant: "menu" }}
                  value={ticketType}
                  label="Biljettyp"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={"Ungdom"}>Ungdom - 199:-</MenuItem>
                  <MenuItem value={"Pensionär"}>Pensionär - 249:-</MenuItem>
                  <MenuItem value={"Vuxen"}>Vuxen - 399:-</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 5, minWidth: 200 }}>
                <InputLabel>Klass</InputLabel>
                <Select
                  MenuProps={{ disableScrollLock: true, variant: "menu" }}
                  value={ticketClass}
                  label="Klass"
                  onChange={(e) => {
                    setTicketClass(e.target.value);
                    if (e.target.value === "1:a klass") {
                      setMultiplier(1.5);
                    } else {
                      setMultiplier(1);
                    }
                  }}
                >
                  <MenuItem value={"1:a klass"}>1:a klass</MenuItem>
                  <MenuItem value={"2:a klass"}>2:a klass</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Typography variant="h5">Pris: {price * multiplier}:-</Typography>
            </div>
            <Button
              endIcon={<CreditScoreIcon />}
              variant="contained"
              onClick={handlePurchase}
              style={{ background: "#FFA5A5" }}
              size="large"
            >
              Gå till betalning
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
