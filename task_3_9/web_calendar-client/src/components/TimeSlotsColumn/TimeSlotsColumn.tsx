interface TimeSlotsColumnProps {
  startHour?: number;
  endHour?: number;
}

export const TimeSlotsColumn: React.FC<TimeSlotsColumnProps> = ({
  startHour = 6,
  endHour = 23,
}) => {
  const generateTimeSlots = (startHour: number, endHour: number) => {
    const slots = [];
    for (let i = startHour; i <= endHour; i++) {
      const period = i >= 12 ? 'pm' : 'am';
      const hour = i > 12 ? i - 12 : i === 0 ? 12 : i;
      slots.push(`${hour} ${period}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(startHour, endHour);

  return (
    <div className='flex flex-col'>
      <div className='min-w-[60px] h-16 bg-white'> </div>
      {timeSlots.map((slot, idx) => (
        <div
          key={idx}
          className='text-right text-sm min-w-[60px] h-20 bg-white pt-16 pr-2'
        >
          {slot}
        </div>
      ))}
    </div>
  );
};
