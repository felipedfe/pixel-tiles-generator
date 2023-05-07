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
  const [deleteColor, setDeleteColor] = useState(false);

  const handleClick = () => {
    setDeleteColor((prevState) => !prevState);
    deleteColor ? setCurrentColor("transparent") : setCurrentColor(selectedColor);
  };

  return (
    <StyledPixel
      className="pixel"
      // onClick={() => setCurrentColor(selectedColor)}
      onClick={handleClick}
      currentColor={currentColor}
      pixelSize={pixelSize}
    />

  )
};

export default Pixel;
