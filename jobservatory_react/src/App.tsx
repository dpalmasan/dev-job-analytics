import { ChakraProvider, theme } from '@chakra-ui/react';
import * as React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Detail } from './components/detail/Detail';
import { store } from './features/store';
import './styles/home.scss';

export const App = () => (
  //// TODO: Change this after create the first screen
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Detail />
          </Route>

          {/* <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/detail'>
            <Detail />
          </Route> */}
        </Switch>
      </Router>
    </ChakraProvider>
  </Provider>
);
