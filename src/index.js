import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import './styles/Resizer.css';
import App from './containers/App';
import * as serviceWorker from './utils/serviceWorker';
import HabitListItemSettings from './components/HabitList/HabitListItemSettings';
import Preferences from './containers/Preferences';

render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path="/" component={App} />
        <Route path="/habit-settings/:habit_id" component={HabitListItemSettings} />
        <Route path="/preferences" component={Preferences} />
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();