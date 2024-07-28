import { createSlice } from "@reduxjs/toolkit";

type displayType = {
  display: boolean;
};
const initialState: displayType = {
  display: true,
};
export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    displayInfo(state, action) {
      state.display = action.payload;
      //console.log(action.payload);
    },
  },
});
export const { displayInfo } = displaySlice.actions;
export default displaySlice.reducer;
