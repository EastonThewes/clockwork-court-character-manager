import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your theme
import CharacterSheet from "./components/CharacterSheet";
import { CharacterProvider } from "./components/CharacterContext";
import CharacterAppBar from "./components/CharacterAppBar";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CharacterProvider>
        <CharacterAppBar />
        <CharacterSheet />
      </CharacterProvider>
    </ThemeProvider>
  );
};

export default App;
