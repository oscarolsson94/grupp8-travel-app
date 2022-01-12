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
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const handleLogin = () => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_STARTING_URL}api/auth/login`,
                {
                    email: email,
                    password: password,
                }
            )
            .then((response) => {
                setUser({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    token: response.data.accessToken,
                });
                setLoading(false);
                history.push("/");
            })
            .catch(() => {
                setLoading(false);
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

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOpenIcon />
                    </Avatar>
                    <h2>Logga in</h2>
                </Grid>
                <TextField
                    label="E-post"
                    placeholder="Mata in din e-post adress"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Lösenord"
                    placeholder="Mata in ditt lösenord"
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
                    Logga in
                </Button>
                {loading && (
                    <Grid align="center">
                        <CircularProgress color="primary" />
                    </Grid>
                )}
                <Typography>
                    {" "}
                    Har du inte ett konto?{" "}
                    <Link style={{ textDecoration: "none" }} to={"/register"}>
                        Registrera ett nytt konto här
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};
