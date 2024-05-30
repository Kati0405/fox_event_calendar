import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChatState {
    messages: { player: 'x' | 'o'; text: string; time: string }[];
    inputValue1: string;
    inputValue2: string;
}

interface Message {
    player: 'x' | 'o';
    text: string;
    time: string;
}

const initialState: ChatState = {
    messages: [],
    inputValue1: '',
    inputValue2: '',
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
            if (state.messages.length > 5) state.messages.shift();
        },
        clearMessages(state) {
            state.messages = [];
        },
        setInputValue1: (state, action: PayloadAction<string>) => {
            state.inputValue1 = action.payload;
        },
        setInputValue2: (state, action: PayloadAction<string>) => {
            state.inputValue2 = action.payload;
        },
    }
})

export const {
    addMessage,
    clearMessages,
    setInputValue1,
    setInputValue2
} = chatSlice.actions

export default chatSlice.reducer