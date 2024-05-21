import './ScorePanel.css';

interface ScorePanelProps {
  score: number[];
  setScore: React.Dispatch<React.SetStateAction<number[]>>;
  resetGame: () => void;
  setMessages: React.Dispatch<
    React.SetStateAction<{ player: 'x' | 'o'; text: string }[]>
  >;
}

const ScorePanel: React.FC<ScorePanelProps> = ({
  score,
  setScore,
  resetGame,
  setMessages,
}) => {
  const resetScore = () => {
    setScore([0, 0]);
    setMessages([]);
    resetGame();
  };
  return (
    <div className='header bg-black w-screen flex justify-around items-center px-48 border-b border-gray-400'>
      <div className='header-text_small text-white pl-48'>Player 1</div>
      <div className='text-white text-4xl'>
        <div className='flex gap-7 header-text_large cursor-pointer'>
          {`Score: ${score[0]} : ${score[1]}`}
          <button
            className='bg-green-500 rounded-lg px-3 py-2 text-sm'
            onClick={resetScore}
          >
            Reset
          </button>
        </div>
      </div>
      <div className='header-text_small text-white pr-48'>Player 2</div>
    </div>
  );
};

export default ScorePanel;
