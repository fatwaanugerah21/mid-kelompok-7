import { nodeBaseID } from "../consts";

import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

function animateDijkstra(
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  animationSpeed = 50
) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    // We are in the end
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder, animationSpeed * 2);
      }, animationSpeed * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      const nodeDOM = document.getElementById(
        `${nodeBaseID}-${node.row}-${node.col}`
      );
      nodeDOM?.classList.add("node-visited");
    }, animationSpeed * i);
  }
}

function animateShortestPath(nodesInShortestPathOrder, animationSpeed) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      const nodeDOM = document.getElementById(
        `${nodeBaseID}-${node.row}-${node.col}`
      );
      nodeDOM?.classList.add("node-shortest-path");
    }, animationSpeed * i);
  }
}

export function visualizeDijkstra(
  board,
  animationSpeed,
  startIndex,
  finsihIndex
) {
  const startNode = board[startIndex[0]][startIndex[1]];
  const finishNode = board[finsihIndex[0]][finsihIndex[1]];
  const visitedNodesInOrder = dijkstra(board, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animateDijkstra(
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    animationSpeed
  );
}
