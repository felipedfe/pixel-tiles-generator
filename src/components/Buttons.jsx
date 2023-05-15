import React from "react";
import * as s from "../styles/Buttons.styled";

function Buttons({
  handleGenerate,
  handleDownload,
  handleSave,
  toggleGallery,
}) {
  return (
    <s.Wrapper>
      <s.Button type="button" onClick={handleGenerate}>
        Generate Image
      </s.Button>
      <s.Button type="button" onClick={handleDownload}>
        Download Image
      </s.Button>
      <s.Button type="button" onClick={handleSave}>
        Save in your Gallery
      </s.Button>
      <s.Button type="button" onClick={toggleGallery}>
        Show Gallery &#x2193;
      </s.Button>
    </s.Wrapper>
  );
}

export default Buttons;
