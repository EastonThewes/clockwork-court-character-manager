import React from "react";
import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  IconButton,
  Stack,
  Grid2,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { useCharacter } from "./CharacterContext";
import CharacterInfo from "./CharacterInfo";
import CharacterKnacks from "./CharacterKnacks";
import CharacterEndeavorDice from "./CharacterEndeavorDice";
import CharacterHealth from "./CharacterHealth";
import CharacterDrives from "./CharacterDrives";
import CharacterSkills from "./CharacterSkills";
import CharacterSheetTabs from "./CharacterSheetTabs";

const CharacterSheet: React.FC = () => {
  const {
    characters,
    activeCharacter,
    setActiveCharacter,
    addCharacter,
    removeCharacter,
  } = useCharacter();

  return (
    <Box sx={{ height: "60vh" }}>
      {/* Character Tabs */}
      <Tabs
        value={activeCharacter}
        onChange={(_, newIndex) => setActiveCharacter(newIndex)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {characters.map((char, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {char.name || `Character ${index + 1}`}
                {characters.length > 1 && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent tab switch
                      removeCharacter(index);
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                )}
              </Box>
            }
          />
        ))}
        <IconButton onClick={addCharacter}>
          <Add />
        </IconButton>
      </Tabs>

      {/* Character Details */}
      <Box sx={{ flexGrow: 1, height: "85vh" }}>
        <Grid2 container spacing={1} sx={{ height: "50%", padding: 2 }}>
          <Grid2 size={4} sx={{ height: "100%" }}>
            <Stack spacing={2} sx={{ height: "100%" }}>
              <Card sx={{ flexGrow: 1 }}>
                <CardContent sx={{ height: "100%" }}>
                  <CharacterInfo />
                </CardContent>
              </Card>
              <Card sx={{ flexGrow: 1 }}>
                <CardContent sx={{ height: "100%" }}>
                  <CharacterKnacks />
                </CardContent>
              </Card>
            </Stack>
          </Grid2>
          <Grid2 size={3} sx={{ height: "100%" }}>
            <Stack spacing={2} sx={{ height: "100%" }}>
              <Card sx={{ flexGrow: 1 }}>
                <CardContent sx={{ height: "100%" }}>
                  <CharacterEndeavorDice />
                </CardContent>
              </Card>
              <Card sx={{ flexGrow: 2 }}>
                <CardContent sx={{ height: "100%" }}>
                  <CharacterHealth />
                </CardContent>
              </Card>
            </Stack>
          </Grid2>
          <Grid2 size={5} sx={{ height: "100%" }}>
            <Card sx={{ flexGrow: 1, height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <CharacterDrives />
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={3} sx={{ height: "100%" }}>
            <Card sx={{ flexGrow: 1, height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <CharacterSkills />
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={9} sx={{ height: "100%" }}>
            <Card sx={{ flexGrow: 1, height: "100%" }}>
              <CardContent>
                <CharacterSheetTabs />
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default CharacterSheet;
