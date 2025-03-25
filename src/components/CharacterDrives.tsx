import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const CharacterDrives = () => {
  const { character, updateCharacter } = useCharacter();

  const handleChange = (key: "drives" | "troubles", index: number, value: string) => {
    const updatedArray = [...character.aspect[key]];
    updatedArray[index] = value;

    updateCharacter({
      aspect: {
        ...character.aspect,
        [key]: updatedArray,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      {/* Drives */}
      <Grid size={12} sx={{ display: "flex", flexDirection: "column", height: "50%" }}>
        <Typography variant="h6">Drives</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {[0, 1, 2].map((index) => (
            <TextField
              key={`drive-${index}`}
              onChange={(e) => handleChange("drives", index, e.target.value)}
              value={character.aspect.drives[index] || ""}
              placeholder={`Drive ${index + 1}`}
              fullWidth
              sx={{ height: "2.5rem", "& .MuiInputBase-root": { height: "100%" } }}
            />
          ))}
        </Box>
      </Grid>

      {/* Troubles */}
      <Grid size={12} sx={{ display: "flex", flexDirection: "column", height: "50%" }}>
        <Typography variant="h6">Troubles</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {[0, 1, 2].map((index) => (
            <TextField
              key={`trouble-${index}`}
              onChange={(e) => handleChange("troubles", index, e.target.value)}
              value={character.aspect.troubles[index] || ""}
              placeholder={`Trouble ${index + 1}`}
              fullWidth
              sx={{ height: "2.5rem", "& .MuiInputBase-root": { height: "100%" } }}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CharacterDrives;
