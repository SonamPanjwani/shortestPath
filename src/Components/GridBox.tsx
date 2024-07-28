import React from "react";
import { GridBoxType } from "../utils/types";
const GridBox: React.FC<GridBoxType> = ({
  row,
  col,
  isStart,
  isEnd,
  onClick,
}) => {
  const getBackgroundColor = () => {
    if (isStart) return "bg-green-500";
    if (isEnd) return "bg-red-500";
    return "bg-white";
  };
  return (
    <>
      <div
        className={`w-5 h-5 sm:w-7 sm:h-7 border-2 border-black ${getBackgroundColor()}`}
        id={`node-${row + 1}-${col + 1}`}
        onClick={onClick}
      ></div>
    </>
  );
};

export default GridBox;
