import { useState } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CharacterSheet from "./CharacterSheet";

export interface Character {
  name: string;
  attributes: { [key: string]: number };
}

const defaultCharacter: Character = {
  name: "New Character",
  attributes: { Strength: 10, Agility: 10, Intelligence: 10 },
};

const CharacterTabs = () => {
  const [characters, setCharacters] = useState<Character[]>([defaultCharacter]);
  const [activeTab, setActiveTab] = useState(0);

  const addNewCharacter = () => {
    setCharacters([...characters, { ...defaultCharacter, name: `Character ${characters.length + 1}` }]);
    setActiveTab(characters.length);
  };

  const updateCharacterFromFile = (newCharacter: Character) => {
    setCharacters([...characters, newCharacter]);
    setActiveTab(characters.length);
  };

  const removeCharacter = (index: number) => {
    const newCharacters = characters.filter((_, i) => i !== index);
    setCharacters(newCharacters);
    setActiveTab(index === 0 ? 0 : index - 1);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(_, newIndex) => setActiveTab(newIndex)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {characters.map((character, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {character.name}
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCharacter(index);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          />
        ))}
      </Tabs>

      <Box sx={{ padding: 2 }}>
        {characters.length > 0 && <CharacterSheet character={characters[activeTab]} />}
      </Box>
    </Box>
  );
};

export default CharacterTabs;
