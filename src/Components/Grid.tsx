import React, { useEffect, useState } from "react";
import { useAppSelector } from "../reduxStore/store";
import GridBox from "./GridBox";
import { useDispatch } from "react-redux";
import { EndGrid, startGrid } from "../reduxStore/gridSlice";
import { SpotType } from "../utils/types";
import { GridType } from "../utils/types";

import aStar from "../AStarAlgorithm/aStar";

function Grid() {
  const row = useAppSelector((state) => state.grid.row);
  const col = useAppSelector((state) => state.grid.col);
  const display = useAppSelector((state) => state.display);
  //console.log(display);
  //console.log(runState);
  const dispatch = useDispatch();
  const [grids, setGrids] = useState<GridType>([]);
  const [start, setStart] = useState<{ row: number; col: number } | null>(null);
  const [end, setEnd] = useState<{ row: number; col: number } | null>(null);
  const [runAlgo, setrunAlgo] = useState<boolean>(true);

  useEffect(() => {
    const grid = initializeGrid();
    setGrids(grid);
  }, [row, col]);

  const handleClick = () => {
    if (start && end) {
      console.log("inside 2nd if");
      const startPoint = grids[start.row]?.[start.col];
      const EndPoint = grids[end.row]?.[end.col];
      console.log(startPoint);
      console.log(EndPoint);
      if (startPoint && EndPoint) {
        const path = aStar(startPoint, EndPoint);
        if (path.length > 0) {
          console.log(path);
          // Visualize the path
          setrunAlgo(false);
        } else {
          console.log("No path found");
        }
      } else {
        console.error("Start or End point is undefined");
      }
    } else {
      console.error("Start or End point is not set");
    }
  };

  const initializeGrid = (): GridType => {
    const grid: GridType = new Array(row);

    for (let i = 0; i < row; i++) {
      grid[i] = new Array(col).fill(null);
    }
    createSpot(grid);

    addNeighbour(grid);
    handleClick();

    return grid;
  };
  const createSpot = (grid: GridType) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j] = Spot(i, j, row, col);
      }
    }
  };

  //Spot constructor
  function Spot(i: number, j: number, row: number, col: number): SpotType {
    return {
      x: i,
      y: j,
      isStart: false,
      isEnd: false,
      f: 0,
      g: 0,
      h: 0,
      neighbours: [],
      previous: undefined,
      parent: null,
      //Add Neighbours
      addneighbours: function (grid: GridType) {
        if (start && end) {
          let i = this.x;
          let j = this.y;
          if (i > 0) this.neighbours.push(grid[i - 1][j]);
          if (i < row - 1) this.neighbours.push(grid[i + 1][j]);
          if (j > 0) this.neighbours.push(grid[i][j - 1]);
          if (j < col - 1) this.neighbours.push(grid[i][j + 1]);
        }
      },
    };
  }

  //Add Neighbour function from Spot function
  const addNeighbour = (grid: GridType) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (grid[i][j]) {
          grid[i][j].addneighbours(grid);
        }
      }
    }
  };
  const handleGridBoxClick = (row: number, col: number) => {
    if (!start) {
      setStart({ row, col });
      dispatch(startGrid({ row, col }));
    } else if (!end) {
      setEnd({ row, col });
      dispatch(EndGrid({ row, col }));
    } else {
      // Resetting when both start and end are already set
      setStart({ row, col });
      dispatch(startGrid({ row, col }));
      setEnd(null);
      dispatch(EndGrid({ row: -1, col: -1 }));
    }
  };
  //console.log(grids);
  //GridBoxes with values
  const gridWithValues = (
    <div>
      {grids.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="flex">
            {row.map((col, colIndex) => {
              return (
                <GridBox
                  key={colIndex}
                  row={rowIndex}
                  col={colIndex}
                  isStart={start?.row === rowIndex && start?.col === colIndex}
                  isEnd={end?.row === rowIndex && end?.col === colIndex}
                  onClick={() => handleGridBoxClick(rowIndex, colIndex)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {!display.display && (
        <div className=" flex flex-col items-start ">
          <button
            className="m-4  text-center rounded-lg bg-gray-800 p-2 text-stone-300 text-lg font-semibold "
            onClick={handleClick}
          >
            Visualise
          </button>
          <div className="m-auto w-full">{gridWithValues}</div>
        </div>
      )}
    </div>
  );
}
export default Grid;
