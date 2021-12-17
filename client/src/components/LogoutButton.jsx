import { Button, Grid } from "@material-ui/core";
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
        <Grid align="center" style={{ paddingRight: 20 }}>
            <Button
                style={{ color: "white", borderColor: "white" }}
                variant="outlined"
                onClick={handleLogout}
            >
                Logga ut
            </Button>
        </Grid>
    );
};
