import React, { useEffect, useState } from "react";
import { useAppSelector } from "../reduxStore/store";
import GridBox from "./Cell";
import { useDispatch } from "react-redux";
import { EndGrid, startGrid } from "../reduxStore/gridSlice";
import { SpotType, GridType } from "../utils/types";

import PathFinding from "./PathFinding";

function Grid() {
  const row = useAppSelector((state) => state.grid.row);
  const col = useAppSelector((state) => state.grid.col);
  const display = useAppSelector((state) => state.display);
  const dispatch = useDispatch();
  const [grids, setGrids] = useState<GridType>([]);
  const [start, setStart] = useState<{ row: number; col: number } | null>(null);
  const [end, setEnd] = useState<{ row: number; col: number } | null>(null);
  const [pathState, setPath] = useState<SpotType[]>([]);
  const [visitedCell, setVisited] = useState<SpotType[]>([]);
  const [block, setBlock] = useState<boolean>(false);

  useEffect(() => {
    const grid = initializeGrid();
    setGrids(grid);
  }, [row, col]);

  const initializeGrid = (): GridType => {
    const grid: GridType = new Array(row);
    for (let i = 0; i < row; i++) {
      grid[i] = new Array(col).fill(null);
    }
    createSpot(grid);
    addNeighbour(grid);

    return grid;
  };

  const createSpot = (grid: GridType) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j] = Spot(i, j, row, col);
      }
    }
  };

  function Spot(i: number, j: number, row: number, col: number): SpotType {
    return {
      x: i,
      y: j,
      isStart: false,
      isEnd: false,
      isBlocked: false,
      f: 0,
      g: 0,
      h: 0,
      neighbours: [],
      previous: undefined,
      parent: null,
      addneighbours: function (grid: GridType) {
        let i = this.x;
        let j = this.y;
        if (i > 0) this.neighbours.push(grid[i - 1][j]);
        if (i < row - 1) this.neighbours.push(grid[i + 1][j]);
        if (j > 0) this.neighbours.push(grid[i][j - 1]);
        if (j < col - 1) this.neighbours.push(grid[i][j + 1]);
      },
    };
  }

  const addNeighbour = (grids: GridType) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (grids[i][j]) {
          grids[i][j].addneighbours(grids);
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
  const handleSetBlockages = () => {
    const updatedGrid = [...grids];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (Math.random() < 0.2) {
          updatedGrid[i][j].isBlocked = true;
        }
      }
    }
    setGrids(updatedGrid);
    setBlock(true);
  };
  const handleRightClick = (
    event: React.MouseEvent,
    row: number,
    col: number
  ) => {
    event.preventDefault();
    const newGrids = [...grids];
    newGrids[row][col].isBlocked = !newGrids[row][col].isBlocked;
    setGrids(newGrids);
  };
  const gridWithValues = (
    <div>
      {grids.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((col, colIndex) => (
            <GridBox
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              isStart={start?.row === rowIndex && start?.col === colIndex}
              isEnd={end?.row === rowIndex && end?.col === colIndex}
              isPath={pathState.some(
                (spot) => spot.x === rowIndex && spot.y === colIndex
              )}
              isVisited={visitedCell.some(
                (spot) => spot.x === rowIndex && spot.y === colIndex
              )}
              isBlocked={grids[rowIndex][colIndex]?.isBlocked || false}
              onClick={() => handleGridBoxClick(rowIndex, colIndex)}
              onContextMenu={(event: React.MouseEvent) =>
                handleRightClick(event, rowIndex, colIndex)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );

  const handleRefreshBtn = () => {
    setStart(null);
    setEnd(null);
    setPath([]);
    setVisited([]);
    setBlock(false);
    //dispatch(gridInfo({ row: 0, col: 0 }));
    dispatch(startGrid({ row: 0, col: 0 }));
    dispatch(EndGrid({ row: 0, col: 0 }));
    const grid = initializeGrid();
    setGrids(grid);
  };

  return (
    <div>
      {!display.display && (
        <div className="flex flex-col items-center m-4 p-4 bg-gray-300 rounded-lg ">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row m-2 font-semibold text-stone-800 gap-4 ">
              <div className="bg-green-800 p-1 rounded-lg">Start Point</div>
              <div className="bg-red-700 p-1 rounded-lg">End Point</div>
              <div className="bg-red-200 p-1 rounded-lg">Visited Grids</div>
              <div className="bg-green-600 p-1 rounded-lg">Shortest Path</div>
              <div className="bg-gray-500 p-1 rounded-lg">Blocked Grids</div>
            </div>
            <p className="bg-gray-800 text-stone-200 text-center rounded-lg">
              Color Codes
            </p>
          </div>
          <div className="flex flex-row">
            <PathFinding
              grid={grids}
              start={start}
              end={end}
              setPath={setPath}
              setVisited={setVisited}
            />
            <button
              className="m-4  text-center rounded-lg bg-slate-800 p-2 text-stone-200 text-sm"
              onClick={handleRefreshBtn}
            >
              Refresh
            </button>
            {!block && (
              <button
                className="m-4  text-center rounded-lg bg-slate-800 p-2 text-stone-200 text-sm"
                onClick={handleSetBlockages}
              >
                Set Random Blockages
              </button>
            )}
            <div className="m-4  text-center rounded-lg bg-slate-800 p-2 text-stone-200 text-sm">
              Right Click to add block Manually
            </div>
          </div>

          <div className="m-auto w-full max-w-4xl mt-4">{gridWithValues}</div>
        </div>
      )}
    </div>
  );
}

export default Grid;
