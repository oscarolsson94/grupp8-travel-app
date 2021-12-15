import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const Landing = () => {
    const { user } = useContext(UserContext);

    if (!user.token) return <Redirect to="/login" />;
    return <div>LANDING PAGE</div>;
};
