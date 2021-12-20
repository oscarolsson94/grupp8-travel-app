import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/helpers";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useHistory } from "react-router-dom";

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
  minHeight: "40vh",
  width: "50%",
  background: "white",
  padding: 20,
  borderRadius: 20,
};

export const TripInfo = () => {
  const [trip, setTrip] = useState();
  const [ticketType, setTicketType] = useState("Vuxen");
  const [price, setPrice] = useState(0);
  const [ticketClass, setTicketClass] = useState("2:a klass");
  const [multiplier, setMultiplier] = useState(1);

  const history = useHistory();

  /*   useEffect(async () => {
    const response = await axios.get(
      `http://localhost:3001/api/planTrip/${id}`
    );
    setTrip(response.data);
  }, []); */

  const handlePurchase = async () => {
    /*     const response = await axios.post(
      `http://localhost:3001/api/bookings/
    ); */
    history.push("/mypages");
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

  return (
    <>
      <div style={heroDivStyle}>
        <Typography variant="h2" color="white">
          Reseinformation
        </Typography>
        <div style={containerStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography paddingRight={2}>Från: Göteborg</Typography>
            <Typography paddingRight={2}>Till: Stockholm</Typography>
            <Typography paddingRight={2}>Avgår: 21/10 - 15:20</Typography>
            <Typography paddingRight={2}>Framme: 21/10 - 15:20</Typography>
          </div>
          <div>
            <FormControl sx={{ m: 5, minWidth: 200 }}>
              <InputLabel>Biljettyp</InputLabel>
              <Select
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
            <Typography variant="h5" paddingRight={2}>
              Pris: {price * multiplier}:-
            </Typography>
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
      </div>
    </>
  );
};
