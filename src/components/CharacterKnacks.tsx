import { useCharacter } from "./CharacterContext";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Character } from "./CharacterModel";

const CharacterKnacks = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter]; // Get the active character

  const handleKnackChange = (knack: keyof Character["knacks"], value: number) => {
    updateCharacter(activeCharacter, {
      knacks: {
        ...character.knacks,
        [knack]: value,
      },
    });
  };

  if (!character || !character.traits) {
    return <div>Loading character...</div>; // Handle missing data gracefully
  }

  return (
    <Grid container spacing={1} sx={{ height: "100%" }}>
      {Object.keys(character.knacks).map((knack) => (
        <Grid key={knack} size={2.4}>
          <TextField
            onChange={(e) => handleKnackChange(knack as keyof Character["knacks"], +e.target.value)}
            value={character.knacks[knack as keyof Character["knacks"]]}
            label={knack.charAt(0).toUpperCase() + knack.slice(1)}
            type="number"
            fullWidth
            sx={{
              "& input[type=number]": {
                appearance: "textfield",
                textAlign: "center",
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterKnacks;
