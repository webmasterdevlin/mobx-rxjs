import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Box, Button, createStyles, Toolbar } from "@material-ui/core";

import { RootStoreContext } from "../store/rootStore";
import TotalOfCharacters from "./TotalOfCharacters";

const NavigationBar = observer(() => {
  const { antiHeroStore, heroStore, villainStore } = useContext(
    RootStoreContext
  );
  const history = useHistory();
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/")}
            color="inherit"
          >
            Home
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/anti-heroes")}
            color="inherit"
          >
            Anti Heroes
          </Button>
          <TotalOfCharacters total={antiHeroStore.totalAntiHeroesCount} />
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/heroes")}
            color="inherit"
          >
            Heroes
          </Button>
          <TotalOfCharacters total={heroStore.totalHeroesCount} />
        </Box>
        <Box>
          <Button
            className={classes.button}
            onClick={() => history.push("/villains")}
            color="inherit"
          >
            Villains
          </Button>
          <TotalOfCharacters total={villainStore.totalVillainsCount} />
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default NavigationBar;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
