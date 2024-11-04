import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import dayjs from 'dayjs';

import LoginPage from 'src/pages/LoginPage';
import MainPage from 'src/pages/MainPage';
import { Calendar, Event, User } from 'src/types/types';
import { getWeek } from 'src/utils/utils';
import { Day as DayType } from 'src/types/types';
import { Context } from 'src/context/context';
import {
  events as initialEvents,
  calendars as initialCalendars,
  dateFormat,
  defaultCheckedCalendarsId,
} from 'src/constants/constants';

import './styles/global.css';

const App: React.FC = () => {
  const initialDate = dayjs().format(dateFormat);
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [calendars, setCalendars] = useState<Calendar[]>(initialCalendars);
  const [checkedCalendars, setCheckedCalendars] = useState<string[]>(
    defaultCheckedCalendarsId
  );
  const [currentDay, setCurrentDay] = useState<DayType>({
    date: dayjs().toDate(),
    events: events.filter(
      (event) => dayjs(event.start_time).format(dateFormat) === initialDate
    ),
  });
  const [currentWeek, setCurrentWeek] = useState<DayType[]>(
    getWeek(dayjs(), events)
  );
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [selectedView, setSelectedView] = useState('Week');

  enum AppRoutes {
    home = '/',
    calendar = 'my-calendar',
  }

  return (
    <Context.Provider
      value={{
        currentMonth,
        setCurrentMonth,
        currentWeek,
        setCurrentWeek,
        selectedView,
        setSelectedView,
        currentDay,
        setCurrentDay,
        events,
        setEvents,
        calendars,
        setCalendars,
        checkedCalendars,
        setCheckedCalendars,
      }}
    >
      <Router>
        <Routes>
          <Route
            path={AppRoutes.home}
            element={<LoginPage setUser={setUser} />}
          />
          <Route
            // path='/'
            path={AppRoutes.calendar}
            element={
              <MainPage
                user={user}
                setUser={setUser}
                week={currentWeek}
                currentDay={currentDay}
                events={events}
                calendars={calendars}
              />
            }
          />
        </Routes>
      </Router>
    </Context.Provider>
  );
};

export default App;
