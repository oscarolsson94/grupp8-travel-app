import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const BookingInfo = () => {
    const { user } = useContext(UserContext);

    if (!user.token) return <Redirect to="/login" />;

    return <h2>Bokningsinformation</h2>;
};
