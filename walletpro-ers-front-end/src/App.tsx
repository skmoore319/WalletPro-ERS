import * as React from 'react';
import './include/bootstrap'
import './App.css';
import { NavComponent } from './components/nav-component';
import { Provider } from 'react-redux';
import { store } from './Store';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { RequestListContainer } from './components/request-list/request-list.container';
import { SignInContainer } from './components/sign-in/sign-in.container';
import { RequestAddContainer } from './components/request-list/request-add.container';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
              <NavComponent />
              <Switch>
                <Route path="/log-in" component={SignInContainer} />
                <Route path="/users/:username/add-request" component={RequestAddContainer} />
                <Route path="/users/:username" component={RequestListContainer} />
              </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
