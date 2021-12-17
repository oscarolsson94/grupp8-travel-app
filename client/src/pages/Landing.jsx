import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export const Landing = () => {
    const { user } = useContext(UserContext);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "http://localhost:3001/api/planTrip/Göteborg/Stockholm"
            );
            setTrips(response.data);
        };
        fetchData();
    }, []);

    if (!user.token) return <Redirect to="/login" />;

    return (
        <div>
            {trips.map((trip, i) => (
                <>
                    <div>{trip.fromLocation}</div>
                    <div>{trip.toLocation}</div>
                </>
            ))}
        </div>
    );
};
