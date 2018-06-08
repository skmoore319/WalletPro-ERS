import * as React from 'react';
import './include/bootstrap'
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Store';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Sample } from './components/sample';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
              <Switch>
                <Route component={Sample} />
              </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
