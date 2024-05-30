import { createSlice } from '@reduxjs/toolkit'

interface GameState {
    score: {
        firstPlayer: number;
        secondPlayer: number;
    };
    tableCells: string[];
    movesCount: number;
    lock: boolean;

}

const initialState: GameState = {
    score: {
        firstPlayer: 0,
        secondPlayer: 0
    },
    tableCells: ['', '', '', '', '', '', '', '', ''],
    movesCount: 0,
    lock: false,

}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        resetGame: (state) => {
            state.tableCells = ['', '', '', '', '', '', '', '', ''];
            state.movesCount = 0;
            state.lock = false;
        },
        makeMove: (state, action) => {
            const { num, player } = action.payload;
            if (state.lock || state.tableCells[num]) return;
            state.tableCells[num] = player
            state.movesCount += 1
        },
        setLock: (state, action) => {
            state.lock = action.payload
        },
        updateScore: (state, action) => {
            const { firstPlayer, secondPlayer } = action.payload;
            state.score.firstPlayer = firstPlayer;
            state.score.secondPlayer = secondPlayer;
        }
    }
})

export const {
    resetGame,
    makeMove,
    setLock,
    updateScore
} = gameSlice.actions

export default gameSlice.reducer