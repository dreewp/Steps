import moment from 'moment';

export function getHabitProgress(habit) {
  const dates = habit.dates;

  return {
    currentStreak: getCurrentStreak(dates),
    longestStreak: getLongestStreak(dates),
    totalCompletions: getTotalCompletions(dates),
    weeklyCompletions: getWeeklyCompletions(dates)
  }
}

export function getCurrentStreak(dates) {
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

function getLongestStreak(dates) {
  if (!dates.length) return 0;

  let longestStreakCounter = 1;

  let streakCounter = 1;
  const sortedDates = dates.concat().sort((a,b) => moment(a) - moment(b));
  let prevDate = sortedDates[0];

  for (let i=1; i<sortedDates.length; i++) {
    const date = sortedDates[i];

    if (new Date(new Date(date) - 1).toDateString() === new Date(prevDate).toDateString()) {
      streakCounter += 1;
    } else {
      longestStreakCounter = Math.max(longestStreakCounter, streakCounter);
      streakCounter = 1;
    }

    prevDate = date;
  }

  return Math.max(longestStreakCounter, streakCounter);
}

function getTotalCompletions(dates) {
  return dates.length;
}

function getWeeklyCompletions(dates) {
  if (dates.length < 7) return 0;

  let totalWeeklyCompletions = 0;
  const sortedDates = dates.concat().sort((a,b) => moment(a) - moment(b));
  let startDate = moment(sortedDates[0]);

  let counter = 1;
  for (let i=1; i<sortedDates.length; i++) {
    const nextDate = sortedDates[i];
    startDate.add(1, 'days');
    if (nextDate === startDate.format('MM/DD/YYYY')) {
      counter += 1;
    } else {
      startDate = moment(nextDate);
      counter = 1;
    }

    if (counter === 7) {
      totalWeeklyCompletions += 1;
      counter = 1;
    }
  }

  return totalWeeklyCompletions;
}