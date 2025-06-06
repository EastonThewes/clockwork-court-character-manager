import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterArchetypes = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter]; // Get the active character

  // Ensure character.archetypes exists
  useEffect(() => {
    if (!character.archetypes) {
      updateCharacter(activeCharacter, { archetypes: [] });
    }
  }, [character, activeCharacter, updateCharacter]);

  const archetypesList = Array.isArray(character.archetypes) ? character.archetypes : [];

  const [newArchetype, setNewArchetype] = useState({ archetype: "", style: "", initiate: "", adept: "", master: "" });

  const handleArchetypeChange = (index: number, field: keyof typeof newArchetype, value: string) => {
    const updatedArchetypes = [...archetypesList];
    updatedArchetypes[index] = { ...updatedArchetypes[index], [field]: value };
    updateCharacter(activeCharacter, { archetypes: updatedArchetypes });
  };

  const handleNewArchetypeChange = (field: keyof typeof newArchetype, value: string) => {
    setNewArchetype((prev) => ({ ...prev, [field]: value }));
  };

  const addNewArchetype = () => {
    if (newArchetype.archetype.trim() !== "") {
      updateCharacter(activeCharacter, {
        archetypes: [...archetypesList, newArchetype],
      });
      setNewArchetype({ archetype: "", style: "", initiate: "", adept: "", master: "" }); // Reset input fields
    }
  };

  const removeArchetype = (index: number) => {
    const updatedArchetypes = archetypesList.filter((_, i) => i !== index);
    updateCharacter(activeCharacter, { archetypes: updatedArchetypes });
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
            <Grid size={{md:1,xs:12}}>
              <TextField
                value={archetype.archetype}
                onChange={(e) => handleArchetypeChange(index, "archetype", e.target.value)}
                fullWidth
                size="small"
                label="Archetype"
              />
            </Grid>
            <Grid size={{md:1,xs:12}}>
              <TextField
                value={archetype.style}
                onChange={(e) => handleArchetypeChange(index, "style", e.target.value)}
                fullWidth
                size="small"
                label="Style"
              />
            </Grid>
            <Grid size={{md:3,xs:12}}>
              <Tooltip title={archetype.initiate} arrow>
                <TextField
                  value={archetype.initiate}
                  onChange={(e) => handleArchetypeChange(index, "initiate", e.target.value)}
                  fullWidth
                  size="small"
                  label="Initiate"
                />
              </Tooltip>
            </Grid>
            <Grid size={{md:3,xs:12}}>
              <Tooltip title={archetype.adept} arrow>
                <TextField
                  value={archetype.adept}
                  onChange={(e) => handleArchetypeChange(index, "adept", e.target.value)}
                  fullWidth
                  size="small"
                  label="Adept"
                />
              </Tooltip>
            </Grid>
            <Grid size={{md:3,xs:12}}>
              <Tooltip title={archetype.master} arrow>
                <TextField
                  value={archetype.master}
                  onChange={(e) => handleArchetypeChange(index, "master", e.target.value)}
                  fullWidth
                  size="small"
                  label="Master"
                />
              </Tooltip>
            </Grid>
            <Grid size={{md:1,xs:12}}>
              <IconButton onClick={() => removeArchetype(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* New Archetype Row */}
        <Grid container size={12} alignItems="center" spacing={1}>
          <Grid size={{md:1,xs:12}}>
            <TextField
              value={newArchetype.archetype}
              onChange={(e) => handleNewArchetypeChange("archetype", e.target.value)}
              placeholder="New Archetype"
              fullWidth
              size="small"
              label="Archetype"
            />
          </Grid>
          <Grid size={{md:1,xs:12}}>
            <TextField
              value={newArchetype.style}
              onChange={(e) => handleNewArchetypeChange("style", e.target.value)}
              fullWidth
              size="small"
              label="Style"
            />
          </Grid>
          <Grid size={{md:3,xs:12}}>
            <Tooltip title={newArchetype.initiate} arrow>
              <TextField
                value={newArchetype.initiate}
                onChange={(e) => handleNewArchetypeChange("initiate", e.target.value)}
                placeholder="Initiate"
                fullWidth
                size="small"
                label="Initiate"
              />
            </Tooltip>
          </Grid>
          <Grid size={{md:3,xs:12}}>
            <Tooltip title={newArchetype.adept} arrow>
              <TextField
                value={newArchetype.adept}
                onChange={(e) => handleNewArchetypeChange("adept", e.target.value)}
                placeholder="Adept"
                fullWidth
                size="small"
                label="Adept"
              />
            </Tooltip>
          </Grid>
          <Grid size={{md:3,xs:12}}>
            <Tooltip title={newArchetype.master} arrow>
              <TextField
                value={newArchetype.master}
                onChange={(e) => handleNewArchetypeChange("master", e.target.value)}
                placeholder="Master"
                fullWidth
                size="small"
                label="Master"
              />
            </Tooltip>
          </Grid>
          <Grid size={{md:1,xs:12}}>
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
