import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  appartment: '',
  city: '',
  country: '',
  state: '',
  zipcode: '',
};

const shipmentInfoSlice = createSlice({
  name: 'shipmentInfo',
  initialState,
  reducers: {
    setShipmentInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setShipmentInfo } = shipmentInfoSlice.actions;
export default shipmentInfoSlice.reducer;
