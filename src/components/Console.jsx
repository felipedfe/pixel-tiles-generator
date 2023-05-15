import React from "react";
import { CirclePicker } from "react-color";
import Pixel from "./Pixel";
import * as s from "../styles/Console.styled";

function Console({
  boardSize,
  boardGrid,
  setMousePressed,
  handleColorChange,
  colorSet,
  pixelSize,
  mousePressed,
  selectedColor,
}) {
  return (
    <s.Console>
      <s.Board
        onMouseDown={() => setMousePressed(true)}
        onMouseUp={() => setMousePressed(false)}
        id="board"
        boardSize={boardSize}
      >
        {boardGrid.map((_, index) => {
          return (
            <s.Row key={index}>
              {boardGrid.map((_, index) => (
                <Pixel
                  key={index}
                  mousePressed={mousePressed}
                  selectedColor={selectedColor}
                  pixelSize={pixelSize}
                />
              ))}
            </s.Row>
          );
        })}
      </s.Board>
      <CirclePicker
        colors={colorSet}
        onChange={(e) => handleColorChange(e)}
        width="185px"
        // width='100%'
        circleSize={45}
      />
    </s.Console>
  );
}

export default Console;
