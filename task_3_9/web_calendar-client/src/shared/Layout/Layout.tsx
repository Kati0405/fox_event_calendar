import { Header } from '../Header/Header';
import { User } from '../../types/types';
import { SidePanel } from '../SidePanel/SidePanel';
import { Week } from '../../components/week-view/Week/Week';
import { Day as DayType } from '../../types/types';
import { useContext } from 'react';
import { Context } from '../../context/context';
import { Day as DayComponent } from '../../components/day-view/Day/Day';

interface LayoutProps {
  user: User | null;
  setUser: (user: User | null) => void;
  week: DayType[];
  currentDay: DayType;
}

export const Layout: React.FC<LayoutProps> = ({
  user,
  setUser,
  week,
  currentDay,
}) => {
  const { selectedView } = useContext(Context)!;
  const currentDayEvents =
    week.find((day) => day.date.toString() === currentDay.date.toString())
      ?.events || [];
  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className='flex gap-8 pt-8 mr-8'>
        <SidePanel />
        {selectedView === 'Week' ? (
          <Week date={currentDay.date} />
        ) : (
          <DayComponent date={currentDay.date} events={currentDayEvents} />
        )}
      </div>
    </>
  );
};
