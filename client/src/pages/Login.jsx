import React, { useContext, useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);

    const handleLogin = () => {
        axios
            .post("http://localhost:3001/api/auth/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                setUser({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    token: response.data.accessToken,
                });
            })
            .catch(() => {
                alert("invalid email or password");
            });
    };

    const paperStyle = {
        padding: 20,
        height: "70vh",
        width: 280,
        margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" };

    if (user.token) return <Redirect to="/" />;
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
                    label="Email"
                    placeholder="Enter email"
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
                <Button
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={handleLogin}
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
