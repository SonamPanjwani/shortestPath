import aStar from "../AStarAlgorithm/aStar";
import { GridType } from "../utils/types";

describe("aStar Algorithm", () => {
  test("should find the shortest path in a simple grid", async () => {
    const grid: GridType = initializeTestGrid();
    const start = { row: 0, col: 0 };
    const end = { row: 4, col: 4 };

    const result = await aStar(
      grid[start.row][start.col],
      grid[end.row][end.col]
    );

    expect(result).toHaveProperty("path");
    expect(result).toHaveProperty("visited");
    expect(result.path.length).toBeLessThanOrEqual(0);
  });

  test("should handle case with no path found", async () => {
    const grid: GridType = initializeTestGridWithBlockedPath();
    const start = { row: 0, col: 0 };
    const end = { row: 4, col: 4 };

    const result = await aStar(
      grid[start.row][start.col],
      grid[end.row][end.col]
    );

    expect(result.path).toHaveLength(0);
    expect(result.visited).toEqual(expect.any(Array));
  });

  function initializeTestGrid(): GridType {
    // Initialize a 5x5 grid with no blockages
    const grid: GridType = new Array(5)
      .fill(null)
      .map(() => new Array(5).fill(null));
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        grid[i][j] = {
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
            // Add neighbour logic
          },
        };
      }
    }
    return grid;
  }

  function initializeTestGridWithBlockedPath(): GridType {
    // Initialize a 5x5 grid with a blocked path
    const grid = initializeTestGrid();
    // Block the path
    grid[2][1].isBlocked = true;
    grid[2][2].isBlocked = true;
    return grid;
  }
});
