import React from "react";
import { formatDate } from "../../utils/helpers";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import "../../styles/generalStyles.css";
import { Divider } from "@mui/material";

export const TripItem = ({ trip }) => {
  const history = useHistory();
  return (
    <>
      <div className="tripItemStyle">
        <Typography paddingRight={1} paddingLeft={1}>
          Från: {trip.fromLocation}
        </Typography>
        <Divider
          style={{ background: "white" }}
          orientation="vertical"
          flexItem
        />
        <Typography paddingRight={1} paddingLeft={1}>
          Till: {trip.toLocation}
        </Typography>
        <Divider
          style={{ background: "white" }}
          orientation="vertical"
          flexItem
        />
        <Typography paddingRight={1} paddingLeft={1}>
          Avgår: {formatDate(trip.departureTimeAndDate)}
          {` - ${trip.departureTimeAndDate.substr(11, 5)}`}
        </Typography>
        <Divider
          style={{ background: "white" }}
          orientation="vertical"
          flexItem
        />
        <Typography paddingRight={1} paddingLeft={1}>
          Framme: {formatDate(trip.arrivalTimeAndDate)}
          {` - ${trip.arrivalTimeAndDate.substr(11, 5)}`}
        </Typography>
        <Divider
          style={{ background: "white" }}
          orientation="vertical"
          flexItem
        />
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
