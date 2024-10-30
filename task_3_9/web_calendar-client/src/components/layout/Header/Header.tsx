import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';

import logo from 'src/assets/svg/logo.svg';
import Button, { ButtonState } from 'src/components/ui/Button';
import Dropdown from 'src/components/ui/Dropdown';
import { User } from 'src/types/types';
import { Context } from 'src/context/context';
import { getWeek } from 'src/utils/utils';
import authService from 'src/services/auth.service';

export interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const {
    setCurrentMonth,
    currentWeek,
    setCurrentWeek,
    setCurrentDay,
    currentDay,
  } = useContext(Context)!;
  const { selectedView, setSelectedView } = useContext(Context)!;
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authService.listenToAuthChanges((response) => {
      if (response.ok) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [setUser]);

  const name = user?.name;
  const avatar = user?.avatar;

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    setCurrentWeek(getWeek(dayjs()));
  }, [setCurrentWeek]);

  const handlePrevDay = () => {
    const previousDay = dayjs(currentDay.date).subtract(1, 'day');
    setCurrentDay({ date: previousDay.toDate() });
  };

  const handleNextDay = () => {
    const nextDay = dayjs(currentDay.date).add(1, 'day');
    setCurrentDay({ date: nextDay.toDate() });
  };

  const handlePrevWeek = () => {
    const newWeekStart = dayjs(currentWeek[0].date);
    const prevWeek = getWeek(newWeekStart.subtract(1, 'week'));
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    const newWeekStart = dayjs(currentWeek[0].date);
    const nextWeek = getWeek(newWeekStart.add(1, 'week'));
    setCurrentWeek(nextWeek);
  };

  const handleReset = () => {
    const today = dayjs();
    setCurrentDay({ date: today.toDate() });
    setCurrentMonth(today.month());
    const startOfWeek = today.startOf('week');
    setCurrentWeek(getWeek(startOfWeek));
  };

  return (
    <header className='flex items-center px-16 h-20 shadow-md'>
      <div className='flex flex-row items-center gap-4 w-1/2'>
        <div>
          <img src={logo} alt='Logo' className='h-10' />
        </div>
        <Button
          variant={ButtonState.Primary}
          className='w-15 h-9'
          onClick={handleReset}
        >
          Today
        </Button>
        <div className='flex gap-2'>
          <Button
            variant={ButtonState.Secondary}
            icon={<FaChevronLeft />}
            className='w-9 h-9'
            onClick={selectedView === 'Week' ? handlePrevWeek : handlePrevDay}
          />
          <Button
            variant={ButtonState.Secondary}
            icon={<FaChevronRight />}
            className='w-9 h-9'
            onClick={selectedView === 'Week' ? handleNextWeek : handleNextDay}
          />
        </div>
        <h2 className='font-bold'>
          {selectedView === 'Week'
            ? dayjs(currentWeek[0].date).format('MMMM YYYY')
            : dayjs(currentDay.date).format('DD MMMM YYYY')}
        </h2>
      </div>
      <div className='flex flex-row items-center justify-end w-1/2'>
        <Dropdown
          options={['Day', 'Week']}
          value={selectedView}
          onChange={(value) => setSelectedView(value)}
          className='w-20 mr-8 h-9'
        />
        <div className='flex items-center gap-2'>
          <h2 className='text-lg'>{name || 'User'}</h2>
          <div
            className='w-10 h-10 rounded-full bg-green-400 cursor-pointer flex items-center justify-center'
            onClick={toggleLogout}
          >
            {avatar ? (
              <img src={avatar} alt='Avatar' className='rounded-full' />
            ) : (
              <span className='text-white text-xl font-bold'>U</span>
            )}
          </div>
          {showLogout && (
            <Button
              variant={ButtonState.Secondary}
              onClick={handleLogout}
              icon={<HiLogout />}
              className='h-9'
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
