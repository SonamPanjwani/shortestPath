import React, { useEffect, useState } from "react";
import { useAppSelector } from "../reduxStore/store";
import { useDispatch } from "react-redux";
import { displayInfo } from "../reduxStore/displaySlice";

function Infobox() {
  const stateDisplay = useAppSelector((state) => state.display);
  const display = stateDisplay.display;
  const dispatch = useDispatch();
  const [disp, setDisp] = useState<boolean>(true);

  useEffect(() => {
    setDisp(display);
  }, [display]);

  const handleClick = () => {
    console.log(disp);
    dispatch(displayInfo(false));
  };

  return (
    <>
      {display && (
        <div className="flex flex-col items-center bg-gray-800 text-stone-200 text-lg p-3 h-fit">
          <div>
            <p className="underline text-center text-2xl">
              Path Visualiser Project
            </p>
            <p>
              This project aims to find the shortest path between two points
              using A* Algorithm .
            </p>
            <ul className="list-disc pl-5 ">
              <li>
                You can select the layout of the grid specifying number of
                columns and number of rows on the left side of the page.
              </li>
              <li>
                You can also make use of the default grid by clicking on the{" "}
                <strong>Use Default Grid</strong> button.
              </li>
              <li>Mark the Start and End points on the grid.</li>
              <li>
                Green Grid represents the Start and Red grid represents the End.
              </li>
              <li>
                To Set the blockage path manually right click on the grid cell.
              </li>
              <li>To make random blockages click on the Set Random Blockage</li>
              <li>
                Click on the Run button to find the shortest path between the
                two points.
              </li>
            </ul>
          </div>
          <button
            className="m-4 text-center rounded-lg bg-slate-300 p-2 text-gray-800 text-sm"
            onClick={handleClick}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Infobox;
