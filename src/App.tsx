import { useState } from 'react'
import * as React from 'react';
import Button from '@mui/joy/Button';
import CharacterSheet from './components/CharacterSheet';
import theme from "./theme"; // Import your custom theme
import { ThemeProvider } from '@emotion/react';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>        
        <CharacterSheet />
      </ThemeProvider>
    </>
  )
}

export default App
