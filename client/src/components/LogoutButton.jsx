import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const LogoutButton = () => {
    const { setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser({
            firstName: "",
            lastName: "",
            email: "",
            token: "",
        });
    };
    return (
        <button className="logout" onClick={handleLogout}>
            Logout
        </button>
    );
};
