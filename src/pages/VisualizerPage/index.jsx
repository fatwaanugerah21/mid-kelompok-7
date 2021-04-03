import React, { useEffect, useState } from "react";
import { visualizeDijkstra } from "../../utils/AlgoAnimator/dijsktra";
import Node from "../../components/Node";
import { nodeBaseID } from "../../utils/consts";

import { getInitialGrid } from "../../utils/functions";

import "./VisualizerPage.scss";

const VisualizerPage = () => {
  const [board, setBoard] = useState([]);
  const [boardWidth, setBoardWidth] = useState(36);
  const [boardHeight, setBoardHeight] = useState(15);
  const [startIndex] = useState([7, 5]);
  const [finishIndex] = useState([7, 30]);

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [moveFinish, setMoveFinish] = useState(false);
  const [moveStart, setMoveStart] = useState(false);

  const [animationSpeed, setAnimationSpeed] = useState(20);

  const [finishTime, setFinishTime] = useState("");

  function drawWall(row, col) {
    const nodeDOM = document.getElementById(`${nodeBaseID}-${row}-${col}`);
    nodeDOM?.classList.add("node-wall");
  }

  function checkIsStart(row, col) {
    return row === startIndex[0] && col === startIndex[1];
  }

  function checkIsFinish(row, col) {
    return row === finishIndex[0] && col === finishIndex[1];
  }

  function handleMouseDown(row, col) {
    if (checkIsStart(row, col)) {
      setMoveStart(true);
      return;
    }
    if (checkIsFinish(row, col)) {
      setMoveFinish(true);
      return;
    }
    board[row][col].isWall = true;
    drawWall(row, col);
    setMouseIsPressed(true);
  }

  function changeStartDOM(row, col) {
    removeVisitedNode();
    const oldStartDOM = document.getElementById(
      `${nodeBaseID}-${startIndex[0]}-${startIndex[1]}`
    );
    oldStartDOM?.classList.remove("node-start");
    const nodeDOM = document.getElementById(`${nodeBaseID}-${row}-${col}`);
    nodeDOM?.classList.add("node-start");
  }
  function changeFinishDOM(row, col) {
    removeVisitedNode();
    const oldFinishDOM = document.getElementById(
      `${nodeBaseID}-${finishIndex[0]}-${finishIndex[1]}`
    );
    oldFinishDOM?.classList.remove("node-finish");
    const nodeDOM = document.getElementById(`${nodeBaseID}-${row}-${col}`);
    nodeDOM?.classList.add("node-finish");
  }
  function handleMouseEnter(row, col) {
    if (checkIsStart(row, col) || checkIsFinish(row, col)) return;
    if (moveStart) {
      changeStartDOM(row, col);
      startIndex[0] = row;
      startIndex[1] = col;
      return;
    }
    if (moveFinish) {
      changeFinishDOM(row, col);
      finishIndex[0] = row;
      finishIndex[1] = col;
      return;
    }
    if (!mouseIsPressed) return;
    drawWall(row, col);
    board[row][col].isWall = true;
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
    setMoveStart(false);
    setMoveFinish(false);
  }

  function removeVisitedNode() {
    const allNodes = document.querySelectorAll(".node");
    allNodes?.forEach((node) => {
      node.classList.remove("node-visited");
      node.classList.remove("node-shortest-path");
    });
  }

  function createNewBoard() {
    setBoard(getInitialGrid(boardWidth, boardHeight));
  }

  function startAlgorithm() {
    setFinishTime("");
    removeVisitedNode();
    setFinishTime(
      visualizeDijkstra(board, animationSpeed, startIndex, finishIndex)
    );
  }

  useEffect(() => {
    setBoard(getInitialGrid(boardWidth, boardHeight));
  }, [boardWidth, boardHeight]);

  const boardDOM = board.map((row, rowIdx) => {
    return (
      <div className="node-row" key={rowIdx}>
        {row.map((node, nodeIdx) => {
          const { row, col, isWall } = node;
          return (
            <Node
              key={nodeIdx}
              col={col}
              isFinish={row === finishIndex[0] && col === finishIndex[1]}
              isStart={row === startIndex[0] && col === startIndex[1]}
              isWall={isWall}
              mouseIsPressed={mouseIsPressed}
              onMouseDown={(row, col) => handleMouseDown(row, col)}
              onMouseEnter={(row, col) => handleMouseEnter(row, col)}
              onMouseUp={() => handleMouseUp()}
              row={row}
              id={`${nodeBaseID}-${row}-${col}`}
            ></Node>
          );
        })}
      </div>
    );
  });

  return (
    <div className="visualizer-page">
      <header>
        <button
          className="reset"
          onClick={() => {
            removeVisitedNode();
            setFinishTime("");
            createNewBoard();
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            startAlgorithm();
          }}
        >
          Animate Dijsktra
        </button>
        <div className="controller">
          <div className="animation-speed-input input-container">
            <label htmlFor="speed">Animation Speed : </label>
            <input
              type="number"
              value={animationSpeed}
              min="10"
              style={{ marginTop: "10px" }}
              onChange={(e) => setAnimationSpeed(e.target.value)}
            />
          </div>
          <div className="board-size-input input-container">
            <label className="width-input-container" htmlFor="width">
              Lebar :{" "}
            </label>
            <input
              type="number"
              value={boardWidth}
              style={{ marginLeft: "8px" }}
              onChange={(e) => setBoardWidth(e.target.value)}
            />
            <label className="height-input-container" htmlFor="width">
              Tinggi :{" "}
            </label>
            <input
              type="number"
              value={boardHeight}
              style={{ marginLeft: "8px" }}
              onChange={(e) => setBoardHeight(e.target.value)}
            />
          </div>
        </div>
      </header>
      {finishTime && (
        <h3 className="finish-time">Finish dalam {finishTime}ms</h3>
      )}
      <main>
        <div className="grid">{boardDOM}</div>
      </main>
    </div>
  );
};
export default VisualizerPage;
