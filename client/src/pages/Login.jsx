import React from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
    const paperStyle = {
        padding: 20,
        height: "70vh",
        width: 280,
        margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" };
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOpenIcon />
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField
                    label="Username"
                    placeholder="Enter username"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                >
                    Sign in
                </Button>
                <Typography>
                    {" "}
                    Don't have an account?{" "}
                    <Link style={{ textDecoration: "none" }} to={"/register"}>
                        Register
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Login;
