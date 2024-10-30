import { useContext } from 'react';

import { Calendar, Event, User, Day as DayType } from 'src/types/types';
import Layout from 'src/components/layout/Layout';
import { Context } from 'src/context/context';

export interface MainPageProps {
  user: User | null;
  setUser: (user: User | null) => void;
  week: DayType[];
  currentDay: DayType;
  events: Event[];
  calendars: Calendar[];
}

const MainPage: React.FC<MainPageProps> = ({ user, setUser, week }) => {
  const { currentDay, events, calendars } = useContext(Context)!;

  return (
    <>
      <Layout
        user={user}
        setUser={setUser}
        week={week}
        currentDay={currentDay}
        events={events}
        calendars={calendars}
      ></Layout>
    </>
  );
};

export default MainPage;
