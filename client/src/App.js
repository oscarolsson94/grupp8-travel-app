import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Landing } from "./pages/Landing";
import { LogoutButton } from "./components/LogoutButton";

function App() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || {
            firstName: "",
            lastName: "",
            email: "",
            token: "",
        }
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {user.token && <LogoutButton />}
            <Router>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register}></Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
