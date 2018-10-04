import React, { Component } from 'react';

//this could potentially be a functional rendering component
class HabitTable extends Component {
  render() {
    const habits = this.props.habits;
    //we have to be able to get TODAY's date.
    //AND all the other dates...
    //we also need the data of how many rows they have

    const cols = 10; //how many dates the user would like to show at a given time
    const habitBoxesLength = new Array(cols);

    return (
      <div>
        {habits.map(habit => {
          //get saved starting date. and for each check whether or not the habit's dates includes this number
          //if it does then set completed to true, otherwise false
          return (
            <div className="habit-row">
              {habitBoxesLength.map(_ => (
                <div></div>
              ))}
            </div>
          )
        })}
      </div>
    );
  }
}

export default HabitTable;