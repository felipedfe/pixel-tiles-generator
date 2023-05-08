import React, { useState } from 'react';
import styled from 'styled-components';

const StyledPixel = styled.button`
  width: ${(props) => props.pixelSize}px;
  height: ${(props) => props.pixelSize}px;
  background-color: ${(props) => props.currentColor};
  border: solid #474747 1px;
`

function Pixel({ pixelSize, selectedColor, mousePressed }) {
  const [currentColor, setCurrentColor] = useState("transparent");

  return (
    <StyledPixel
      className="pixel"
      onMouseDown={() => setCurrentColor(selectedColor)}
      onMouseOver={mousePressed ? () => setCurrentColor(selectedColor) : () => {}}
      currentColor={currentColor}
      pixelSize={pixelSize}
    />
  )
};

export default Pixel;
