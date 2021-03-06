import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitBox from './HabitBox';
import { handleUpdateHabit } from '../../actions';
import { css } from 'emotion';

class HabitRow extends Component {
  toggleHabit = (date) => {
    if (date.isAfter(new Date())) return;

    const habit = this.props.habit;
    const formattedDate = date.format("MM/DD/YYYY");
    const hasCompleted = habit.dates.includes(formattedDate);

    this.props.dispatch(handleUpdateHabit({
      _id: habit._id,
      name: habit.name,
      dates: (hasCompleted ?
        habit.dates.filter(date => date !== formattedDate) :
        habit.dates.concat(formattedDate)
      )
    }));
  }

  getDynamicHabitBoxStyles(date) {
    const habitHasDate = this.props.habit.dates.includes(date.format("MM/DD/YYYY"));

    if (date.isAfter(new Date())) {
      return css`
        background-color: #cccccc;
        border-bottom: 1px solid #bfb9bf;
        border-right: 1px solid #bfb0bf;`;
    } else if (habitHasDate) {
      return css`background-color:#1bbd49`;
    } else {
      return css`background-color:#a6a6a6`;
    }
  }

  render() {
    return (
      <div className={css`display:flex;`}>
        {this.props.dates.map(date => (
          <HabitBox key={`habit-box-${date.format("MM/DD")}`}
                    onClick={() => {this.toggleHabit(date)}}
                    boxDynamicStyles={this.getDynamicHabitBoxStyles(date)} />
        ))}
      </div>
    );
  }
}

export default connect()(HabitRow);