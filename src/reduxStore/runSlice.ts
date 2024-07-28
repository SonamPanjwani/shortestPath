import { createSlice } from "@reduxjs/toolkit";

type runType = {
  run: boolean;
};
const initialState: runType = {
  run: false,
};
export const runSlice = createSlice({
  name: "run",
  initialState,
  reducers: {
    runStatus(state, action) {
      state.run = action.payload;
      //console.log(action.payload);
    },
  },
});
export const { runStatus } = runSlice.actions;
export default runSlice.reducer;
