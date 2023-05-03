import React, { useState } from 'react';
import styled from 'styled-components';
import Pixel from './components/Pixel';
import { CirclePicker } from 'react-color'
import domtoimage from 'dom-to-image';
import { saveAs } from "file-saver";
import './App.css';

const Main = styled.main`
  padding: 3rem;
`

const Board = styled.div`
width: ${(props) => props.boardSize}px;
`

const Row = styled.div`
display: flex;
`
const GenerateImageBtn = styled.button`

`

function App() {
  const [selectedColor, setSelectedColor] = useState("#ba68c8");


  const boardSize = 400;
  const numberOfColumnsAndRows = 15;

  const boardGrid = new Array(numberOfColumnsAndRows).fill("");
  const pixelSize = (boardSize / numberOfColumnsAndRows).toFixed(2);
  console.log(pixelSize);

  const colorSet = [
    '#D9E3F0',
    '#F47373',
    '#697689',
    '#37D67A',
    '#2CCCE4',
    '#555555',
    '#dce775',
    '#ff8a65',
    '#ba68c8',
    '#0c2ef0',
    '#763ee6',
    '#000000',
  ]

  const handleChange = ({ hex }) => {
    console.log(hex);
    setSelectedColor(hex)
  };

  const handleGenerate = () => {
    domtoimage.toBlob(document.getElementById("image")).then(function (blob) {
      saveAs(blob, `${Math.floor(Math.random() * 1000)}`);
    });
  };

  return (
    <Main>
      <CirclePicker
        colors={colorSet}
        onChange={(e) => handleChange(e)}
        // width='200px'
        width='100%'
        circleSize={45}
      />

      <section id="image">
        <Board boardSize={boardSize}>
          {
            boardGrid.map(() => {
              return (
                <Row>
                  {boardGrid.map(() => <Pixel selectedColor={selectedColor} pixelSize={pixelSize} />)}
                </Row>
              )
            })
          }
        </Board>
      </section>
      <GenerateImageBtn
        type="button"
        onClick={handleGenerate}
      >
        Generate Image
      </GenerateImageBtn>
    </Main>
  );
}

export default App;
