import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Character } from "./CharacterModel";

interface CharacterContextType {
  characters: Character[];
  activeCharacter: number;
  setActiveCharacter: (index: number) => void;
  addCharacter: () => void;
  removeCharacter: (index: number) => void;
  updateCharacter: (index: number, updates: Partial<Character>) => void;
  updateCharacterFromFile: (character: Character) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

const STORAGE_KEY = "characters";

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).map((char: any) => Object.assign(new Character(), char)) : [new Character()];
  });

  const [activeCharacter, setActiveCharacter] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  }, [characters]);

  const addCharacter = () => {
    setCharacters((prev) => {
      const newCharacter = new Character();
      const newCharacters = [...prev, newCharacter];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCharacters));
      return newCharacters;
    });
    setActiveCharacter((prev) => prev + 1);
  };

  const removeCharacter = (index: number) => {
    setCharacters((prev) => {
      const newCharacters = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCharacters));
      return newCharacters.length > 0 ? newCharacters : [new Character()];
    });

    if (activeCharacter >= index && activeCharacter > 0) {
      setActiveCharacter(activeCharacter - 1);
    }
  };

  const updateCharacter = (index: number, updates: Partial<Character>) => {
    setCharacters((prev) => {
      const newCharacters = prev.map((char, i) =>
        i === index
          ? Object.assign(new Character(), char, updates, {
              skills: updates.skills ?? char.skills ?? [],
              archetypes: updates.archetypes ?? char.archetypes ?? [],
              manueversInvocations: updates.manueversInvocations ?? char.manueversInvocations ?? [],
              advantages: updates.advantages ?? char.advantages ?? [],
              weapons: updates.weapons ?? char.weapons ?? [],
            })
          : char
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCharacters));
      return newCharacters;
    });
  };

  const updateCharacterFromFile = (character: Character) => {
    setCharacters((prev) => {
      const newCharacters = [...prev, Object.assign(new Character(), character)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCharacters));
      return newCharacters;
    });
    setActiveCharacter(characters.length);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        activeCharacter,
        setActiveCharacter,
        addCharacter,
        removeCharacter,
        updateCharacter,
        updateCharacterFromFile,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};