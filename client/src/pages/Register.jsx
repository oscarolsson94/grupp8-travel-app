import React from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
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
                        <HowToRegIcon />
                    </Avatar>
                    <h2>Register</h2>
                </Grid>
                <TextField
                    label="First name"
                    placeholder="Enter first name"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                />
                <TextField
                    label="Last name"
                    placeholder="Enter last name"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                />
                <TextField
                    label="Email"
                    placeholder="Enter email address"
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
                <TextField
                    label="Confirm Password"
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
                    Register
                </Button>
                <Typography>
                    {" "}
                    Already have an account?{" "}
                    <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Sign in
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Register;
