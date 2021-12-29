import {
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { formatDate } from "../utils/helpers";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../styles/generalStyles.css";

const PRICES = {
    YOUTH: 199,
    ADULT: 399,
    SENIOR: 249,
};

export const TripInfo = () => {
    const [trip, setTrip] = useState();
    const [ticketType, setTicketType] = useState("");
    const [price, setPrice] = useState(0);
    const [ticketClass, setTicketClass] = useState("");
    const [multiplier, setMultiplier] = useState(1);

    const history = useHistory();
    const { id } = useParams();
    const { user } = useContext(UserContext);

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

    const handlePurchase = async () => {
        await axios.post(
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
        history.push("/payment");
    };

    const handleChange = (e) => {
        setTicketType(e.target.value);
        switch (e.target.value) {
            case "Pensionär":
                setPrice(PRICES.SENIOR);
                break;
            case "Ungdom":
                setPrice(PRICES.YOUTH);
                break;
            case "Vuxen":
                setPrice(PRICES.ADULT);
                break;
            default:
                setPrice(0);
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
                    <div className="containerStyle">
                        <Stepper
                            sx={{ width: "100%", marginBottom: "20px" }}
                            activeStep={1}
                            alternativeLabel
                        >
                            <Step>
                                <StepLabel>Sök resa</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Anpassa din resa</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Betalning</StepLabel>
                            </Step>
                        </Stepper>
                        <Divider flexItem textAlign="left">
                            Resa
                        </Divider>
                        <div className="flexSpaceEven">
                            <Typography
                                gutterBottom
                                variant="h6"
                                paddingRight={1}
                                paddingLeft={1}
                            >
                                Från: {trip.fromLocation}
                            </Typography>
                            <Divider orientation="vertical" flexItem />
                            <Typography
                                variant="h6"
                                paddingRight={1}
                                paddingLeft={1}
                            >
                                Till: {trip.toLocation}
                            </Typography>
                            <Divider orientation="vertical" flexItem />
                            <Typography
                                variant="h6"
                                paddingRight={1}
                                paddingLeft={1}
                            >
                                Avgår: {formatDate(trip.departureTimeAndDate)}
                            </Typography>
                            <Divider orientation="vertical" flexItem />
                            <Typography
                                variant="h6"
                                paddingRight={1}
                                paddingLeft={1}
                            >
                                Framme: {formatDate(trip.arrivalTimeAndDate)}
                            </Typography>
                        </div>
                        <Divider flexItem textAlign="left">
                            Byten
                        </Divider>
                        <div className="flexSpaceEven">
                            {trip.stops.map((stop, i) => (
                                <div key={i}>
                                    <Typography paddingRight={2}>
                                        Byte {i + 1}
                                    </Typography>
                                    <Divider flexItem />
                                    <Typography paddingRight={2}>
                                        Station: {stop.location}
                                    </Typography>
                                    <Typography paddingRight={2}>
                                        Anländer:{" "}
                                        {stop.arrivalTime.substr(11, 5)}
                                    </Typography>
                                    <Typography paddingRight={2}>
                                        Avgår:{" "}
                                        {stop.departureTime.substr(11, 5)}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                        <div>
                            <FormControl
                                sx={{
                                    m: 5,
                                    minWidth: 200,
                                }}
                            >
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
                                    <MenuItem value={"Ungdom"}>
                                        Ungdom - 199:-
                                    </MenuItem>
                                    <MenuItem value={"Pensionär"}>
                                        Pensionär - 249:-
                                    </MenuItem>
                                    <MenuItem value={"Vuxen"}>
                                        Vuxen - 399:-
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 5, minWidth: 200 }}>
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
                                    <MenuItem value={"1:a klass"}>
                                        1:a klass
                                    </MenuItem>
                                    <MenuItem value={"2:a klass"}>
                                        2:a klass
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Typography variant="h5">
                                Pris: {price * multiplier}:-
                            </Typography>
                        </div>
                        <Button
                            endIcon={<CreditScoreIcon />}
                            variant="contained"
                            onClick={handlePurchase}
                            style={{ background: "#FFA5A5" }}
                            size="large"
                        >
                            Gå till betalning
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};
