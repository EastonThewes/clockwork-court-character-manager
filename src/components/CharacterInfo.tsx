import { useCharacter } from "./CharacterContext";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Character, Traits } from "./CharacterModel";
import CharacterEndeavorDice from "./CharacterEndeavorDice";

const CharacterInfo = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter]; // Get the active character

  const handleChange = (key: keyof Character, value: string | number) => {
    updateCharacter(activeCharacter, { [key]: value });
  };

  const handleTraitChange = (trait: keyof Traits, value: number) => {
    updateCharacter(activeCharacter, {
      traits: {
        ...character.traits,
        [trait]: value,
      },
    });
  };

  if (!character || !character.traits) {
    return <div>Loading character...</div>; // Handle missing data gracefully
  }

  return (
    <Grid container spacing={1} rowSpacing={1} >
      <Grid size={5}>
        <TextField
          onChange={(e) => handleChange("name", e.target.value)}
          value={character.name}
          label="Character Name"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid size={2}>
        <TextField
          onChange={(e) => handleChange("xp", +e.target.value)}
          value={character.xp}
          label="XP"
          type="number"
          fullWidth
          size="small"
          sx={{ "& input[type=number]": { appearance: "textfield" } }}
        />
      </Grid>
      <Grid size={2}>
        <TextField
          onChange={(e) => handleChange("skillXP", +e.target.value)}
          value={character.skillXP}
          label="Skill XP"
          type="number"
          fullWidth
          size="small"
          sx={{ "& input[type=number]": { appearance: "textfield" } }}
        />
      </Grid>
      <Grid size={3}>
        <CharacterEndeavorDice />
      </Grid>

      {(["brawn", "finesse", "resolve", "wits", "presence"] as const).map(
        (trait) => (
          <Grid key={trait} size={2.4}>
            <TextField
              onChange={(e) => handleTraitChange(trait, +e.target.value)}
              value={character.traits[trait]}
              label={trait.charAt(0).toUpperCase() + trait.slice(1)}
              type="number"
              fullWidth
              size="small"
              sx={{
                "& input[type=number]": {
                  appearance: "textfield",
                  textAlign: "center",
                },
              }}
            />
          </Grid>
        )
      )}

      {/* Speed Box (Calculated from Finesse) */}
      {/* <Grid size={2}>
        <TextField
          value={10 + 5 * (character.traits.finesse || 0)}
          label="Speed"
          type="number"
          fullWidth
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
      </Grid> */}
    </Grid>
  );
};

export default CharacterInfo;
