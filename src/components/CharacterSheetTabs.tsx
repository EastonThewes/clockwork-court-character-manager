import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import CharacterArchetypes from "./CharacterArchetypes";
import CharacterManeuvers from "./CharacterManuevers";
import CharacterAdvantages from "./CharacterAdvantages";
import CharacterWeapons from "./CharacterWeapons";

const CharacterSheetTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tabIndex} onChange={handleChange} centered>
        <Tab label="Archetypes" />
        <Tab label="Manuevers" />
        <Tab label="Advantages" /> 
        <Tab label="Weapons" /> 
      </Tabs>

      <Box sx={{ padding: 0 }}>
        {tabIndex === 0 && <CharacterArchetypes />}
        {tabIndex === 1 && <CharacterManeuvers />}
        {tabIndex === 2 && <CharacterAdvantages />} 
        {tabIndex === 3 && <CharacterWeapons />} 
      </Box>
    </Box>
  );
};

export default CharacterSheetTabs;
