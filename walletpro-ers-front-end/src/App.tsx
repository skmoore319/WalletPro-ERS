import * as React from 'react';
import './include/bootstrap'
import './App.css';
import { NavComponent } from './components/nav-component';
import { Provider } from 'react-redux';
import { store } from './Store';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { RequestList } from './components/request-list';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
              <NavComponent />
              <Switch>
                <Route component={RequestList} />
              </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
