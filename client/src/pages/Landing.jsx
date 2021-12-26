import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { TripItem } from "../components/Landing/TripItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TimePicker from "@mui/lab/TimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import "../styles/generalStyles.css";

export const Landing = () => {
  const { user } = useContext(UserContext);
  const [trips, setTrips] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState(new Date("2021-12-18T21:11:54"));
  const [time, setTime] = useState(new Date("2021-12-18T21:11:54"));

  const handleSearch = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/planTrip/${fromLocation}/${toLocation}`
    );
    setTrips(response.data);
  };

  const paddingRight = {
    paddingRight: 20,
    color: "white",
  };

  if (!user.token) return <Redirect to="/login" />;

  return (
    <div className="heroDivStyle">
      <Typography variant="h2" color="white">
        Sök resa
      </Typography>
      <div className="containerStyle">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextField
            style={paddingRight}
            label="Från"
            variant="outlined"
            onChange={(e) => setFromLocation(e.target.value)}
          ></TextField>
          <TextField
            style={paddingRight}
            label="Till"
            variant="outlined"
            onChange={(e) => setToLocation(e.target.value)}
          ></TextField>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Datum"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={(date) => setDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              ampm={false}
              label="Tid"
              value={time}
              onChange={(time) => setTime(time)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Button
            endIcon={<SendIcon />}
            variant="contained"
            onClick={handleSearch}
            style={{ background: "#FFA5A5" }}
            size="large"
          >
            Sök Resa
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {trips.map((trip, i) => (
            <TripItem key={i} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};
