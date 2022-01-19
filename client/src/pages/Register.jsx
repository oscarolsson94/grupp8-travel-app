import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, CircularProgress }
    from "@material-ui/core";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import fieldValidation from "../utils/fieldValidation.js";
import { hasKey } from "../utils/helpers.js";

export const Register = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { user } = useContext(UserContext);

    // Form:
    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState({
        firstName: { value: "", isValid: false },
        lastName: { value: "", isValid: false },
        email: { value: "", isValid: false },
        password: { value: "", isValid: false },
        confirmPassword: { value: "", isValid: false },
    });

    const paperStyle = {
        padding: 20,
        // height: "70vh",
        maxWidth: 350,
        margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" };

    const handleRegister = async () => {
        setLoading(true);

        if (!formIsValid) {
            setLoading(false);
            return false;
        }

        axios
            .post(
                `${process.env.REACT_APP_BACKEND_STARTING_URL}api/auth/register`,
                Object.fromEntries(
                    Object
                        .keys(form).filter(key => hasKey(form[key], "value"))
                        .map(key => [[key], form[key].value])
                )
            )
            .then(() => {
                console.log("account created");
                setLoading(false);
                history.push("/login");
            })
            .catch(error => {
                if (error.response.data === 11000) {
                    setForm(form => ({
                        ...form,
                        email: {
                            ...form.email,
                            isValid: false,
                            error: "Den angivna e-post adressen har redan registrerats."
                        }
                    }));
                }
                else { console.error(error); }
                setLoading(false);
            });
    };

    // Form and field validation:
    const setFieldState = (field, isValid) => {
        if (isValid) {
            setForm(form => ({ ...form, [field]: { value: form[field].value, isValid: true } }));
        }
        else {
            setForm(form => ({
                ...form,
                [field]: {
                    value: form[field].value,
                    isValid: false,
                    error: fieldValidation.messagesInvalid[field] ?? ""
                }
            }));
        }
    };
    const validateFirstName = value => {
        setForm(form => ({ ...form, firstName: { ...form.firstName, value: value } }));
        setFieldState("firstName", fieldValidation.validateName(value));
    };
    const validateLastName2 = value => {
        setForm(form => ({ ...form, lastName: { ...form.lastName, value: value } }));
        setFieldState("lastName", fieldValidation.validateName(value));
    };
    const validateEmail = value => {
        setForm(form => ({ ...form, email: { ...form.email, value: value } }));
        setFieldState("email", fieldValidation.validateEmail(value));
    };
    const validatePassword = value => {
        setForm(form => ({ ...form, password: { ...form.password, value: value } }));
        setFieldState("password", fieldValidation.validatePassword(value));
        // Also update the "Confirm Password" state.
        setFieldState("confirmPassword", value === form.confirmPassword.value);
    };
    const validateConfirmPassword = value => {
        setForm(form => ({ ...form, confirmPassword: { ...form.confirmPassword, value: value } }));
        setFieldState("confirmPassword", form.password.value === value)
    };

    useEffect(() => {
        // Each time a field in the form is updated ("OnChange"), check if the 
        // entire form is valid so that we know when to enable the submit button.
        setFormIsValid(
            !Object
                .values(form)
                .filter(value => value.hasOwnProperty("isValid"))
                .some(value => !value.isValid)
        );
    }, [form]);

    if (user.token) return <Redirect to="/" />;

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <HowToRegIcon />
                    </Avatar>
                    <h2>Registrera ett nytt konto</h2>
                </Grid>
                <TextField
                    label="Förnamn"
                    placeholder="Mata in ditt förnamn"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => validateFirstName(e.target.value)}
                    error={!form.firstName.isValid && !!form.firstName.error}
                    helperText={!form.firstName.IsValid && form.firstName.error}
                />
                <TextField
                    label="Efternamn"
                    placeholder="Mata in ditt efternamn"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => validateLastName2(e.target.value)}
                    error={!form.lastName.isValid && !!form.lastName.error}
                    helperText={!form.lastName.IsValid && form.lastName.error}
                />
                <TextField
                    label="E-post"
                    placeholder="Mata in din e-post adress"
                    fullWidth
                    required
                    type="email"
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => validateEmail(e.target.value)}
                    error={!form.email.isValid && !!form.email.error}
                    helperText={!form.email.IsValid && form.email.error}
                />
                <TextField
                    label="Lösenord"
                    placeholder="Mata in ditt lösenord"
                    type="password"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => validatePassword(e.target.value)}
                    error={!form.password.isValid && !!form.password.error}
                    helperText={!form.password.IsValid && form.password.error}
                />
                <TextField
                    label="Bekräfta lösenord"
                    placeholder="Upprepa ditt lösenord"
                    type="password"
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => validateConfirmPassword(e.target.value)}
                    error={!form.confirmPassword.isValid && !!form.confirmPassword.error}
                    helperText={!form.confirmPassword.IsValid && form.confirmPassword.error}
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
                    disabled={!formIsValid}
                >
                    Registrera ett nytt konto
                </Button>
                <Typography>
                    {" "}
                    Har du redan ett konto?{" "}
                    <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Logga in här
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};
