import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetGame,
  makeMove,
  updateScore,
  setLock,
} from './redux/slices/gameSlice';
import {
  addMessage,
  setInputValue1,
  setInputValue2,
} from './redux/slices/chatSlice';
import { RootState, AppDispatch } from './redux/store';

import './App.css';

import GameBoard from './components/GameBoard/GameBoard';
import ScorePanel from './components/ScorePanel/ScorePanel';
import Chat from './components/Chat/Chat';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { score, tableCells, movesCount, lock } = useSelector(
    (state: RootState) => state.game
  );

  const { messages, inputValue1, inputValue2 } = useSelector(
    (state: RootState) => state.chat
  );

  const titleRef1 = useRef<HTMLDivElement>(null);
  const titleRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef1.current && titleRef2.current) {
      titleRef1.current.innerHTML = 'Game started! Your turn:';
      titleRef2.current.innerHTML = 'Game started! Wait for your opponent:';
    }
  }, []);

  const handleResetGame = () => {
    dispatch(resetGame());
    if (titleRef1.current && titleRef2.current) {
      titleRef1.current.innerHTML = 'Game started! Your turn:';
      titleRef2.current.innerHTML = 'Game started! Wait for your opponent:';
    }
  };

  const handleMakeMove = (num: number) => {
    if (lock || tableCells[num]) {
      return;
    }
    const player = movesCount % 2 === 0 ? 'x' : 'o';
    const newTableCells = [...tableCells];
    newTableCells[num] = player;
    dispatch(makeMove({ num, player }));

    const winner = checkWin(newTableCells);

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
        dispatch(
          updateScore({
            firstPlayer:
              winner === 'x' ? score.firstPlayer + 1 : score.firstPlayer,
            secondPlayer:
              winner === 'o' ? score.secondPlayer + 1 : score.secondPlayer,
          })
        );
      }

      dispatch(setLock(true));
      setTimeout(handleResetGame, 5000);
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

  const checkWin = (tableCells: string[]): string | null => {
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
      if (
        tableCells[a] &&
        tableCells[a] === tableCells[b] &&
        tableCells[a] === tableCells[c]
      ) {
        return tableCells[a];
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
    const getCurrentTime = () => {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const newMessage = {
      player,
      text: player === 'x' ? inputValue1 : inputValue2,
      time: getCurrentTime(),
    };
    if (player === 'x' && inputValue1.trim() !== '') {
      dispatch(addMessage(newMessage));
      dispatch(setInputValue1(''));
    } else if (player === 'o' && inputValue2.trim() !== '') {
      dispatch(addMessage(newMessage));
      dispatch(setInputValue2(''));
    }
  };

  return (
    <div className='bg-black h-100% w-screen'>
      <ScorePanel score={score} resetGame={handleResetGame} />
      <div className='flex justify-center pt-9'>
        <div className='flex flex-col items-center border-r border-gray-300 pr-4'>
          <GameBoard
            titleRef={titleRef1}
            tableCells={tableCells}
            movesCount={movesCount}
            lock={movesCount % 2 !== 0}
            makeMove={handleMakeMove}
          />
          <Chat
            messages={messages}
            inputValue={inputValue1}
            handleChatSubmit={(e) => handleChatSubmit(e, 'x')}
            player='x'
          />
        </div>
        <div className='flex flex-col items-center pl-4'>
          <GameBoard
            titleRef={titleRef2}
            tableCells={tableCells}
            movesCount={movesCount}
            lock={movesCount % 2 === 0}
            makeMove={handleMakeMove}
          />
          <Chat
            messages={messages}
            inputValue={inputValue2}
            handleChatSubmit={(e) => handleChatSubmit(e, 'o')}
            player='o'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
