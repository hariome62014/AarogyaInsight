// slices/losSlice.js
import { createSlice } from '@reduxjs/toolkit';

const losSlice = createSlice({
  name: 'los',
  initialState: {
    selectedLOS: null,
  },
  reducers: {
    setSelectedLOS: (state, action) => {
      state.selectedLOS = action.payload;
    },
  },
});

export const { setSelectedLOS } = losSlice.actions;
export default losSlice.reducer;