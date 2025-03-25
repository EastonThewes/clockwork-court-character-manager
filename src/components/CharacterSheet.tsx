import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { CharacterProvider } from "./CharacterContext";
import Stack from "@mui/material/Stack";
import { Card, CardContent } from "@mui/material";
import CharacterInfo from "./CharacterInfo";
import CharacterKnacks from "./CharacterKnacks";
import CharacterEndeavorDice from "./CharacterEndeavorDice";
import CharacterHealth from "./CharacterHealth";
import CharacterDrives from "./CharacterDrives";
import CharacterSkills from "./CharacterSkills";
import CharacterTabs from "./CharacterSheetTabs";

const CharacterSheet = () => {
  return (
    <CharacterProvider>
      <Box sx={{ flexGrow: 1, height: "95vh" }}>
        <Grid container spacing={1} sx={{ height: "50%", padding: 2 }}>
          <Grid size={5} sx={{ height: "100%" }}>
            <Stack spacing={1} sx={{ height: "100%" }}>
              <Card sx={{ flexGrow: 1 }}>
                <CardContent sx={{ height: "100%" }}>
                  <CharacterInfo />
                </CardContent>
              </Card>
              <Card sx={{ flexGrow: 1 }}>
                <CardContent>
                  <CharacterKnacks />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={3} sx={{ height: "100%" }}>
            <Stack spacing={1} sx={{ height: "100%" }}>
              <Card sx={{ height: "25%" }}>
                <CardContent>
                    <CharacterEndeavorDice />
                    </CardContent>
              </Card>
              <Card sx={{ height: "75%" }}>
                <CardContent>
                    <CharacterHealth />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={4} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <CharacterDrives />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ height: "50%", padding: 2 }}>
          <Grid size={3} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <CharacterSkills />
                </CardContent>
            </Card>
          </Grid>
          <Grid size={9} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <CharacterTabs />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </CharacterProvider>
  );
};

export default CharacterSheet;
