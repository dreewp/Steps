import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitListItem from './HabitListItem';
import moment from 'moment';
import { handleAddHabit, handleUpdateHabit } from '../../actions'
import { css } from 'emotion';

const habitListStyles = css`
  background-color: #565656;
  color: white;
`;

const habitListAddStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-top: 1px solid #58595D;
  font-size: 18px;
`;

class HabitList extends Component {
  state = {
    newHabitInputOpened: false
  }

  createHabit = (newHabitName) => {
    if (newHabitName === '') {
      this.setState({ newHabitInputOpened: false });
      return;
    }

    this.props.dispatch(handleAddHabit({
      name: newHabitName,
      dates: []
    }));

    this.setState({ newHabitInputOpened: false });
  }
  
  updateHabitName = (habit, newName) => {
    this.props.dispatch(handleUpdateHabit({
      _id: habit._id,
      name: newName,
      dates: habit.dates
    }));
  }

  getConsecutiveCount(dates) {
    let date = moment();
    let counter = dates.includes(date.format('MM/DD/YYYY')) ? 1 : 0;

    while (date != null) {
      date.subtract(1, 'days');
      const formattedDate = date.format('MM/DD/YYYY');

      if (dates.includes(formattedDate)) counter += 1
      else date = null;
    }

    return counter;
  }

  render() {
    return (
      <div className={habitListStyles}>
        {this.props.habits.map(habit => (
          <HabitListItem
            key={`habit-list-item-${habit._id}`}
            habit={habit}
            name={habit.name}
            completionCount={this.getConsecutiveCount(habit.dates)}
            submitChange={(newName) => {this.updateHabitName(habit, newName)}} />
        ))}
        {this.state.newHabitInputOpened ?
          <div>
            <HabitListItem
              placeholder={"Exercise"}
              autoFocus={true}
              name={this.state.newHabitName}
              submitChange={this.createHabit} />
          </div> :
          <div className={habitListAddStyles}
            onClick={() => {this.setState({newHabitInputOpened: true})}}>
            +
          </div>
        }
      </div>
    );
  }
}

export default connect()(HabitList);