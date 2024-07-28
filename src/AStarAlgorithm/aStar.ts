import { SpotType } from "../utils/types";

function aStar(startPoint: SpotType, endPoint: SpotType) {
  console.log("a star activated");
  let openSet: SpotType[] = [];
  let closeSet: SpotType[] = [];
  let path: SpotType[] = [];

  openSet.push(startPoint);

  while (openSet.length > 0) {
    console.log("I m in while");
    let leastIndex = 0;
    console.log(openSet.length);
    for (let i = 0; i < openSet.length; i++) {
      console.log("I m in For", i);
      console.log(openSet);
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
        console.log(i);
      }
      console.log(openSet);
      console.log(openSet);
    }

    let current = openSet[leastIndex];

    // when we reach the end Point
    if (current.x === endPoint.x && current.y === endPoint.y) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      console.log(path);
      console.log("Done! Path Found");
      return path; // Return the constructed path
    }

    openSet = openSet.filter((e) => e !== current);
    closeSet.push(current);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (neighbour) {
        // Check if neighbour is not null
        if (!closeSet.includes(neighbour)) {
          let tempG = current.g + 1;
          let newPath = false;
          if (openSet.includes(neighbour)) {
            if (tempG < neighbour.g) {
              neighbour.g = tempG;
              newPath = true;
            }
          } else {
            neighbour.g = tempG;
            newPath = true;
            openSet.push(neighbour);
          }
          if (newPath) {
            neighbour.h = heuristic(neighbour, endPoint);
            neighbour.f = neighbour.g + neighbour.h;
            neighbour.previous = current;
          }
        }
      }
    }
  }

  // If the loop exits without finding a path, return an empty array
  return [];
}
function heuristic(a: SpotType, b: SpotType) {
  //MAnhattan formula
  let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  return d;
}

export default aStar;
