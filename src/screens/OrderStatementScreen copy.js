import React from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const activeDates = [
  moment('2023-11-08'),
  moment('2023-11-09'),
  moment('2023-11-10'),
];

const OrderStatementScreen = () => {
  const onDayPress = (day) => {
    if (activeDates.includes(day)) {
      console.log('Active date selected:', day);
    } else {
      console.log('Inactive date selected:', day);
    }
  };

  const filteredDays = (days) => {
    return days.filter((day) => activeDates.includes(day));
  };

  return (
    <Calendar
      days={filteredDays(activeDates)} // Pass filtered days as prop to Calendar
      onDayPress={onDayPress}
      initialVisibleMonth={moment()}
      disableDate={(day) => {
        return filteredDays(activeDates).includes(day); // Disable all dates except for the active ones
      }}
    />
  );
};

export default OrderStatementScreen;