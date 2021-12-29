import React, { useContext, useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { user } = useContext(UserContext);

    const paperStyle = {
        padding: 20,
        height: "70vh",
        width: 280,
        margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" };

    const handleRegister = () => {
        setLoading(true);
        if (password === confirmPassword) {
            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_STARTING_URL}api/auth/register`,
                    {
                        firstName,
                        lastName,
                        email,
                        password,
                    }
                )
                .then(() => {
                    console.log("account created");
                    setLoading(false);
                    history.push("/login");
                });
        } else {
            setLoading(false);
            alert("passwords do not match, try again");
        }
    };

    if (user.token) return <Redirect to="/" />;
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
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last name"
                    placeholder="Enter last name"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    placeholder="Enter email address"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {loading && (
                    <Grid align="center">
                        <CircularProgress color="primary" />
                    </Grid>
                )}
                <Button
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={handleRegister}
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
