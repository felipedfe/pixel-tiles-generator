import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Pixel from './components/Pixel';
import { CirclePicker } from 'react-color'
import domtoimage from 'dom-to-image';
import { saveAs } from "file-saver";
import { initializeApp } from "firebase/app";
import './App.css';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCb1_A3Zox4ZPFIlgCaoRORc4QE4pucxAQ",
  authDomain: "pixel-art-react-c5e9c.firebaseapp.com",
  projectId: "pixel-art-react-c5e9c",
  storageBucket: "pixel-art-react-c5e9c.appspot.com",
  messagingSenderId: "882241237101",
  appId: "1:882241237101:web:dc23d651fd65f4b863cf64",
  measurementId: "G-2E7DH2M8M5"
});

const Main = styled.main`
  padding: 3rem;
  /* background-color: #2d2d2d; */
`

const Input = styled.input`
`

const Console = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 3rem;
  /* flex-direction: column; */
`

const Board = styled.section`
  width: ${(props) => props.boardSize}px;
  background-color: #2d2d2d;
`

const Row = styled.div`
  display: flex;
  z-index: 99;
`
const GenerateImageBtn = styled.button`

`

function App() {
  const [selectedColor, setSelectedColor] = useState("#ba68c8");
  const [blobState, setBlobState] = useState("");
  const [resolution, setResolution] = useState(10);
  const [boardGrid, setBoardGrid] = useState([]);
  const [pixelSize, setPixelSize] = useState(0);

  const boardSize = 400;
  // const numberOfColumnsAndRows = 15;

  // const boardGrid = new Array(resolution).fill("");
  // const pixelSize = (boardSize / resolution).toFixed(2);
  // console.log(pixelSize);

  useEffect(() => {
    setBoardGrid(new Array(resolution).fill(""));
    setPixelSize((boardSize / resolution).toFixed(2));
  }, [resolution]);

  const colorSet = [
    '#D9E3F0',
    '#F47373',
    '#697689',
    '#196b00',
    '#2CCCE4',
    '#555555',
    '#dce775',
    '#ff8a65',
    '#ba68c8',
    '#0c2ef0',
    '#763ee6',
    '#ffffff',
    '#000000',
    '#25e79c',

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
    const board = document.getElementById("board");
    const pixels = Array.from(pixelsCollection);
    pixels.forEach((pixel) => pixel.style.border = "none")
    board.style.backgroundColor = "transparent";

    // domtoimage.toBlob(document.getElementById("image")).then(function (blob) {
    //   saveAs(blob, `${Math.floor(Math.random() * 1000)}`);
    // });
    const blob = await domtoimage.toBlob(document.getElementById("board"));
    // var objectURL = URL.createObjectURL(blob);
    // console.log(objectURL)
    // setBlobState(objectURL)
    const test = await blobToBase64(blob);
    // console.log("----->>>>", test.split(",")[1]);
    console.log(test);
    setBlobState(test);
    saveAs(blob, `${Math.floor(Math.random() * 1000)}`);

    pixels.forEach((pixel) => pixel.style.border = "solid #474747 1px")
    board.style.backgroundColor = "#2d2d2d";
  };

  return (
    <Main>
      <label>Choose resolution:
        <Input
          type="number"
          value={resolution}
          onChange={({ target }) => setResolution(+target.value)}
        />
        <span>x {resolution}</span>
      </label>
      <Console>
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
        <CirclePicker
          colors={colorSet}
          onChange={(e) => handleChange(e)}
          width='185px'
          // width='100%'
          circleSize={45}
        />  
      </Console>
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
