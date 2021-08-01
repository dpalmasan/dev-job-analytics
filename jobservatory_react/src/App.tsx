import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  theme,
} from "@chakra-ui/react";
import * as React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { Detail } from "./components/detail/Detail";
import { Home } from "./components/home/Home";
import "./styles/home.scss";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/detail">
          <Detail />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
);
