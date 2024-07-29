import aStar from "../AStarAlgorithm/aStar";
import { SpotType, GridType } from "../utils/types";

interface PathFindingProps {
  grid: GridType;
  start: { row: number; col: number } | null;
  end: { row: number; col: number } | null;
  setPath: (path: SpotType[]) => void;
  setVisited: (visited: SpotType[]) => void;
}

function PathFinding({
  grid,
  start,
  end,
  setPath,
  setVisited,
}: PathFindingProps) {
  // useEffect(() => {
  //   console.log("path", pathState);
  //   console.log("visited", visitedCell);
  // }, [pathState, visitedCell]);

  const handleClick = async () => {
    console.log("before the A Call", grid);

    if (start && end) {
      const startPoint = grid[start.row]?.[start.col];
      const endPoint = grid[end.row]?.[end.col];

      if (startPoint && endPoint) {
        const result = await aStar(startPoint, endPoint);
        if (result.path.length > 0) {
          console.log("Path:", result.path);
          setPath(result.path);
          setVisited(result.visited);
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

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row">
        <button
          className="m-4 text-center rounded-lg bg-gray-800 p-2 text-stone-300 text-lg font-semibold"
          onClick={handleClick}
        >
          Visualise
        </button>
      </div>
    </div>
  );
}

export default PathFinding;
