import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatDate } from "../utils/helpers";

export const Landing = () => {
    const { user } = useContext(UserContext);
    const [trips, setTrips] = useState([]);
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");

    const handleSearch = async () => {
        const response = await axios.get(
            `http://localhost:3001/api/planTrip/${fromLocation}/${toLocation}`
        );
        setTrips(response.data);
    };

    if (!user.token) return <Redirect to="/login" />;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
            }}
        >
            <div>
                <TextField
                    label="From"
                    variant="outlined"
                    onChange={(e) => setFromLocation(e.target.value)}
                ></TextField>
                <TextField
                    label="To"
                    variant="outlined"
                    onChange={(e) => setToLocation(e.target.value)}
                ></TextField>
                <Button variant="contained" onClick={handleSearch}>
                    Sök Resa
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {trips.map((trip, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                        }}
                    >
                        <Typography paddingRight={2}>
                            Från: {trip.fromLocation}
                        </Typography>
                        <Typography paddingRight={2}>
                            Till: {trip.toLocation}
                        </Typography>
                        <Typography paddingRight={2}>
                            Avgår: {formatDate(trip.departureTimeAndDate)}{` - ${}`}
                        </Typography>
                        <Typography paddingRight={2}>
                            Framme: {formatDate(trip.arrivalTimeAndDate)}{` - ${}`}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};
