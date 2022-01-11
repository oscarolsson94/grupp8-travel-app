import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Landing } from "./pages/Landing";
import { TripInfo } from "./pages/TripInfo";
import { MyPages } from "./pages/MyPages";
import { BookingInfo } from "./pages/BookingInfo";
import { Navbar } from "./components/Navbar";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { SearchContext } from "./contexts/SearchContext";

const appStyles = {
  backgroundColor: "#65AFFF",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {
      firstName: "",
      lastName: "",
      email: "",
      token: "",
    }
  );

  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div style={appStyles}>
      <UserContext.Provider value={{ user, setUser }}>
        <SearchContext.Provider value={{ searchParams, setSearchParams }}>
          <Router>
            {user.token && <Navbar />}
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/tripinfo/:id" component={TripInfo} />
              <Route path="/mypages" exact component={MyPages} />
              <Route path="/bookinginfo/:id" component={BookingInfo} />
              <Route
                path="/OrderConfirmation/:id"
                component={OrderConfirmation}
              />
            </Switch>
          </Router>
        </SearchContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
