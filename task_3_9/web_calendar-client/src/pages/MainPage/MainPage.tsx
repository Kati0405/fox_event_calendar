import { useContext } from 'react';

import { Calendar, Event, User } from '@/types/types';
import Layout from '@components/layout/Layout';
import { Day as DayType } from '@/types/types';
import { Context } from '@/context/context';

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
