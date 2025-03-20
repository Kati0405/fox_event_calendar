import { useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import dayjs from 'dayjs';

import { AppRoutes } from 'src/constants/constants';
import { routesConfig } from '../routesConfig';
import { Calendar, Event, User } from 'src/types/types';
import { getWeek } from 'src/utils/utils';
import { Day as DayType } from 'src/types/types';
import { Context } from 'src/context/context';
import { dateFormat, defaultCheckedCalendarsId } from 'src/constants/constants';

import { fetchEvents } from './api/eventService';
import { fetchCalendars } from './api/calendarService';
import './styles/global.css';

const App: React.FC = () => {
  const initialDate = dayjs().format(dateFormat);
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [checkedCalendars, setCheckedCalendars] = useState<string[]>(
    defaultCheckedCalendarsId
  );
  const [currentDay, setCurrentDay] = useState<DayType>({
    date: dayjs().toDate(),
    events: useMemo(() => {
      return events.filter(
        (event) => dayjs(event.start_time).format(dateFormat) === initialDate
      );
    }, [events, initialDate]),
  });
  const [currentWeek, setCurrentWeek] = useState<DayType[]>(
    getWeek(dayjs(), events)
  );
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [selectedView, setSelectedView] = useState('Week');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const fetchedEvents = await fetchEvents();
          const fetchedCalendars = await fetchCalendars();
          setEvents(fetchedEvents);
          setCalendars(fetchedCalendars);
        } catch (error) {
          console.error('Error fetching events or calendars:', error);
        }
      }
    };

    fetchData();
  }, [user]);

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
        user,
        setUser,
      }}
    >
      <Router>
        <Routes>
          {routesConfig.map(({ url, component: Component, isPrivate }) => (
            <Route
              key={url}
              path={url}
              element={
                isPrivate && !user ? (
                  <Navigate to={AppRoutes.HOME} />
                ) : (
                  <Component
                    user={user}
                    setUser={setUser}
                    currentDay={currentDay}
                    week={currentWeek}
                    events={events}
                    calendars={calendars}
                  />
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </Context.Provider>
  );
};

export default App;
