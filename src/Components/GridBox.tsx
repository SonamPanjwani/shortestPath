import React from "react";
import { GridBoxType } from "../utils/types";
const GridBox: React.FC<GridBoxType> = ({
  row,
  col,
  isStart,
  isEnd,
  isPath,
  isVisited,
  isBlocked,
  onClick,
}) => {
  const getBackgroundColor = () => {
    if (isStart) return "bg-green-800";
    if (isBlocked) return "bg-gray-500";
    else if (isEnd) return "bg-red-700";
    else if (isPath) return "bg-green-600";
    else if (isVisited) return "bg-red-200 ";
    return "bg-white";
  };

  return (
    <>
      <div
        className={`w-5 h-5 sm:w-7 sm:h-7 border-2 border-black ${getBackgroundColor()} transition duration-300 ease-in-out`}
        id={`node-${row + 1}-${col + 1}`}
        onClick={onClick}
      ></div>
    </>
  );
};

export default GridBox;
