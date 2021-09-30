import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  News,
  Navbar,
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  Footer,
  Homepage,
} from "./components";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

const App = () => {
  return (
    <>
      <Navbar />
      <Box className="app-container">
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/cryptocurrencies" exact>
              <Cryptocurrencies />
            </Route>
            <Route path="/crypto/:coinID" exact>
              <CryptoDetails />
            </Route>
            <Route path="/exchanges" exact>
              <Exchanges />
            </Route>
            <Route path="/news" exact>
              <News />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default App;
