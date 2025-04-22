import { createSlice } from "@reduxjs/toolkit";

const diagnosesSlice = createSlice({
  name: "diagnoses",
  initialState: {
    selectedDiagnoses: [], // Array of selected diagnoses
    selectedDiagnoses2:[],

  },
  reducers: {
    setSelectedDiagnoses: (state, action) => {
      state.selectedDiagnoses = action.payload; // Update selected diagnoses
    },

    setSelectedDiagnoses2: (state, action) => {
      state.selectedDiagnoses2 = action.payload; // Update selected diagnoses
    },
    
  },
});

export const { setSelectedDiagnoses,setSelectedDiagnoses2 } = diagnosesSlice.actions;
export default diagnosesSlice.reducer;
