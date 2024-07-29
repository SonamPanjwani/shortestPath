export type SpotType = {
  x: number;
  y: number;
  f: number;
  isStart: boolean;
  isEnd: boolean;
  isBlocked: boolean;
  g: number;
  h: number;
  neighbours: SpotType[];
  previous?: SpotType | null;
  addneighbours: (grid: GridType) => void;
  parent?: SpotType | null;
};
export type GridType = SpotType[][];
export type GridBoxType = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
  isVisited: boolean;
  isBlocked: boolean;
  onClick: () => void;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
// types definition for slice
export type gridType = {
  row: number;
  col: number;
};
export type GridState = {
  row: number;
  col: number;
  start: gridType | null;
  end: gridType | null;
};
