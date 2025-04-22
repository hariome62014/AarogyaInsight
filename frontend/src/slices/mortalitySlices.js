import { createSlice } from "@reduxjs/toolkit";

// Define the slice
const mortalitySlice = createSlice({
  name: "mortality", // Name of the slice
  initialState: {
    selectedMortality: null, // Initial state: an array for selected mortality data
  },
  reducers: {
    // Reducer to set selected mortality
    setSelectedMortality: (state, action) => {
      state.selectedMortality = action.payload; // Update the state with the payload
    },
  },
});

// Export the action
export const { setSelectedMortality } = mortalitySlice.actions;

// Export the reducer
export default mortalitySlice.reducer;
