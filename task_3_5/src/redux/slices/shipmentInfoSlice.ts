import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ShipmentFormState {
  address: string,
  appartment: string,
  city: string,
  country: string,
  state: string,
  zipcode: string,
}


const initialState: ShipmentFormState = {
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
    setShipmentFormValues: (state, action: PayloadAction<ShipmentFormState>) => {
      state.address = action.payload.address;
      state.appartment = action.payload.appartment;
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.state = action.payload.state;
      state.zipcode = action.payload.zipcode;
    },
  },
});

export const { setShipmentFormValues } = shipmentInfoSlice.actions;
export default shipmentInfoSlice.reducer;
