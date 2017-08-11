import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AppBar} from 'material-ui';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';

injectTapEventPlugin();

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <AppBar title="A demo app for js.la"/>
    </MuiThemeProvider>
  </Provider>
);

export default App;
