import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { BookingItem } from "../components/Bookings/BookingItem";

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

    useEffect(() => {
        const getBookings = async () => {
            const config = {
                headers: { authorization: `Bearer ${user.token}` },
            };

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_STARTING_URL}api/bookings/${user.email}`,
                    config
                );
                setBookings(response.data);
                console.log(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };

        getBookings();
    }, [user]);

    if (!user.token) return <Redirect to="/login" />;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Typography variant="h1" color="white" fontSize={60}>
                Mina Sidor
            </Typography>
            <Typography variant="h2" color="white">
                Mina bokningar
            </Typography>

            {bookings.map((booking, i) => (
                        <BookingItem key={i} booking={booking} />
                    ))}
        </div>
    );
};
