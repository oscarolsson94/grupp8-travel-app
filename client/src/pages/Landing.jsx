import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import TextField from "@mui/material/TextField";

export const Landing = () => {
    const { user } = useContext(UserContext);
    const [trips, setTrips] = useState([]);
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");

    const handleSearch = async () => {
        const response = await axios.get(
            "http://localhost:3001/api/planTrip/Göteborg/Stockholm"
        );
        setTrips(response.data);
    };

    if (!user.token) return <Redirect to="/login" />;

    return (
        <div>
            <TextField label="From" variant="outlined"></TextField>
            <TextField label="To" variant="outlined"></TextField>

            {trips.map((trip, i) => (
                <>
                    <div>{trip.fromLocation}</div>
                    <div>{trip.toLocation}</div>
                </>
            ))}
        </div>
    );
};
