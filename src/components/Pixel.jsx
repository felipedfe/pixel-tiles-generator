import React, { useState } from 'react';
import styled from 'styled-components';

const StyledPixel = styled.button`
  width: ${(props) => props.pixelSize}px;
  height: ${(props) => props.pixelSize}px;
  background-color: ${(props) => props.currentColor};
  border: solid gray 1px;

  &:active {
    background-color: aqua;
  }
`

function Pixel({ pixelSize, selectedColor }) {
  const [currentColor, setCurrentColor] = useState("#ffffff");

  return (
    <StyledPixel
      onClick={() => setCurrentColor(selectedColor)}
      currentColor={currentColor}
      pixelSize={pixelSize}
    />

  )
};

export default Pixel;
