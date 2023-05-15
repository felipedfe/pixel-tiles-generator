import React, { useEffect, useState } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from "file-saver";
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import colorSet from './data/colors';
import { db, usersCollectionRef } from './service/firebase';
import { GlobalStyles } from './styles/GlobalStyles';
import Buttons from './components/Buttons';
import Console from './components/Console';
import Input from './components/Input';
import * as s from "./styles/App.styled.jsx";
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

  useEffect(() => {
    setBoardGrid(new Array(resolution).fill(""));
    setPixelSize((boardSize / resolution).toFixed(2));
  }, [resolution]);

  const handleColorChange = ({ hex }) => {
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
  };

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
      <s.Main>
        <h1>Pixel Tile Generator</h1>
        <Input
          resolution={resolution}
          setResolution={setResolution}
        />
        <Console
          mousePressed={mousePressed}
          setMousePressed={setMousePressed}
          boardGrid={boardGrid}
          handleColorChange={handleColorChange}
          boardSize={boardSize}
          colorSet={colorSet}
          pixelSize={pixelSize}
          selectedColor={selectedColor}
        />
        <Buttons
          handleGenerate={handleGenerate}
          handleDownload={handleDownload}
          handleSave={handleSave}
          toggleGallery={toggleGallery}
        />
        {
          showGallery && userGallery.map((image, index) => {
            return <>
              <img
                key={index}
                alt={index}
                src={image.source}
              />
              <hr></hr>
            </>
          })
        }
      </s.Main>
    </>
  );
}

export default App;
