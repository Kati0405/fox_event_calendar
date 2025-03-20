import { Calendar, Event, User, Day as DayType } from 'src/types/types';
import Layout from 'src/components/layout/Layout';
import { useCalendarContext } from 'src/hooks/useCalendarContext';

export interface MainPageProps {
  user: User | null;
  setUser: (user: User | null) => void;
  week: DayType[];
  currentDay: DayType;
  events: Event[];
  calendars: Calendar[];
}

const MainPage: React.FC<MainPageProps> = ({ user, setUser, week }) => {
  const { loading, data } = useCalendarContext();
  if (loading) {
    return <div>Loading...</div>;
  }

  const { currentDay, events, calendars } = data;

  return (
    <>
      <Layout
        user={user}
        setUser={setUser}
        week={week}
        currentDay={currentDay}
        events={events}
        calendars={calendars}
      />
    </>
  );
};

export default MainPage;
