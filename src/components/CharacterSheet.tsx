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
import CharacterDefenseInfo from "./CharacterDefenseInfo";
import CharacterTroubles from "./CharacterTroubles";
import CharacterBuffTracker from "./CharacterBuffTracker";

const CharacterSheet: React.FC = () => {
  const {
    characters,
    activeCharacter,
    setActiveCharacter,
    addCharacter,
    removeCharacter,
  } = useCharacter();

  return (
    <Box sx={{ height: "93vh" }}>
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
      <Box
        sx={{ height: "87vh", display: "flex", flexDirection: "column", p: 1 }}
      >
        <Grid2 container spacing={1} sx={{ p: 1, display: "flex" }}>
          {/* Top Left */}
          <Grid2 size={4}>
            <Stack spacing={1} sx={{}}>
              <Card>
                <CardContent>
                  <CharacterInfo />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CharacterKnacks />
                </CardContent>
              </Card>

              {/* Stack for Defense and Health cards side by side */}
              <Stack direction="row" spacing={1}>
                <Card sx={{ flex: 1 }}>
                  <CardContent>
                    <CharacterDefenseInfo />
                  </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                  <CardContent>
                    <CharacterHealth />
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={2.5} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <CharacterDrives />
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={2.5} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <CharacterTroubles />
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={3} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <CharacterBuffTracker />
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>

        {/* Second row, taking the remaining space */}
        <Grid2
          container
          spacing={1}
          sx={{ p: 1, display: "flex", flexGrow: 1 }}
        >
          <Grid2 size={2} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <CharacterSkills />
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={10} sx={{ height: "100%" }}>
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
