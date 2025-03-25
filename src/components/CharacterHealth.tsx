import { useCharacter } from "./CharacterContext";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Character } from "./CharacterModel";

const CharacterHealth = () => {
  const { character, updateCharacter } = useCharacter();

  const handleChange = (key: keyof Character["health"], value: number) => {
    updateCharacter({
      health: {
        ...character.health,
        [key]: value,
      },
    });
  };

  return (
    <Grid container spacing={1} sx={{ height: "100%", alignItems: "center" }}>
      {/* Top Row: Wounds / Max Wounds */}
      <Grid container spacing={1}>
        <Grid size={5}>
          <TextField
            onChange={(e) => handleChange("wounds", +e.target.value)}
            value={character.health.wounds}
            label="Wounds"
            type="number"
            fullWidth
            sx={{ "& input": { textAlign: "center",  appearance: "textfield", } }}
          />
        </Grid>
        <Grid size={2} sx={{ textAlign: "center" }}>
          <Typography variant="h5">/</Typography>
        </Grid>
        <Grid  size={5}>
          <TextField
            onChange={(e) => handleChange("maxWounds", +e.target.value)}
            value={character.health.maxWounds}
            label="Max Wounds"
            type="number"
            fullWidth
            sx={{ "& input": { textAlign: "center",  appearance: "textfield", } }}
          />
        </Grid>
      </Grid>

      {/* Bottom Row: Target Number & Wound Check */}
      <Grid container  spacing={1}>
        <Grid  size={6}>
          <TextField
            onChange={(e) => updateCharacter({ targetNumber: +e.target.value })}
            value={character.targetNumber}
            label="Target Number"
            type="number"
            fullWidth
            sx={{ "& input": { textAlign: "center",  appearance: "textfield", } }}
          />
        </Grid>
        <Grid  size={6}>
          <TextField
            onChange={(e) => handleChange("woundCheck", +e.target.value)}
            value={character.health.woundCheck}
            label="Wound Check"
            type="number"
            fullWidth
            sx={{ "& input": { 
                textAlign: "center",
                appearance: "textfield", 
            } }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CharacterHealth;
