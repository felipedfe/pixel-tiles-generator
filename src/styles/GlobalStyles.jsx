import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {
  --border: #474747;
  --background: #2d2d2d;
}

body {
  background-image: url("images/background-2.jpg");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Silkscreen', cursive;
}

h1 {
  font-family: 'Castoro Titling', cursive;
  margin-bottom: 2rem;
}

.circle-picker {
  background-color: rgb(239, 239, 239);
  padding: 2rem;
  border-radius: 10px;
}

`;
