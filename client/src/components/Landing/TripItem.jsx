import React from "react";
import { formatDate } from "../../utils/helpers";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

export const TripItem = ({ trip }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#1976D2",
                border: "1px solid grey",
                borderRadius: 10,
                padding: 2,
                marginBottom: 2,
                color: "white",
            }}
        >
            <Typography paddingRight={2}>Från: {trip.fromLocation}</Typography>
            <Typography paddingRight={2}>Till: {trip.toLocation}</Typography>
            <Typography paddingRight={2}>
                Avgår: {formatDate(trip.departureTimeAndDate)}
                {` - ${trip.departureTimeAndDate.substr(11, 5)}`}
            </Typography>
            <Typography paddingRight={2}>
                Framme: {formatDate(trip.arrivalTimeAndDate)}
                {` - ${trip.departureTimeAndDate.substr(11, 5)}`}
            </Typography>
            <Button disableElevation endIcon={<SendIcon />} variant="contained">
                Köp biljett
            </Button>
        </div>
    );
};
