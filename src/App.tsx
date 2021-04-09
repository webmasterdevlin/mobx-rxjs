import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import RootStore from "./store/rootStore";
import NavigationBar from "./components/NavigationBar";
import routes, { renderRoutes } from "./Routes";

const App = () => {
    return (
        <RootStore>
            <CssBaseline>
                <BrowserRouter>
                    <>
                        <NavigationBar />
                        <Container>{renderRoutes(routes)}</Container>
                    </>
                </BrowserRouter>
            </CssBaseline>
        </RootStore>
    );
};
export default App;
