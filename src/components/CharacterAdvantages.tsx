import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterAdvantages = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter] || {};

  // Ensure character.advantages exists
  useEffect(() => {
    if (!character.advantages) {
      updateCharacter(activeCharacter, { advantages: []  });
    }
  }, [character, activeCharacter, updateCharacter]);

  const advantagesList = Array.isArray(character.advantages) ? character.advantages : [];
  

  const [newAdvantage, setNewAdvantage] = useState({ name: "", description: "" });

  const handleAdvantageChange = (index: number, field: keyof typeof newAdvantage, value: string) => {
    const updatedAdvantages = [...advantagesList];
    updatedAdvantages[index] = { ...updatedAdvantages[index], [field]: value };
    updateCharacter(activeCharacter, { advantages:  updatedAdvantages } );
  };

  const handleNewAdvantageChange = (field: keyof typeof newAdvantage, value: string) => {
    setNewAdvantage((prev) => ({ ...prev, [field]: value }));
  };

  const addNewAdvantage = () => {
    if (newAdvantage.name.trim() !== "") {
      updateCharacter(activeCharacter, {
        advantages:  [...advantagesList, newAdvantage],
      });
      setNewAdvantage({ name: "", description: "" }); // Reset input fields
    }
  };

  const removeAdvantage = (index: number) => {
    const updatedAdvantages = advantagesList.filter((_, i) => i !== index);
    updateCharacter(activeCharacter, { advantages: updatedAdvantages });
  };

  if (!character || !character.traits) {
    return <div>Loading character...</div>; // Handle missing data gracefully
  }

  return (
    <Box sx={{ maxHeight: "300px", overflow: "auto", padding: 1 }}>
      <Typography variant="h6">Advantages</Typography>
      <Grid container spacing={1}>
        {advantagesList.length === 0 && (
          <Typography variant="body2" sx={{ width: "100%", textAlign: "center", mb: 1 }}>
            No advantages yet. Add one below.
          </Typography>
        )}

        {advantagesList.map((advantage, index) => (
          <Grid key={index} container size={12} alignItems="center" spacing={1}>
            <Grid size={3}>
              <TextField
                value={advantage.name}
                onChange={(e) => handleAdvantageChange(index, "name", e.target.value)}
                fullWidth
                label="Name"
              />
            </Grid>
            <Grid size={8}>
              <TextField
                value={advantage.description}
                onChange={(e) => handleAdvantageChange(index, "description", e.target.value)}
                fullWidth
                label="Description"
              />
            </Grid>
            <Grid size={1}>
              <IconButton onClick={() => removeAdvantage(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* New Advantage Row */}
        <Grid container size={12} alignItems="center" spacing={1}>
          <Grid size={3}>
            <TextField
              value={newAdvantage.name}
              onChange={(e) => handleNewAdvantageChange("name", e.target.value)}
              placeholder="New Advantage"
              fullWidth
              label="Name"
            />
          </Grid>
          <Grid size={8}>
            <TextField
              value={newAdvantage.description}
              onChange={(e) => handleNewAdvantageChange("description", e.target.value)}
              placeholder="Description"
              fullWidth
              label="Description"
            />
          </Grid>
          <Grid size={1}>
            <IconButton onClick={addNewAdvantage} disabled={newAdvantage.name.trim() === ""}>
              <AddCircleIcon color={newAdvantage.name.trim() !== "" ? "primary" : "disabled"} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterAdvantages;
