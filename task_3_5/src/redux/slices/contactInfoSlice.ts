import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ContactFormState {
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}


const initialState: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState,
  reducers: {
    setContactFormValues: (state, action: PayloadAction<ContactFormState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
  },
});

export const { setContactFormValues } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
