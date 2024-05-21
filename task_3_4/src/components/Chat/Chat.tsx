import './Chat.css';

import cross from '../../assets/cross.svg';
import circle from '../../assets/circle.svg';
import send_icon from '../../assets/send-icon.svg';

interface ChatProps {
  messages: { text: string; player: 'x' | 'o' }[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleChatSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  player: 'x' | 'o';
}

const Chat: React.FC<ChatProps> = ({
  messages,
  inputValue,
  setInputValue,
  handleChatSubmit,
  player,
}) => {
  return (
    <div className='chat-container rounded-t-lg relative mt-9 flex flex-col'>
      <div className='chat-header rounded-t-lg'>
        <div className='chat-header_icon absolute w-8 h-8 rounded-full left-2 top-2'>
          <img
            className='size-6 w-4 h-4 absolute top-2 left-2'
            src={player === 'x' ? cross : circle}
            alt={player === 'x' ? 'cross' : 'circle'}
          />
        </div>
      </div>

      <div className='chat-messages w-full h-full px-5 mt-4 flex flex-col'>
        <ul className='flex flex-col'>
          {messages.map((message, index) => (
            <li
              className={`message rounded-sm mb-4 px-4 inline-block text-white ${
                message.player === player ? `bg-green-500` : `bg-gray-500`
              }
              ${
                message.player === player
                  ? `bg-green-500 self-end`
                  : `bg-gray-500 self-start`
              }`}
              key={index}
            >
              {message.text}
            </li>
          ))}
        </ul>
      </div>
      <form
        onSubmit={handleChatSubmit}
        className='input-form relative flex items-center px-5 mb-5'
      >
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Message'
          className='input-filed h-14 rounded-lg w-full pl-3 text-white'
        />
        <button
          type='submit'
          className='send-button absolute right-8 cursor-pointer'
        >
          <img src={send_icon} alt='send' />
        </button>
      </form>
    </div>
  );
};

export default Chat;
