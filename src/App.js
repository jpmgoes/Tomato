import React from "react";
import "./App.css";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./themes";
import InfoContainer from "./components/InfoContainer";
import Header from "./components/Header";

import darkLogo from "./img/dark-tomato.png";
import lightLogo from "./img/light-tomato.png";
import lightTomatoGreen from "./img/light-tomato-green.png";
import darkTomatoGreen from "./img/dark-tomato-green.png";
import lightTomatoSet from "./img/light-tomato-set.png";
import darkTomatoSet from "./img/dark-tomato-set.png";

function App() {
  const [theme, setTheme] = useState("light");
  const [logo, setLogo] = useState(darkLogo);
  const [infoTomatoIcon, setinfoTomatoIcon] = useState([
    darkTomatoGreen,
    darkTomatoSet,
    darkLogo,
  ]);
  const topicos = ["testtopic/1", "testtopic/2", "testtopic/4"];

  const themeToggler = () => {
    if (theme === "light") {
      setTheme("dark");
      setLogo(lightLogo);
      setinfoTomatoIcon([lightTomatoGreen, lightTomatoSet, lightLogo]);
    } else {
      setTheme("light");
      setLogo(darkLogo);
      setinfoTomatoIcon([darkTomatoGreen, darkTomatoSet, darkLogo]);
    }
  };

  const showAllInfo = (_, index) => {
    return (
      <InfoContainer img={infoTomatoIcon[index]} topico={topicos[index]} />
    );
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div className="block-bigger">
        <Header themeToggler={themeToggler} logo={logo} />
        <div className="info-area">
          <div className="mqtt-info">
            {Array(3).fill(null).map(showAllInfo)}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
