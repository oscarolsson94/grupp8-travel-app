import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import HelloWorld from "./components/HelloWorld";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || {
            email: "",
            token: "",
        }
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <HelloWorld />
                    </Route>
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register}></Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
