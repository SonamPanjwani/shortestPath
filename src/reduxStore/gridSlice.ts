import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gridType, GridState } from "../utils/types";
const initialState: GridState = {
  row: 0,
  col: 0,
  start: null,
  end: null,
};
export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    gridInfo(state, action: PayloadAction<gridType>) {
      state.row = action.payload.row;
      state.col = action.payload.col;
      // console.log(state);
    },
    startGrid(state, action: PayloadAction<gridType>) {
      // console.log(action.payload);
      state.start = action.payload;
    },
    EndGrid(state, action: PayloadAction<gridType>) {
      state.end = action.payload;
    },
  },
});
export const { gridInfo, startGrid, EndGrid } = gridSlice.actions;
export default gridSlice.reducer;
