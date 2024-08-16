import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forms: [],
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForms: (state, action) => {
      state.forms = action.payload;
    },
  },
});

export const { setForms} = formSlice.actions;

export default formSlice.reducer;
