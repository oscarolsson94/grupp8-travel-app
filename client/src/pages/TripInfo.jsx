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
  };

  const handleChange = (e) => {
    setTicketType(e.target.value);
    switch (e.target.value) {
      case "Pensionär":
        setPrice(249);
        break;
      case "Ungdom":
        setPrice(199);
        break;
      case "Vuxen":
        setPrice(399);
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
          <FormControl sx={{ m: 5, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Biljettyp</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-autowidth"
              value={ticketType}
              label="Biljettyp"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value={"Ungdom"}>Ungdom - 199:-</MenuItem>
              <MenuItem value={"Pensionär"}>Pensionär - 249:-</MenuItem>
              <MenuItem value={"Vuxen"}>Vuxen - 399:-</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Typography variant="h5" paddingRight={2}>
              Pris: {price}
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
