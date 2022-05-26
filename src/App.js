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
import sauceTomato from "./img/sauce-tomato.png";
import darkTomatoPodre from "./img/dark-tomato-podre.png";
import lightTomatoPodre from "./img/light-tomato-podre.png";

function App() {
  const [theme, setTheme] = useState("light");
  const [logo, setLogo] = useState(darkLogo);
  const [infoTomatoIcon, setinfoTomatoIcon] = useState([
    darkTomatoGreen,
    darkTomatoSet,
    darkLogo,
    sauceTomato,
    darkTomatoPodre,
  ]);
  const imgAlt = [
    "Tomate Verde",
    "Todos os Tomates",
    "Tomate Maduro",
    "Molho de Tomate",
    "Tomate Podre",
  ];

  const topicos = [
    "tomatometro/green",
    "tomatometro/total",
    "tomatometro/red",
    "tomatometro/sauce",
    "tomatometro/podre",
  ];

  const themeToggler = () => {
    if (theme === "light") {
      setTheme("dark");
      setLogo(lightLogo);
      setinfoTomatoIcon([
        lightTomatoGreen,
        lightTomatoSet,
        lightLogo,
        sauceTomato,
        lightTomatoPodre,
      ]);
    } else {
      setTheme("light");
      setLogo(darkLogo);
      setinfoTomatoIcon([
        darkTomatoGreen,
        darkTomatoSet,
        darkLogo,
        sauceTomato,
        darkTomatoPodre,
      ]);
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div className="block-bigger">
        <Header themeToggler={themeToggler} logo={logo} />
        <div className="info-area">
          <div className="mqtt-info">
            {infoTomatoIcon.map((img, index) => {
              return (
                <InfoContainer
                  img={img}
                  alt={imgAlt[index]}
                  topico={topicos[index]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
