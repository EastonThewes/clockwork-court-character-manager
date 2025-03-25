import React, { createContext, useContext, useState, useEffect } from "react";
import { Character } from "./CharacterModel";

const CHARACTER_STORAGE_KEY = "savedCharacter";

export const CharacterContext = createContext<{
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
} | null>(null);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load the character from localStorage (or create a new one)
  const loadCharacter = () => {
    const savedCharacter = localStorage.getItem(CHARACTER_STORAGE_KEY);
    return savedCharacter ? Object.assign(new Character(), JSON.parse(savedCharacter)) : new Character();
  };

  const [character, setCharacter] = useState<Character>(loadCharacter);

  // Save character to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(character));
  }, [character]);

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter((prev) => ({ ...prev, ...updates }));
  };

  return (
    <CharacterContext.Provider value={{ character, updateCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};
