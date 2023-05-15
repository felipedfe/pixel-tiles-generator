import React from "react";
import * as s from "../styles/Input.styled";

function Input({ resolution, setResolution }) {
  return (
    <label>
      Choose pixel size:
      <s.Input
        type="number"
        value={resolution}
        onChange={({ target }) => setResolution(+target.value)}
      />
      <span>x {resolution}</span>
    </label>
  );
}

export default Input;
