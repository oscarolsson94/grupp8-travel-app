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

export const Landing = () => {
    const { user } = useContext(UserContext);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);

    // Holds searchs results when searching for stations.
    const [fromLocations, setFromLocations] = useState([]);
    const [toLocations, setToLocations] = useState([]);
    
    // Form values, departure & arrival stations and date & time.
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    

    const handleSearch = async () => {
        setLoading(true);
        let dateTime = combineDateAndTimeIntoISOString(date, time);

        if (!fromLocation || fromLocation === "" || !toLocation || toLocation === "" || !dateTime) {
            console.log(fromLocation, toLocation, dateTime);
            alert("An error occurred, departure station, arrival station and/or datetime weren't set propertly.");
            return;
        }

        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_STARTING_URL}api/planTrip/${fromLocation}/${toLocation}/${dateTime}`
        ).catch(console.error);

        const tripsSortedByDate = response.data.sort(
            (a, b) => new Date(a.departureTimeAndDate) - new Date(b.departureTimeAndDate)
        );

        setTrips(tripsSortedByDate);
        setLoading(false);
    };

    /**
     * Fetch stations from API.
     * @param {string} input the station search term.
     * @param {string} subResource the "sub resource" on the endpoint (i.e. "from" or "to" in /api/stations/[from|to]/stationNameSearchTerm).
     * @param {function} setStateCallback the SetState function to call (i.e. "setFromLocations" or "setToLocations").
     * @returns void
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
                .catch(error => {
                    if (error.response) {
                        console.error(error.response.data);
                        console.error(error.response.status);
                        console.error(error.response.headers);
                    } else if (error.request) {
                        console.error(error.request);
                    } else {
                        console.error('Error', error.message);
                    }
                    console.error(error.config);
                })
                .then(res => {    
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
                {/* <div> */}
                    
                <div className="inputContainer">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={fromLocations}
                        onInputChange={(e) => getStations(e.target.value, "from", setFromLocations)}
                        onChange={(e, values) => setFromLocation(values ?? "")}
                        sx={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField {...params}
                                style={paddingRight}
                                autoComplete="on"
                                variant="outlined"
                                // defaultValue=""
                                label="Från"
                            />
                        }
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={toLocations}
                        onInputChange={(e) => getStations(e.target.value, "to", setToLocations)}
                        onChange={(e, values) => setToLocation(values ?? "")}
                        sx={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField {...params}
                                style={paddingRight}
                                autoComplete="on"
                                variant="outlined"
                                label="Till"
                            />
                        }
                    />
                </div>
                <div className="inputContainer">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Datum"
                            inputFormat="yyyy/MM/dd"
                            mask="____/__/__"
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
                        marginTop: 10,
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
                {loading && (
                    <Grid align="center">
                        <CircularProgress color="primary" />
                    </Grid>
                )}
            </div>
            {
                trips.length > 0 && (
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
                )
            }
            {/* </div> */}
        </div >
    );
};
