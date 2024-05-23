import { createSlice } from '@reduxjs/toolkit'

interface GameState {
    score: [number, number];
    data: string[];
    movesCount: number;
    lock: boolean;

}

const initialState: GameState = {
    score: [0, 0],
    data: ['', '', '', '', '', '', '', '', ''],
    movesCount: 0,
    lock: false,

}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        resetGame: (state) => {
            state.data = ['', '', '', '', '', '', '', '', ''];
            state.movesCount = 0;
            state.lock = false;
        },
        makeMove: (state, action) => {
            const { num, player } = action.payload;
            if (state.lock || state.data[num]) return;
            state.data[num] = player
            state.movesCount += 1
        },
        setLock: (state, action) => {
            state.lock = action.payload
        },
        updateScore: (state, action) => {
            state.score = action.payload
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