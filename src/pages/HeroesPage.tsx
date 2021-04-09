import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { RootStoreContext } from "../store/rootStore";
import TitleBar from "../components/TitleBar";
import UpdateUiLabel from "../components/UpdateUiLabel";
import FormSubmission from "../components/FormSubmission";

const HeroesPage = observer(() => {
  const { heroStore } = useContext(RootStoreContext);

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    heroStore.getHeroesAction();
  }, []);

  return (
    <div>
      <TitleBar title={"Super Heroes Page"} />
      <FormSubmission postAction={heroStore.postHeroAction} />
      <UpdateUiLabel />
      <>
        {heroStore.loading ? (
          <Typography variant={"h2"}>Loading.. Please wait..</Typography>
        ) : (
          heroStore.heroes.map((h) => (
            <Box
              mb={2}
              role={"card"}
              key={h.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
            >
              <div>
                <Typography>
                  <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                  {counter === h.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(h.id)}
                  variant={"contained"}
                  color={"default"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"secondary"}
                  onClick={() => heroStore.softDeleteHeroAction(h)}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"secondary"}
                  onClick={() => heroStore.deleteHeroAction(h.id)}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {heroStore.heroes.length === 0 && !heroStore.loading && (
        <Button
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={heroStore.getHeroesAction}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
});

export default HeroesPage;

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
