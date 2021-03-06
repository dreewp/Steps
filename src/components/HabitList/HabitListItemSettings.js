import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData, handleRemoveHabit } from '../../actions';
import { css } from 'emotion';
import { getHabitProgress } from '../../utils/api/habitsProgressUtils';
import HabitReminderSettings from './HabitReminderSettings';
const { ipcRenderer } = window.require('electron');

const HabitItemSettingsContainerStyles = css` position: absolute;
  display: flex;
  justify-content: center;
  background-color: #FAFAFA;
  width: 300px;
  max-width: 300px;
  height: 340px;
  max-height: 340px;
`;

const HabitItemSettingsStyles = css`
  width: inherit;
  height: inherit;
  border-radius: 5px;
  padding: 5px 0;
  font-size: 12px;

  .habit-item-settings-header {
    font-size: 20px;
    text-align: center;
  }
  > * {
    padding: 5px 0;
  }
`;

const habitRowStyles = css`
  display: flex;
  padding: 5px 0;

  span {
    flex: 0.52;
    text-align: right;
    margin-right: 8px;
    color: #7A7A7A;
  }
`;

const habitItemSettingsStreaksStyles = css`
  border-top: 1px solid #DEDEDE;
  border-bottom: 1px solid #DEDEDE;
`;

const habitItemSettingsFooterStyles = css`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

class HabitListItemSettings extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  handleDelete = () => {
    this.props.dispatch(handleRemoveHabit(this.props.habit._id));
  
    setTimeout(
      () => {
        ipcRenderer.send('handle-settings-delete-click');
      }, 200
    )
  }

  render() {
    const { habit } = this.props;
    if (!habit) return <div>Loading...</div>

    const {
      currentStreak,
      longestStreak,
      totalCompletions,
      weeklyCompletions
    } = getHabitProgress(habit);

    return (
      <div className={HabitItemSettingsContainerStyles}>
        <div className={HabitItemSettingsStyles}>
          <div className="habit-item-settings-header">{habit.name}</div>
          <div>
            <HabitReminderSettings
              habit={habit}
              habitRowStyles={habitRowStyles}
              handleDayClick={this.handleReminderDayClick} />
          </div>
          <div className={habitItemSettingsStreaksStyles}>
            <div className={habitRowStyles}>
              <span>Current Streak: </span>{currentStreak}
            </div>
            <div className={habitRowStyles}>
              <span>Longest Streak:</span>{longestStreak}
            </div>
            <div className={habitRowStyles}>
              <span>Total Completions:</span>{totalCompletions}
            </div>
            <div className={habitRowStyles}>
              <span>Weekly Completions:</span>{weeklyCompletions}
            </div>
          </div>
          <div className={habitItemSettingsFooterStyles}>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({habits}, props) {
  const habit = habits.find(habit => habit._id === props.match.params.habit_id);

  return { habit }
}

export default connect(mapStateToProps)(HabitListItemSettings);