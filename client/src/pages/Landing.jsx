import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { TripItem } from "../components/Landing/TripItem";

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
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40vh",
    width: "50%",
    background: "#dfe3ee",
    padding: 20,
    borderRadius: 20,
};

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

    const paddingRight = {
        paddingRight: 20,
    };

    if (!user.token) return <Redirect to="/login" />;

    return (
        <div style={heroDivStyle}>
            <div style={containerStyle}>
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
                        label="From"
                        variant="outlined"
                        onChange={(e) => setFromLocation(e.target.value)}
                    ></TextField>
                    <TextField
                        style={paddingRight}
                        label="To"
                        variant="outlined"
                        onChange={(e) => setToLocation(e.target.value)}
                    ></TextField>
                    <Button
                        endIcon={<SendIcon />}
                        variant="contained"
                        onClick={handleSearch}
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
