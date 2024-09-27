import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import './SidePanel.css';

export const SidePanel = () => {
  return (
    <aside className='side-panel'>
      <Button className='w-60'>+ Create</Button>
      <Calendar />
    </aside>
  );
};
