import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterArchetypes = () => {
  const { character, updateCharacter } = useCharacter();
  
  // Ensure character.archetypes exists
  useEffect(() => {
    if (!character.archetypes) {
      updateCharacter({ archetypes: { archetypes: [] } });
    }
  }, [character, updateCharacter]);

  const archetypesList = character.archetypes?.archetypes || [];

  const [newArchetype, setNewArchetype] = useState({ archetype: "", initiate: "", adept: "", master: "" });

  const handleArchetypeChange = (index: number, field: keyof typeof newArchetype, value: string) => {
    const updatedArchetypes = [...archetypesList];
    updatedArchetypes[index] = { ...updatedArchetypes[index], [field]: value };
    updateCharacter({ archetypes: { archetypes: updatedArchetypes } });
  };

  const handleNewArchetypeChange = (field: keyof typeof newArchetype, value: string) => {
    setNewArchetype((prev) => ({ ...prev, [field]: value }));
  };

  const addNewArchetype = () => {
    if (newArchetype.archetype.trim() !== "") {
      updateCharacter({
        archetypes: { archetypes: [...archetypesList, newArchetype] },
      });
      setNewArchetype({ archetype: "", initiate: "", adept: "", master: "" }); // Reset input fields
    }
  };

  const removeArchetype = (index: number) => {
    const updatedArchetypes = archetypesList.filter((_, i) => i !== index);
    updateCharacter({ archetypes: { archetypes: updatedArchetypes } });
  };

  return (
    <Box sx={{ maxHeight: "300px", overflow: "auto", padding: 1 }}>
      <Typography variant="h6">Archetypes</Typography>
      <Grid container spacing={1}>
        {archetypesList.length === 0 && (
          <Typography variant="body2" sx={{ width: "100%", textAlign: "center", mb: 1 }}>
            No archetypes yet. Add one below.
          </Typography>
        )}

        {archetypesList.map((archetype, index) => (
          <Grid key={index} container size={12} alignItems="center" spacing={1}>
            <Grid size={2}>
              <TextField
                value={archetype.archetype}
                onChange={(e) => handleArchetypeChange(index, "archetype", e.target.value)}
                fullWidth
                label="Archetype"
              />
            </Grid>
            <Grid size={3}>
              <TextField
                value={archetype.initiate}
                onChange={(e) => handleArchetypeChange(index, "initiate", e.target.value)}
                fullWidth
                label="Initiate"
              />
            </Grid>
            <Grid size={3}>
              <TextField
                value={archetype.adept}
                onChange={(e) => handleArchetypeChange(index, "adept", e.target.value)}
                fullWidth
                label="Adept"
              />
            </Grid>
            <Grid size={3}>
              <TextField
                value={archetype.master}
                onChange={(e) => handleArchetypeChange(index, "master", e.target.value)}
                fullWidth
                label="Master"
              />
            </Grid>
            <Grid size={1}>
              <IconButton onClick={() => removeArchetype(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* New Archetype Row */}
        <Grid container size={12} alignItems="center" spacing={1}>
          <Grid size={2}>
            <TextField
              value={newArchetype.archetype}
              onChange={(e) => handleNewArchetypeChange("archetype", e.target.value)}
              placeholder="New Archetype"
              fullWidth
              label="Archetype"
            />
          </Grid>
          <Grid size={3}>
            <TextField
              value={newArchetype.initiate}
              onChange={(e) => handleNewArchetypeChange("initiate", e.target.value)}
              placeholder="Initiate"
              fullWidth
              label="Initiate"
            />
          </Grid>
          <Grid size={3}>
            <TextField
              value={newArchetype.adept}
              onChange={(e) => handleNewArchetypeChange("adept", e.target.value)}
              placeholder="Adept"
              fullWidth
              label="Adept"
            />
          </Grid>
          <Grid size={3}>
            <TextField
              value={newArchetype.master}
              onChange={(e) => handleNewArchetypeChange("master", e.target.value)}
              placeholder="Master"
              fullWidth
              label="Master"
            />
          </Grid>
          <Grid size={1}>
            <IconButton onClick={addNewArchetype} disabled={newArchetype.archetype.trim() === ""}>
              <AddCircleIcon color={newArchetype.archetype.trim() !== "" ? "primary" : "disabled"} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterArchetypes;
