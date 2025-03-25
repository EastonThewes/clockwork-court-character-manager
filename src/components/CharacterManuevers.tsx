import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterManeuvers = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter]; // Get the active character

  // Ensure character.manueversInvocations exists
  useEffect(() => {
    if (!character.manueversInvocations) {
      updateCharacter(activeCharacter, { manueversInvocations: []  });
    }
  }, [character, activeCharacter, updateCharacter]);

  const maneuversList = Array.isArray(character.manueversInvocations) ? character.manueversInvocations : [];
  

  const [newManeuver, setNewManeuver] = useState({ name: "", roll: "", action: "", description: "" });

  const handleManeuverChange = (index: number, field: keyof typeof newManeuver, value: string) => {
    const updatedManeuvers = [...maneuversList];
    updatedManeuvers[index] = { ...updatedManeuvers[index], [field]: value };
    updateCharacter(activeCharacter, { manueversInvocations: updatedManeuvers  });
  };

  const handleNewManeuverChange = (field: keyof typeof newManeuver, value: string) => {
    setNewManeuver((prev) => ({ ...prev, [field]: value }));
  };

  const addNewManeuver = () => {
    if (newManeuver.name.trim() !== "") {
      updateCharacter(activeCharacter, {
        manueversInvocations:  [...maneuversList, newManeuver] ,
      });
      setNewManeuver({ name: "", roll: "", action: "", description: "" }); // Reset input fields
    }
  };

  const removeManeuver = (index: number) => {
    const updatedManeuvers = maneuversList.filter((_, i) => i !== index);
    updateCharacter(activeCharacter, { manueversInvocations:  updatedManeuvers  });
  };

  return (
    <Box sx={{ maxHeight: "300px", overflow: "auto", padding: 1 }}>
      <Typography variant="h6">Maneuvers</Typography>
      <Grid container spacing={1}>
        {maneuversList.length === 0 && (
          <Typography variant="body2" sx={{ width: "100%", textAlign: "center", mb: 1 }}>
            No maneuvers yet. Add one below.
          </Typography>
        )}

        {maneuversList.map((maneuver, index) => (
          <Grid key={index} container size={12} alignItems="center" spacing={1}>
            <Grid size={2}>
              <TextField
                value={maneuver.name}
                onChange={(e) => handleManeuverChange(index, "name", e.target.value)}
                fullWidth
                label="Name"
              />
            </Grid>
            <Grid size={2}>
              <TextField
                value={maneuver.roll}
                onChange={(e) => handleManeuverChange(index, "roll", e.target.value)}
                fullWidth
                label="Roll"
              />
            </Grid>
            <Grid size={1}>
              <TextField
                value={maneuver.action}
                onChange={(e) => handleManeuverChange(index, "action", e.target.value)}
                fullWidth
                label="Action"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={maneuver.description}
                onChange={(e) => handleManeuverChange(index, "description", e.target.value)}
                fullWidth
                label="Description"
              />
            </Grid>
            <Grid size={1}>
              <IconButton onClick={() => removeManeuver(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* New Maneuver Row */}
        <Grid container size={12} alignItems="center" spacing={1}>
          <Grid size={2}>
            <TextField
              value={newManeuver.name}
              onChange={(e) => handleNewManeuverChange("name", e.target.value)}
              placeholder="New Maneuver"
              fullWidth
              label="Name"
            />
          </Grid>
          <Grid size={2}>
            <TextField
              value={newManeuver.roll}
              onChange={(e) => handleNewManeuverChange("roll", e.target.value)}
              placeholder="Roll"
              fullWidth
              label="Roll"
            />
          </Grid>
          <Grid size={1}>
            <TextField
              value={newManeuver.action}
              onChange={(e) => handleNewManeuverChange("action", e.target.value)}
              placeholder="Action"
              fullWidth
              label="Action"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              value={newManeuver.description}
              onChange={(e) => handleNewManeuverChange("description", e.target.value)}
              placeholder="Description"
              fullWidth
              label="Description"
            />
          </Grid>
          <Grid size={1}>
            <IconButton onClick={addNewManeuver} disabled={newManeuver.name.trim() === ""}>
              <AddCircleIcon color={newManeuver.name.trim() !== "" ? "primary" : "disabled"} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterManeuvers;
