import { Event } from '../../types/types';
import { MdTitle, MdOutlineSubject, MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { IoMdTime } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import Icon from '../Icon/Icon';
import { format } from 'date-fns';

interface EventInfoProps {
  event: Event;
}

export const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  return (
    <div className='event-info relative'>
      <div className='event-info_actions flex flex-row absolute gap-3 right-8 top-[-3.2rem]'>
        <div className='cursor-pointer' onClick={() => console.log('edit')}>
          <Icon icon={MdModeEditOutline}></Icon>
        </div>
        <div className='cursor-pointer' onClick={() => console.log('delete')}>
          <Icon icon={RiDeleteBin7Fill}></Icon>
        </div>
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={MdTitle}></Icon>
        {event.title}
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={IoMdTime}></Icon>
        {`${format(event.date, 'EEEE, MMMM d')}, ${format(
          event.start_time,
          'H:mm aaa'
        )} - ${format(event.end_time, 'H:mm aaa')}`}
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={IoCalendarOutline}></Icon>
        {event.calendar}
      </div>
      <div className='flex flex-row gap-3'>
        <Icon icon={MdOutlineSubject}></Icon>
        {event.description}
      </div>
    </div>
  );
};
