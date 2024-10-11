import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import { useState } from 'react';
import { Calendar, Event, User } from './types/types';
import { getWeek } from './utils/utils';
import { Day as DayType } from './types/types';
import { Context } from './context/context';

import './styles/global.css';
import dayjs from 'dayjs';

import { events as initialEvents } from './constants/constants';
import { calendars as initialCalendars } from './constants/constants';

const App: React.FC = () => {
  const initialDate = dayjs().format('YYYY-MM-DD');
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [calendars, setCalendars] = useState<Calendar[]>(initialCalendars);
  const [currentDay, setCurrentDay] = useState<DayType>({
    date: dayjs().toDate(),
    events:
      events.filter(
        (event) => dayjs(event.start_time).format('YYYY-MM-DD') === initialDate
      ) || [],
  });
  const [currentWeek, setCurrentWeek] = useState<DayType[]>(
    getWeek(dayjs(), events)
  );
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [selectedView, setSelectedView] = useState('Week');

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
      }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage setUser={setUser} />} />
          <Route
            // path='/'
            path='/my-calendar'
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
