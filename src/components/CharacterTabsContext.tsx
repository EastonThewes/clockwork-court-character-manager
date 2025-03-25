import { createContext, useContext, useState, ReactNode } from "react";
import { Character } from "./CharacterTabs";

interface CharacterTabsContextProps {
  characters: Character[];
  addNewCharacter: () => void;
  updateCharacterFromFile: (character: Character) => void;
}

const CharacterTabsContext = createContext<CharacterTabsContextProps | undefined>(undefined);

export const CharacterTabsProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const addNewCharacter = () => {
    const newCharacter = { name: `Character ${characters.length + 1}`, attributes: {} };
    setCharacters([...characters, newCharacter]);
  };

  const updateCharacterFromFile = (character: Character) => {
    setCharacters([...characters, character]);
  };

  return (
    <CharacterTabsContext.Provider value={{ characters, addNewCharacter, updateCharacterFromFile }}>
      {children}
    </CharacterTabsContext.Provider>
  );
};

export const useCharacterTabs = () => {
  const context = useContext(CharacterTabsContext);
  if (!context) {
    throw new Error("useCharacterTabs must be used within a CharacterTabsProvider");
  }
  return context;
};
