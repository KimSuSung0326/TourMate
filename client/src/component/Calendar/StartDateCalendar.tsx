import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import StartDateInput from 'feature/Input/StartDateInput';
import styled from 'styled-components';
import { StartDateCalendarModal } from 'feature/Modal/StartDateCalendarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const StartDateCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isShow, setIsShow] = useState<boolean>(false);
  const formattedDate = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;

  const handleOnClick = () => {
    setIsShow(!isShow);
  };

  const handleOnChange = (value: Date) => {
    setIsShow(!isShow);
    setDate(value);
  };
  const handleModalClose = () => {
    setIsShow(true);
  };
  const Border = styled.div`
    /* margin-bottom: 5rem;
    padding: 2rem; */
    justify-content: center;
    align-items: center;
  `;
  const StyleCalendar = styled(Calendar)`
    border: none;

    z-index: 9999;
    .react-calendar__navigation {
      display: flex;
      height: 24px;
      margin-bottom: 1em;
    }

    .react-calendar__navigation button {
      min-width: 24px;
      background-color: none;
    }

    .react-calendar__navigation button:disabled {
      background-color: #e8e8e8;
    }

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: #e8e8e8;
    }

    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.15em;
    }

    .react-calendar__year-view .react-calendar__tile,
    .react-calendar__decade-view .react-calendar__tile,
    .react-calendar__century-view .react-calendar__tile {
      padding: 1.2em 0.5em;
    }

    .react-calendar__tile--hasActive {
      color: #ffffff;
      background-color: #797979;
      border-radius: 5px;
    }

    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
      background-color: #797979;
    }

    .react-calendar__tile--active {
      color: #ffffff;
      background-color: #6a6a6a;
      border-radius: 7px;
    }

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      background-color: #6a6a6a;
    }
  `;
  return (
    <Border>
      <div>
        <StartDateInput onClick={handleOnClick} defaultValue={formattedDate} />

        {isShow && (
          <StartDateCalendarModal onClick={handleModalClose}>
            <StyleCalendar
              onClickDay={handleOnChange}
              onChange={() => setDate}
              value={date}
              locale="en"
            />
          </StartDateCalendarModal>
        )}
      </div>
    </Border>
  );
};
