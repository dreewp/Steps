import React, { Component } from 'react';
import HabitPage from './HabitPage';
import '../styles/App.css';
import '../styles/Resizer.css';
import '../styles/dateRowStyles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HabitPage />
      </div>
    );
  }
}

export default App;