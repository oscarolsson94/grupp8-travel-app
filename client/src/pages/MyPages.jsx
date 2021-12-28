import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { BookingItem } from "../components/Bookings/BookingItem";

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
    background: "#5899E2",
    padding: 20,
    borderRadius: 20,
};

export const MyPages = () => {
    const { user } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {
        const config = {
            headers: { authorization: `Bearer ${user.token}` },
        };

        const response = await axios.get(`api/bookings/${user.email}`, config);
        setBookings(response.data);
        console.log(response.data);
    };

    console.log("hello");

    useEffect(() => {
        getBookings();
    }, []);

    if (!user.token) return <Redirect to="/login" />;

    return (
        <div>
            <Typography variant="h1" color="white">
                Mina Sidor
            </Typography>
            <Typography variant="h2" color="white">
                Mina bokningar
            </Typography>
            <div style={containerStyle}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {bookings.map((booking, i) => (
                        <BookingItem key={i} booking={booking} />
                    ))}
                </div>
            </div>
        </div>
    );
};
