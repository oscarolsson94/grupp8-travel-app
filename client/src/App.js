import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

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
            Hello World
          </Route>
          <Route path="/login" exact></Route>
          <Route path="/register" exact></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
