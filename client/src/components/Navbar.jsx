import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

const navStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    width: "100%",
    background: "#dfe3ee",
    padding: 10,
    color: "#3F51B5",
};

export const Navbar = () => {
    return (
        <div style={navStyles}>
            <div>
                <Typography variant="h4">Travel With Us</Typography>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Link
                    style={{
                        paddingRight: 20,
                        textDecoration: "none",
                        color: "#3F51B5",
                    }}
                    to={"/mypages"}
                >
                    <Typography>Mina sidor</Typography>
                </Link>
                <LogoutButton />
            </div>
        </div>
    );
};