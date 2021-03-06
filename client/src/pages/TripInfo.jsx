import { Button, Divider, FormControl, InputLabel, MenuItem, Select,
  Step, StepLabel, Stepper, Typography, } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { formatDate, formatTime } from "../utils/helpers";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../styles/generalStyles.css";
import { SearchContext } from "../contexts/SearchContext";

const PRICES = {
  YOUTH: 199,
  ADULT: 399,
  SENIOR: 249,
};

export const TripInfo = () => {
  const [trip, setTrip] = useState();
  const [ticketType, setTicketType] = useState("Vuxen");
  const [price, setPrice] = useState(PRICES.ADULT);
  const [ticketClass, setTicketClass] = useState("2:a klass");
  const [multiplier, setMultiplier] = useState(1);
  const [showStops, setShowStops] = useState(false);

  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { setSearchParams } = useContext(SearchContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_STARTING_URL}api/planTrip/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setTrip(data);
    };

    fetchData();
  }, [id, user.token]);

  const sendConfirmationEmail = async (bookingId) => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_STARTING_URL}api/contact`,
      {
        bookingNumber: bookingId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        toLocation: trip.toLocation,
        fromLocation: trip.fromLocation,
        departureDate: formatDate(trip.departureTimeAndDate),
        departureTime: formatTime(trip.departureTimeAndDate),
        arrivalDate: formatDate(trip.arrivalTimeAndDate),
        arrivalTime: formatTime(trip.arrivalTimeAndDate),
        passengerType: ticketType,
        ticketClass: ticketClass,
        price: price * multiplier,
        currentDate: Date(),
        paymentLink: `${window.location.origin}/Payment/${bookingId}`,
      }
    );
  };

  const handlePurchase = async () => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND_STARTING_URL}api/bookings`,
        {
          userEmail: user.email,
          fromLocation: trip.fromLocation,
          toLocation: trip.toLocation,
          departureTimeAndDate: trip.departureTimeAndDate,
          arrivalTimeAndDate: trip.arrivalTimeAndDate,
          passengerType: ticketType,
          ticketClass: ticketClass,
          price: price * multiplier,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      sendConfirmationEmail(res.data._id);
      setSearchParams({});
      history.push(`/OrderConfirmation/${res.data._id}`);
    } catch (error) {
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
    }
  };

  const handleChange = (e) => {
    setTicketType(e.target.value);
    switch (e.target.value) {
      case "Pension??r":
        setPrice(PRICES.SENIOR);
        break;
      case "Ungdom":
        setPrice(PRICES.YOUTH);
        break;
      case "Vuxen":
        setPrice(PRICES.ADULT);
        break;
      default:
        setPrice(0); // should probably throw or print an error here instead.
    }
  };

  if (!user.token) return <Redirect to="/" />;
  return (
    <>
      <div className="heroDivStyle">
        <Typography variant="h2" color="white">
          Reseinformation
        </Typography>
        {trip && (
          <div className="containerStyle" style={{ maxHeight: "100vh" }}>
            <Stepper
              sx={{ width: "100%", marginBottom: "20px" }}
              activeStep={1}
              alternativeLabel
            >
              <Step>
                <StepLabel>S??k resa</StepLabel>
              </Step>
              <Step>
                <StepLabel>Anpassa din resa</StepLabel>
              </Step>
              <Step>
                <StepLabel>Orderbekr??ftelse</StepLabel>
              </Step>
            </Stepper>
            <Divider flexItem textAlign="left">
              Resa
            </Divider>
            <div className="flexSpaceEven">
              <Typography variant="subtitle1" padding={1}>
                Fr??n: {trip.fromLocation}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="subtitle1" padding={1}>
                Till: {trip.toLocation}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="subtitle1" padding={1}>
                Avg??r: {formatDate(trip.departureTimeAndDate)} -
                {formatTime(trip.departureTimeAndDate)}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="subtitle1" padding={1}>
                Framme: {formatDate(trip.arrivalTimeAndDate)} -
                {formatTime(trip.arrivalTimeAndDate)}
              </Typography>
            </div>
            <Divider
              onClick={() => setShowStops(!showStops)}
              flexItem
              textAlign="left"
            >
              {!showStops ? (
                <Typography className="mouseover">
                  {`Visa (${trip.stops.length}) mellanliggande h??llplatser`}
                </Typography>
              ) : (
                <Typography className="mouseover">
                  D??lj mellanliggande h??llplatser
                </Typography>
              )}
            </Divider>
            {showStops && (
              <div className="flexSpaceEven">
                {trip.stops.map((stop, i) => (
                  <div key={i}>
                    <Typography paddingRight={2}>Station {i + 1}</Typography>
                    <Divider flexItem />
                    <Typography paddingRight={2}>
                      Station: {stop.location}
                    </Typography>
                    <Typography paddingRight={2}>
                      Anl??nder: {formatTime(stop.arrivalTime)}
                    </Typography>
                    <Typography paddingRight={2}>
                      Avg??r: {formatTime(stop.departureTime)}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                // width: "80%",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                padding: 10,
              }}
            >
              <FormControl sx={{ minWidth: 200, margin: "10px", }}>
                <InputLabel>Biljettyp</InputLabel>
                <Select
                  MenuProps={{
                    disableScrollLock: true,
                    variant: "menu",
                  }}
                  value={ticketType}
                  label="Biljettyp"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={"Ungdom"}>Ungdom</MenuItem>
                  <MenuItem value={"Pension??r"}>Pension??r</MenuItem>
                  <MenuItem value={"Vuxen"}>Vuxen</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 5, margin: "10px", }}>
                <InputLabel>Klass</InputLabel>
                <Select
                  MenuProps={{
                    disableScrollLock: true,
                    variant: "menu",
                  }}
                  value={ticketClass}
                  label="Klass"
                  onChange={(e) => {
                    setTicketClass(e.target.value);
                    if (e.target.value === "1:a klass") {
                      setMultiplier(1.5);
                    } else {
                      setMultiplier(1);
                    }
                  }}
                >
                  <MenuItem value={"1:a klass"}>1:a klass</MenuItem>
                  <MenuItem value={"2:a klass"}>2:a klass</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Typography align="center" variant="h5">
                Pris: {price * multiplier}:-
              </Typography>
            </div>
            <div className="inputContainer buttonRowSpaceBetween">
              <Button
                endIcon={<KeyboardReturnIcon />}
                variant="contained"
                onClick={() => history.goBack()}
                // style={{ left: -320 }}
                size="large"
              >
                Tillbaka
              </Button>
              <Button
                endIcon={<CreditScoreIcon />}
                variant="contained"
                onClick={handlePurchase}
                style={{ background: "#FFA5A5"/* , left: -75 */ }}
                size="large"
              >
                Boka biljetten
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
