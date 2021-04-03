import React from "react";

import "./Node.css";

const Node = ({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
  id,
}) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  if (isStart || isFinish)
    return (
      <div
        id={id}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        {isStart && (
          <img src="/icons/start-icon.svg" alt="" width="34" height="34" />
        )}
        {isFinish && (
          <img src="/icons/finish-icon.svg" width="34" height="34" alt="" />
        )}
      </div>
    );
  return (
    <div
      id={id}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  );
};
export default Node;
