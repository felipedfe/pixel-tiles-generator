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
  const [blobState, setBlobState] = useState("")

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

  const blobToBase64 = async (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const handleGenerate = async () => {
    const pixelsCollection = document.getElementsByClassName("pixel");
    const pixels = Array.from(pixelsCollection);
    pixels.forEach((pixel) => pixel.style.border = "none")

    // domtoimage.toBlob(document.getElementById("image")).then(function (blob) {
    //   saveAs(blob, `${Math.floor(Math.random() * 1000)}`);
    // });
    const blob = await domtoimage.toBlob(document.getElementById("board"));
    // var objectURL = URL.createObjectURL(blob);
    // console.log(objectURL)
    // setBlobState(objectURL)
    const test = await blobToBase64(blob);
    console.log("----->>>>", test.split(",")[1]);
    setBlobState(test)
    saveAs(blob, `${Math.floor(Math.random() * 1000)}`);

    pixels.forEach((pixel) => pixel.style.border = "solid gray 1px")
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
        <Board id='board' boardSize={boardSize}>
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
      <img alt="blob state" src={blobState}></img>
    </Main>
  );
}

export default App;
