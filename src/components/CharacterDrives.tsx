import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const CharacterDrives = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter]; // Get the active character

  const handleChange = (key: "drives" | "troubles", index: number, value: string) => {
    const updatedArray = [...character.aspect[key]];
    updatedArray[index] = value;

    updateCharacter(activeCharacter, {
      aspect: {
        ...character.aspect,
        [key]: updatedArray,
      },
    });
  };

  if (!character || !character.traits) {
    return <div>Loading character...</div>; // Handle missing data gracefully
  }

  return (
    <Grid container spacing={1} sx={{ flexGrow: 1, height: '100%' }}>
  {/* Drives */}
  <Grid size={12} sx={{ flexGrow: 1 }}>
    <Typography variant="h6">Drives</Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
      {[0, 1, 2].map((index) => (
        <TextField
          key={`drive-${index}`}
          onChange={(e) => handleChange("drives", index, e.target.value)}
          value={character.aspect.drives[index] || ""}
          placeholder={`Drive ${index + 1}`}
          fullWidth
          sx={{ height: "2rem", "& .MuiInputBase-root": { height: "100%" }, flexGrow: 1 }}
        />
      ))}
    </Box>
  </Grid>
</Grid>
  );
};

export default CharacterDrives;
