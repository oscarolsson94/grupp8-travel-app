import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { UserContext } from "../contexts/UserContext";

export const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const { setSearchParams } = useContext(SearchContext);

  const handleLogout = () => {
    setUser({});
    setSearchParams({});
  };
  return (
    <Grid align="center" style={{ paddingRight: 20 }}>
      <Button
        style={{ color: "white", borderColor: "white" }}
        variant="outlined"
        onClick={handleLogout}
      >
        Logga ut
      </Button>
    </Grid>
  );
};
