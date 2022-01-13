import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { combineDateAndTimeIntoISOString } from "../utils/helpers";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
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
import { CircularProgress, Grid } from "@mui/material";
import { SearchContext } from "../contexts/SearchContext";

export const Landing = () => {
  const { user } = useContext(UserContext);
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const [trips, setTrips] = useState(
    searchParams.trips ? searchParams.trips : null
  );
  const [loading, setLoading] = useState(false);

  // Holds searchs results when searching for stations.
  const [fromLocations, setFromLocations] = useState([]);
  const [toLocations, setToLocations] = useState([]);

  // Form values, departure & arrival stations and date & time.
  const [fromLocation, setFromLocation] = useState(
    searchParams.fromLocation || ""
  );
  const [toLocation, setToLocation] = useState(searchParams.toLocation || "");
  const [date, setDate] = useState(searchParams.date || new Date());
  const [time, setTime] = useState(searchParams.time || new Date());
  const [currentTime] = useState(searchParams.time || new Date());
  const [currentDate] = useState(searchParams.date || new Date());


  const canSearchForTrips = () => fromLocation !== "" && toLocation !== "";

  /**
   * Fetch trips from API.
   * @returns Promise
   */
  const handleSearch = async () => {
    setLoading(true);
    let dateTime = combineDateAndTimeIntoISOString(date, time);

    let currentDateTime = combineDateAndTimeIntoISOString(currentDate, currentTime);
    let splitCurrentDate = currentDateTime.split("T");
    let splitSelectedDate = dateTime.split("T");
        
      
    // The past time only check and correct on the same day
    if (splitCurrentDate[0] === splitSelectedDate[0]) {
      console.log("Today date : ", splitCurrentDate[0]);
      console.log("Selected date : ", splitSelectedDate[0]);
    
      if (currentTime.getHours() > time.getHours()) {
        console.log("Current hour : ", currentTime.getHours())
        setTime(currentTime);
        return;
      }
      else if ((currentTime.getHours() === time.getHours()) && (currentTime.getMinutes() > time.getMinutes())) {
        console.log("Current Minutes : ", currentTime.getMinutes())
        setTime(currentTime);
        return;
      }
    }    


    // The submit <Button> is disable if '!canSearchForTrips()' so we don't need another check in the frontend for
    // empty "Från" (fromLocation) and "Till" (toLocation) fields. Additional validation should happen in the backend.
    if (!dateTime) {
      console.error("'dateTime' is falsy", "dateTime:", dateTime, "\ndate:", date, "\ntime:", time);
      alert(`An error occurred! "'dateTime' is falsy", dateTime: ${dateTime}, date: ${date}, time: ${time}`);
      setLoading(false);
      return;
    }

    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_STARTING_URL}api/planTrip/${fromLocation}/${toLocation}/${dateTime}`
      )
      .catch(console.error);

    const tripsSortedByDate = response.data.sort(
      (a, b) =>
        new Date(a.departureTimeAndDate) - new Date(b.departureTimeAndDate)
    );

    setTrips(tripsSortedByDate);
    setSearchParams({
      ...searchParams,
      trips: tripsSortedByDate,
      toLocation,
      fromLocation,
      date,
      time,
    });
    setLoading(false);
  };

  /**
   * Fetch stations from API.
   * @param {string} input the station search term.
   * @param {string} subResource the "sub resource" on the endpoint (i.e. "from" or "to" in /api/stations/[from|to]/stationNameSearchTerm).
   * @param {function} setStateCallback the SetState function to call (i.e. "setFromLocations" or "setToLocations").
   * @returns Promise
   */
  const getStations = async (input, subResource, setStateCallback) => {
    if (input == null || input.length < 1) {
      return;
    }

    try {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND_STARTING_URL}api/stations/${subResource}/${input}`
        )
        .catch((error) => {
          if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.request) {
            console.error(error.request);
          } else {
            console.error("Error", error.message);
          }
          console.error(error.config);
        })
        .then((res) => {
          if (res && res.data.length > 0) {
            setStateCallback(res.data);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const paddingRight = {
    color: "white",
    margin: 10,
  };

  if (!user.token) return <Redirect to="/login" />;

  return (
    <div className="heroDivStyle">
      <Typography variant="h4" color="white">
        Sök resa
      </Typography>
      <div className="containerStyle">
        <div className="inputContainer">
          <Autocomplete
            value={fromLocation}
            disablePortal
            id="combo-box-demo"
            options={fromLocations}
            onInputChange={(e) =>
              e && getStations(e.target.value, "from", setFromLocations)
            }
            onChange={(e, values) => setFromLocation(values ?? "")}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                style={paddingRight}
                autoComplete="on"
                variant="outlined"
                label="Från"
              />
            )}
          />
          <Autocomplete
            value={toLocation}
            disablePortal
            id="combo-box-demo"
            options={toLocations}
            onInputChange={(e) =>
              e && getStations(e.target.value, "to", setToLocations)
            }
            onChange={(e, values) => setToLocation(values ?? "")}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                style={paddingRight}
                autoComplete="on"
                variant="outlined"
                label="Till"
              />
            )}
          />
        </div>
        <div className="inputContainer">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Datum"
              disablePast
              inputFormat="yyyy/MM/dd"
              mask="____/__/__"
              value={date}
              onChange={(date) => setDate(date)}
              renderInput={(params) =>
                <TextField {...params}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ ...params.inputProps, readOnly: true, }}
              />}
            />
            <TimePicker
              ampm={false}
              label="Tid"
              value={time}
              onChange={(time) => setTime(time)}
              renderInput={(params) =>
                <TextField {...params}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ ...params.inputProps, readOnly: true, }}
              />}
            />
          </LocalizationProvider>
        </div>
        <div class="formButton">
          <Button
            endIcon={<SendIcon />}
            variant="contained"
            disabled={!canSearchForTrips()}
            onClick={handleSearch}
            style={{ background: "#FFA5A5" }}
            size="large"
          >
            Sök Resa
          </Button>
        </div>
        {loading && (
          <Grid align="center">
            <CircularProgress color="primary" />
          </Grid>
        )}
      </div>
      {trips && trips.length === 0 && (
        <div
          className="containerStyle"
          style={{
            marginTop: 20,
            justifyContent: "flex-start",
            paddingTop: 10,
          }}
        >
          <Typography>
            Vi hittade tyvärr inga resor på den valda tiden
          </Typography>
        </div>
      )}
      {trips && trips.length > 0 && (
        <div
          className="containerStyle"
          style={{
            marginTop: 20,
            justifyContent: "flex-start",
            paddingTop: 10,
          }}
        >
          {trips.map((trip, i) => (
            <TripItem key={i} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};
