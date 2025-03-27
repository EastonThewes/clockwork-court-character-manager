import { useCharacter } from "./CharacterContext";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Character } from "./CharacterModel";

const CharacterHealth = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter] || { health: {} };

  const handleChange = (key: keyof Character["health"], value: number | string) => {
    updateCharacter(activeCharacter, {
      health: {
        ...character.health,
        [key]: value,
      },
    });
  };

  if (!character || !character.traits) {
    return <div>Loading character...</div>; // Handle missing data gracefully
  }

  return (
    <Grid container spacing={1} sx={{ height: "100%", alignItems: "center" }}>
      {/* Top Row: Wounds / Max Wounds */}

        <Grid size={5}>
          <TextField
            onChange={(e) => handleChange("woundCheck", e.target.value)}
            value={character.health.woundCheck || ""}
            label="Wound Check"
            // type="number"
            fullWidth
            size="small"
            sx={{
              "& input": {
                textAlign: "center",
                appearance: "textfield",
              },
            }}
          />
        </Grid>
        <Grid size={3}>
          <TextField
            onChange={(e) => handleChange("wounds", e.target.value)}
            value={character.health.wounds || ""}
            label="Wounds"
            type="number"
            fullWidth
            size="small"
            sx={{
              "& input": {
                textAlign: "center",
                appearance: "textfield",
              },
            }}
          />
        </Grid>
        <Grid size={1} sx={{ textAlign: "center" }}>
          <Typography variant="h5">/</Typography>
        </Grid>
        <Grid size={3}>
          <TextField
            onChange={(e) => handleChange("maxWounds", e.target.value)}
            value={character.health.maxWounds || ""}
            label="Max Wounds"
            type="number"
            fullWidth
            size="small"
            sx={{
              "& input": {
                textAlign: "center",
                appearance: "textfield",
              },
            }}
          />
        </Grid>
      </Grid>

    

  );
};

export default CharacterHealth;
