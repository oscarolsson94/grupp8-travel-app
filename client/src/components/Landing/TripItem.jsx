import React from "react";
import { formatDate } from "../../utils/helpers";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import "../../styles/generalStyles.css";

export const TripItem = ({ trip }) => {
  const history = useHistory();
  return (
    <>
      <div className="tripItemStyle">
        <Typography paddingRight={2}>Från: {trip.fromLocation}</Typography>
        <Typography paddingRight={2}>Till: {trip.toLocation}</Typography>
        <Typography paddingRight={2}>
          Avgår: {formatDate(trip.departureTimeAndDate)}
          {` - ${trip.departureTimeAndDate.substr(11, 5)}`}
        </Typography>
        <Typography paddingRight={2}>
          Framme: {formatDate(trip.arrivalTimeAndDate)}
          {` - ${trip.arrivalTimeAndDate.substr(11, 5)}`}
        </Typography>
        <Button
          onClick={() => history.push(`/tripinfo/${trip._id}`)}
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
