import './GameBoard.css';
import cross from '../../assets/cross.svg';
import circle from '../../assets/circle.svg';

interface GameBoardProps {
  titleRef: React.RefObject<HTMLDivElement>;
  data: string[];
  movesCount: number;
  lock: boolean;
  makeMove: (num: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  titleRef,
  data,
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
      <div className='board rounded-lg flex flex-col'>
        <div className='row1 flex flex-row'>
          <div className='box' onClick={() => handleBoxClick(0)}>
            {renderSymbol(data[0])}
          </div>
          <div className='box' onClick={() => handleBoxClick(1)}>
            {renderSymbol(data[1])}
          </div>
          <div className='box' onClick={() => handleBoxClick(2)}>
            {renderSymbol(data[2])}
          </div>
        </div>
        <div className='row2 flex flex-row'>
          <div className='box' onClick={() => handleBoxClick(3)}>
            {renderSymbol(data[3])}
          </div>
          <div className='box' onClick={() => handleBoxClick(4)}>
            {renderSymbol(data[4])}
          </div>
          <div className='box' onClick={() => handleBoxClick(5)}>
            {renderSymbol(data[5])}
          </div>
        </div>
        <div className='row3 flex flex-row'>
          <div className='box' onClick={() => handleBoxClick(6)}>
            {renderSymbol(data[6])}
          </div>
          <div className='box' onClick={() => handleBoxClick(7)}>
            {renderSymbol(data[7])}
          </div>
          <div className='box' onClick={() => handleBoxClick(8)}>
            {renderSymbol(data[8])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
