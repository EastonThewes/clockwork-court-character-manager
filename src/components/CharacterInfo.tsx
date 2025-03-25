import { useCharacter } from "./CharacterContext";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Character, Traits } from "./CharacterModel";

const CharacterInfo = () => {
  const { character, updateCharacter } = useCharacter();

  const handleChange = (key: keyof Character, value: string | number) => {
    updateCharacter({ [key]: value });
  };

  const handleTraitChange = (trait: keyof Traits, value: number) => {
    updateCharacter({
      traits: {
        ...character.traits,
        [trait]: value,
      },
    });
  };

  return (
    <Grid container spacing={1} sx={{ height: "100%" }}>
      <Grid size={6}>
        <TextField
          onChange={(e) => handleChange("name", e.target.value)}
          value={character.name}
          label="Character Name"
          fullWidth
        />
      </Grid>
      <Grid size={3}>
        <TextField
          onChange={(e) => handleChange("xp", +e.target.value)}
          value={character.xp}
          label="XP"
          type="number"
          fullWidth
          sx={{ "& input[type=number]": { appearance: "textfield" } }}
        />
      </Grid>
      <Grid size={3}>
        <TextField
          onChange={(e) => handleChange("skillXP", +e.target.value)}
          value={character.skillXP}
          label="Skill XP"
          type="number"
          fullWidth
          sx={{ "& input[type=number]": { appearance: "textfield" } }}
        />
      </Grid>

      {(["brawn", "finesse", "resolve", "wits", "presence"] as const).map((trait) => (
        <Grid key={trait} size={2.4}>
          <TextField
            onChange={(e) => handleTraitChange(trait, +e.target.value)}
            value={character.traits[trait]}
            label={trait.charAt(0).toUpperCase() + trait.slice(1)}
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

export default CharacterInfo;
