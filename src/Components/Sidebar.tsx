import React, { useEffect, useState } from "react";
import { useAppSelector } from "../reduxStore/store";
import { useDispatch } from "react-redux";
import { displayInfo } from "../reduxStore/displaySlice";
import { gridInfo } from "../reduxStore/gridSlice";
import { gridType } from "../utils/types";

function Sidebar() {
  //const display = useAppSelector((state) => state.display);
  //console.log(display);
  const rowState = useAppSelector((state) => state.grid.row);
  //console.log(rowState);
  const colState = useAppSelector((state) => state.grid.col);
  //console.log(colState);
  const [rows, setRows] = useState<number>(rowState);
  const [cols, setCols] = useState<number>(colState);

  const dispatch = useDispatch();
  const startState = useAppSelector((state) => state.grid.start);
  const EndState = useAppSelector((state) => state.grid.end);
  useEffect(() => {
    setCols(colState);
    setRows(rowState);
  }, [colState, rowState]);

  const handleClick = () => {
    dispatch(displayInfo(true));
  };
  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCol = parseInt(e.target.value);
    //console.log(newCol);
    if (!isNaN(newCol) && newCol >= 0) {
      setCols(newCol);
      dispatch(gridInfo({ row: rows, col: newCol }));
    } else if (e.target.value === "") {
      setCols(0);
      dispatch(gridInfo({ row: rows, col: 0 }));
    }
  };
  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRow = parseInt(e.target.value);
    //console.log(newRow);
    if (!isNaN(newRow) && newRow >= 0) {
      setRows(newRow);
      dispatch(gridInfo({ row: newRow, col: cols }));
    } else if (e.target.value === "") {
      setRows(0);
      dispatch(gridInfo({ row: 0, col: cols }));
    }
  };
  const handleDefaultGrid = () => {
    setRows(15);
    setCols(30);
    dispatch(gridInfo({ row: 10, col: 15 }));
  };
  const formatGridValue = (grid: gridType | null) => {
    if (grid) {
      return `${grid.row}, ${grid.col}`;
    }
    return "";
  };

  return (
    <aside className=" flex flex-col  bg-gray-800 text-stone-200 w-1/4 sm:w-[175px] h-auto min-h-screen sm:h-auto border-gray-800">
      <button
        className="m-4 text-center rounded-lg bg-slate-300 p-2 text-gray-800 text-sm"
        onClick={handleClick}
      >
        Instructions
      </button>
      <div className="p-2 ">
        <p className="mb-2 text-center underline"> Specify Grid layout</p>
        <div className="flex flex-col sm:flex-row gap-3 ml-1 justify-between">
          <label>Columns</label>
          <input
            type="text"
            className="w-1/2 text-xs p-1 ml-1 mb-2 text-stone-800 "
            placeholder="No. of columns"
            value={cols || ""}
            onChange={handleColChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-between ml-1">
          <label>Rows</label>
          <input
            type="text"
            className="w-1/2 text-xs p-1 ml-1 text-stone-800 "
            placeholder="No. of Rows"
            value={rows || ""}
            onChange={handleRowChange}
          />
        </div>
        <div>
          <button
            className="m-4 text-center rounded-lg bg-slate-300 p-2 text-gray-800 text-sm"
            onClick={handleDefaultGrid}
          >
            Use Default Grid
          </button>
        </div>
      </div>
      <div className="p-2 flex flex-col items-center ">
        <p className="mb-2 text-center underline">Start/End Points</p>
        <div className="flex flex-col sm:flex-row gap-3 ml-1 justify-between">
          <label>Start</label>
          <input
            type="text"
            className="w-1/2 text-xs p-1 ml-1 mb-2 "
            placeholder="Start Grid"
            disabled
            value={formatGridValue(startState)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-between ml-1">
          <label>End</label>
          <input
            type="text"
            className="w-1/2 text-xs p-1 ml-1 "
            placeholder="End Grid"
            disabled
            value={formatGridValue(EndState)}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
