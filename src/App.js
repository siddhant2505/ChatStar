import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import alanBtn from "@alan-ai/alan-sdk-web";
import "./App.css";
import { ThemeProvider } from "@chakra-ui/core";
import Form from "./components/Form";
import Home from "./components/Home";

function App() {
  const alanKey =
    "6850334add5869853e8023acb95b933e2e956eca572e1d8b807a3e2338fdd0dc/stage";
  const [message, setMessage] = useState("");
  useEffect(() => {
    alanBtn({
      key: alanKey,
      rootEl: document.getElementById("alan-btn"),
      onCommand: ({ command, text }) => {
        if (command === "input") {
          console.log(text);
          //console.log(articles);
          setMessage(text);
        }
      },
    });
  }, []);
  return (
    <ThemeProvider>
      <div className="App">
        {/* //className="App" */}
        <Home message={message} />
      </div>
    </ThemeProvider>
  );
}

export default App;
