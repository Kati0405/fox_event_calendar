import './GameBoard.css';
import cross from '../../assets/cross.svg';
import circle from '../../assets/circle.svg';

interface GameBoardProps {
  titleRef: React.RefObject<HTMLDivElement>;
  tableCells: string[];
  movesCount: number;
  lock: boolean;
  makeMove: (num: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  titleRef,
  tableCells,
  lock,
  makeMove,
}) => {
  const renderSymbol = (symbol: string) => {
    if (symbol === 'x') {
      return <img src={cross} alt='Cross' />;
    } else if (symbol === 'o') {
      return <img src={circle} alt='Circle' />;
    }
    return null;
  };

  const handleBoxClick = (num: number) => {
    if (!lock) {
      makeMove(num);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='title text-orange-500 text-3xl pb-9' ref={titleRef}></div>
      <div className='board bg-metallic-gray rounded-lg flex flex-col'>
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1} flex flex-row`}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className='box border-steal-gray border-2 border-solid'
                  onClick={() => handleBoxClick(index)}
                >
                  {renderSymbol(tableCells[index])}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
