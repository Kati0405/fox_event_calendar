import { useState, useRef, useEffect } from 'react';
import './App.css';

import GameBoard from './components/GameBoard/GameBoard';
import ScorePanel from './components/ScorePanel/ScorePanel';
import Chat from './components/Chat/Chat';

function App() {
  const [score, setScore] = useState([0, 0]);
  const [data, setData] = useState(['', '', '', '', '', '', '', '', '']);
  const [movesCount, setMovesCount] = useState(0);
  const [lock, setLock] = useState(false);

  const titleRef1 = useRef<HTMLDivElement>(null);
  const titleRef2 = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<
    { player: 'x' | 'o'; text: string }[]
  >([]);

  const [inputValue1, setInputValue1] = useState<string>('');
  const [inputValue2, setInputValue2] = useState<string>('');

  useEffect(() => {
    if (titleRef1.current && titleRef2.current) {
      titleRef1.current.innerHTML = 'Game started! Your turn:';
      titleRef2.current.innerHTML = 'Game started! Wait for your opponent:';
    }
  }, []);

  const resetGame = () => {
    setData(['', '', '', '', '', '', '', '', '']);
    setMovesCount(0);
    setLock(false);
    if (titleRef1.current && titleRef2.current) {
      titleRef1.current.innerHTML = 'Game started! Your turn:';
      titleRef2.current.innerHTML = 'Game started! Wait for your opponent:';
    }
  };

  const makeMove = (num: number) => {
    if (lock || data[num]) {
      return;
    }

    const newData = [...data];
    newData[num] = movesCount % 2 === 0 ? 'x' : 'o';
    setData(newData);
    setMovesCount(movesCount + 1);

    const winner = checkWin(newData);

    if (winner) {
      if (winner === 'draw') {
        if (titleRef1.current && titleRef2.current) {
          titleRef1.current.innerHTML = `It's a draw!`;
          titleRef2.current.innerHTML = `It's a draw!`;
        }
      } else {
        if (titleRef1.current && titleRef2.current) {
          if (winner === 'x') {
            titleRef1.current.innerHTML = `<span class="text-green-500">You won!</span>`;
            titleRef2.current.innerHTML = `<span class="text-red-500">You lost!</span>`;
          } else {
            titleRef1.current.innerHTML = `<span class="text-red-500">You lost!</span>`;
            titleRef2.current.innerHTML = `<span class="text-green-500">You won!</span>`;
          }
        }
        setScore((prevScore) => {
          if (winner === 'x') {
            return [prevScore[0] + 1, prevScore[1]];
          } else {
            return [prevScore[0], prevScore[1] + 1];
          }
        });
      }

      setLock(true);
      setTimeout(resetGame, 5000);
    } else {
      if (titleRef1.current && titleRef2.current) {
        if (movesCount % 2 === 0) {
          titleRef1.current.innerHTML = 'Wait for your opponent.';
          titleRef2.current.innerHTML = 'Your turn:';
        } else {
          titleRef1.current.innerHTML = 'Your turn:';
          titleRef2.current.innerHTML = 'Wait for your opponent.';
        }
      }
    }
  };

  const checkWin = (data: string[]): string | null => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        return data[a];
      }
    }

    if (movesCount === 8) {
      return 'draw';
    }

    return null;
  };

  const handleChatSubmit = (
    e: React.SyntheticEvent<HTMLFormElement>,
    player: 'x' | 'o'
  ) => {
    e.preventDefault();
    if (player === 'x' && inputValue1.trim() !== '') {
      setMessages([...messages.slice(-3), { player: 'x', text: inputValue1 }]);
      setInputValue1('');
    } else if (player === 'o' && inputValue2.trim() !== '') {
      setMessages([...messages.slice(-3), { player: 'o', text: inputValue2 }]);
      setInputValue2('');
    }
  };

  return (
    <div className='bg-black h-screen w-screen'>
      <ScorePanel
        score={score}
        setScore={setScore}
        resetGame={resetGame}
        setMessages={setMessages}
      />
      <div className='flex justify-center pt-9'>
        <div className='flex flex-col items-center border-r border-gray-300 pr-4'>
          <GameBoard
            titleRef={titleRef1}
            data={data}
            movesCount={movesCount}
            lock={movesCount % 2 !== 0}
            makeMove={makeMove}
          />
          <Chat
            messages={messages}
            inputValue={inputValue1}
            setInputValue={setInputValue1}
            handleChatSubmit={(e) => handleChatSubmit(e, 'x')}
            player='x'
          />
        </div>
        <div className='flex flex-col items-center pl-4'>
          <GameBoard
            titleRef={titleRef2}
            data={data}
            movesCount={movesCount}
            lock={movesCount % 2 === 0}
            makeMove={makeMove}
          />
          <Chat
            messages={messages}
            inputValue={inputValue2}
            setInputValue={setInputValue2}
            handleChatSubmit={(e) => handleChatSubmit(e, 'o')}
            player='o'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
