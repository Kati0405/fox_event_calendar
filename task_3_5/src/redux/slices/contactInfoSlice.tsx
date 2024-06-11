import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState,
  reducers: {
    setContactInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setContactInfo } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
