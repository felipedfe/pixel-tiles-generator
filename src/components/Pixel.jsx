import React, { useState } from 'react';
import styled from 'styled-components';

const StyledPixel = styled.button`
  width: ${(props) => props.pixelSize}px;
  height: ${(props) => props.pixelSize}px;
  background-color: ${(props) => props.currentColor};
  border: solid #474747 1px;
  /* background-color: #0d0d0d; */
  /* border: none; */

  &:active {
    background-color: #c1c1c1;
  }
`

function Pixel({ pixelSize, selectedColor }) {
  const [currentColor, setCurrentColor] = useState("transparent");

  return (
    <StyledPixel
      className="pixel"
      onClick={() => setCurrentColor(selectedColor)}
      currentColor={currentColor}
      pixelSize={pixelSize}
    />

  )
};

export default Pixel;
