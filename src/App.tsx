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
