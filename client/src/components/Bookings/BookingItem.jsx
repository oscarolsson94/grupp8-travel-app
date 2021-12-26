import React from "react";
import { formatDate } from "../../utils/helpers";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export const BookingItem = ({ booking }) => {
    const history = useHistory();
    
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#274060",
                    border: "1px solid grey",
                    borderRadius: 10,
                    padding: 2,
                    marginBottom: 2,
                    color: "white",
                }}
            >
                <Typography paddingRight={2}>
                    Från: {booking.fromLocation}
                </Typography>
                <Typography paddingRight={2}>
                    Till: {booking.toLocation}
                </Typography>
                <Typography paddingRight={2}>
                    Avgår: {formatDate(booking.departureTimeAndDate)}
                    {` - ${booking.departureTimeAndDate.substr(11, 5)}`}
                </Typography>
                <Typography paddingRight={2}>
                    Framme: {formatDate(booking.arrivalTimeAndDate)}
                    {` - ${booking.arrivalTimeAndDate.substr(11, 5)}`}
                </Typography>
                <Button
                    onClick={() => history.push(`/bookinginfo/${booking._id}`)}
                    disableElevation
                    style={{ background: "#274060" }}
                    endIcon={<SendIcon />}
                    variant="contained"
                >
                    Gå till resa
                </Button>
            </div>
        </>
    );
};
