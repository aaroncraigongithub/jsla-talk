import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar } from 'material-ui';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import ListPanel from './components/ListPanel';

injectTapEventPlugin();

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <AppBar title="A demo app for js.la" />
        <ListPanel />
      </div>
    </MuiThemeProvider>
  </Provider>
);

export default App;
