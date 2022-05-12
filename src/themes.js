import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  blockBigger: "#f1f4ff",
  fontColor: "#2f0103",
  body: "rgb(214, 211, 255)",
};

export const darkTheme = {
  blockBigger: "#2f0103",
  fontColor: "#d5d5d5",
  body: "#170b0c",
};

export const GlobalStyle = createGlobalStyle`
  * {
    color: ${(props) => props.theme.fontColor};;
  }

  .block-bigger {
    background-color: ${(props) => props.theme.blockBigger};
  }

  body {
    background-color: ${(props) => props.theme.body};
  }

`;
