export const getInitialGrid = (width, height) => {
  const board = [];
  for (let row = 0; row < height; row++) {
    const currentRow = [];
    for (let col = 0; col < width; col++) {
      currentRow.push(createNode(col, row));
    }
    board.push(currentRow);
  }
  return board;
};

export const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export const getNewGridWithWallToggled = (grid, row, col) => {
  const newBoard = grid.slice();
  const node = newBoard[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newBoard[row][col] = newNode;
  return newBoard;
};
