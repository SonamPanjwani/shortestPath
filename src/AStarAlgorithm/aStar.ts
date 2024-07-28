import { SpotType } from "../utils/types";

function aStar(startPoint: SpotType, endPoint: SpotType) {
  console.log("A* algorithm activated");

  let openSet: SpotType[] = [];
  let closeSet: SpotType[] = [];
  let path: SpotType[] = [];

  // Initialize start point
  startPoint.g = 0;
  startPoint.h = heuristic(startPoint, endPoint);
  startPoint.f = startPoint.g + startPoint.h;
  startPoint.previous = null;

  openSet.push(startPoint);

  while (openSet.length > 0) {
    console.log("Open set length:", openSet.length);

    // Find the node with the lowest 'f' value
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    let current = openSet[leastIndex];

    // When we reach the end point
    if (current.x === endPoint.x && current.y === endPoint.y) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      console.log("Path found:", path);
      return path.reverse(); // Return the constructed path
    }

    // Remove current from openSet and add to closeSet
    openSet = openSet.filter((e) => e !== current);
    closeSet.push(current);

    let neighbors = current.neighbours;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (neighbor && !closeSet.includes(neighbor)) {
        let tempG = current.g + 1;
        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, endPoint);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }

  console.log("No path found");
  return [];
}

function heuristic(a: SpotType, b: SpotType) {
  // Manhattan distance
  return Math.abs(a.x - b.x) + Math.abs(b.y - b.y);
}

export default aStar;
