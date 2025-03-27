import { useCharacter } from "./CharacterContext";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Character } from "./CharacterModel";

const CharacterDefenseInfo = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter] || { health: {} };

  const handleChange = (key: keyof Character["health"], value: number) => {
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
      <Grid container spacing={1}>
        <Grid size={6}>
        <TextField
          value={10 + 5 * (character.traits.finesse || 0)}
          label="Speed"
          type="number"
          fullWidth
          size="small"
          InputProps={{
            readOnly: true, // Prevents editing the speed directly
          }}
          sx={{
            "& input[type=number]": {
              appearance: "textfield",
              textAlign: "center",
            },
          }}
        />
      </Grid>
        <Grid size={6}>
          <TextField
            onChange={(e) =>
              updateCharacter(activeCharacter, {
                targetNumber: +e.target.value,
              })
            }
            value={character.targetNumber || ""}
            label="Target Number"
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
    </Grid>
  );
};

export default CharacterDefenseInfo;
