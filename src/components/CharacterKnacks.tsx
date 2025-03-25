import { useCharacter } from "./CharacterContext";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Character } from "./CharacterModel";

const CharacterKnacks = () => {
  const { character, updateCharacter } = useCharacter();

  const handleKnackChange = (knack: keyof Character["knacks"], value: number) => {
    updateCharacter({
      knacks: {
        ...character.knacks,
        [knack]: value,
      },
    });
  };

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
