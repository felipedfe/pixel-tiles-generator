import React, { useEffect, useState } from 'react';
import Pixel from './components/Pixel';
import { CirclePicker } from 'react-color'
import domtoimage from 'dom-to-image';
import { saveAs } from "file-saver";
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  Main,
  Input,
  ConsoleWrapper,
  Board,
  Row,
  Button,
} from "./styles/App.styled.js";
import colorSet from './colors';
import { db, usersCollectionRef } from './service/firebase';
import { GlobalStyles } from './styles/GlobalStyles';
import './App.css';

function App() {
  const pixelsCollection = document.getElementsByClassName("pixel");
  const board = document.getElementById("board");
  const pixels = Array.from(pixelsCollection);

  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [blobObject, setBlobObject] = useState({});
  const [blobString, setBlobString] = useState("");
  const [resolution, setResolution] = useState(10);
  const [boardGrid, setBoardGrid] = useState([]);
  const [pixelSize, setPixelSize] = useState(0);
  const [userGallery, setUserGallery] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const [mousePressed, setMousePressed] = useState(false);

  const boardSize = 400;

  useEffect(() => {
    const getImages = async () => {
      const data = await getDocs(usersCollectionRef);
      setUserGallery(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data)
    };
    getImages();
  }, []);

  console.log(userGallery)

  useEffect(() => {
    setBoardGrid(new Array(resolution).fill(""));
    setPixelSize((boardSize / resolution).toFixed(2));
  }, [resolution]);

  const handleChange = ({ hex }) => {
    console.log(hex);
    setSelectedColor(hex)
  };

  // função para transformar um blob object em uma string base 64
  const blobToBase64 = async (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const handleGenerate = async () => {
    pixels.forEach((pixel) => pixel.style.border = "none")
    board.style.backgroundColor = "transparent";
    const blob = await domtoimage.toBlob(document.getElementById("board"));
    const result = await blobToBase64(blob);
    // esse split é para não adicionar a string inicial -> data:image/png;base64,
    // const blobString = result.split(",")[1];
    setBlobString(result);
    setBlobObject(blob);
    pixels.forEach((pixel) => pixel.style.border = "solid var(--border) 1px");
    board.style.backgroundColor = "var(--background)";
  };

  const handleDownload = () => {
    saveAs(blobObject, `${Math.floor(Math.random() * 1000)}`);
  };

  const handleSave = async () => {
    try {
      const image = await addDoc(collection(db, "images"), { source: blobString });

      console.log("Success!", image);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const toggleGallery = () => {
    setShowGallery((prevState) => !prevState)
  };

  return (
    <>
      <GlobalStyles />
      <Main>
        <h1>Pixel Tile Generator</h1>
        <label>Choose pixel size:
          <Input
            type="number"
            value={resolution}
            onChange={({ target }) => setResolution(+target.value)}
          />
          <span>x {resolution}</span>
        </label>
        <ConsoleWrapper>
          <Board
            onMouseDown={() => setMousePressed(true)}
            onMouseUp={() => setMousePressed(false)}
            id='board'
            boardSize={boardSize}>
            {
              boardGrid.map(() => {
                return (
                  <Row>
                    {boardGrid.map(() => <Pixel mousePressed={mousePressed} selectedColor={selectedColor} pixelSize={pixelSize} />)}
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
        </ConsoleWrapper>
        <Button
          type="button"
          onClick={handleGenerate}
        >
          Generate Image
        </Button>
        <Button
          type="button"
          onClick={handleDownload}
        >
          Download Image
        </Button>
        <Button
          type="button"
          onClick={handleSave}
        >
          Save in your Gallery
        </Button>
        <Button
          type="button"
          onClick={toggleGallery}
        >
          Show Gallery &#x2193;
        </Button>
        {
          showGallery && userGallery.map((image) => {
            return <>
              <img
                alt=''
                src={image.source}
              />
              <hr></hr>
            </>
          })
        }
      </Main>
    </>
  );
}

export default App;
