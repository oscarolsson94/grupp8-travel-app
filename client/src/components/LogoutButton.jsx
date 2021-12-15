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
        <Grid align="center">
            <Button color="primary" variant="contained" onClick={handleLogout}>
                Sign out
            </Button>
        </Grid>
    );
};
