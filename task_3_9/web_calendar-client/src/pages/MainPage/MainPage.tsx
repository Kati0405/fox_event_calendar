import { User } from '../../types/types';
import { Layout } from '../../shared/Layout/Layout';
import { Day as DayType } from '../../types/types';
import { useContext } from 'react';
import { Context } from '../../context/context';

interface MainPageProps {
  user: User | null;
  setUser: (user: User | null) => void;
  week: DayType[];
  currentDay: DayType;
}

const MainPage: React.FC<MainPageProps> = ({ user, setUser, week }) => {
  const { currentDay } = useContext(Context)!;
  return (
    <>
      <Layout
        user={user}
        setUser={setUser}
        week={week}
        currentDay={currentDay}
      ></Layout>
    </>
  );
};

export default MainPage;
