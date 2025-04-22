import { createSlice } from "@reduxjs/toolkit";

const searchQuerySlice = createSlice({
  name: "searchquery",
  initialState: {
    selectedSearchQuery: "", // Array of selected SearchQuery
    selectedSearchQuery2:"",

  },
  reducers: {
    setSelectedSearchQuery: (state, action) => {
      state.selectedSearchQuery = action.payload; // Update selected SearchQuery
    },

    setSelectedSearchQuery2: (state, action) => {
      state.selectedSearchQuery2 = action.payload; // Update selected SearchQuery
    },
    
  },
});

export const { setSelectedSearchQuery,setSelectedSearchQuery2 } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
