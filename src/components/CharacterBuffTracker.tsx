import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterBuffTracker = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter]; // Get the active character

  // Ensure character.buffs exists
  useEffect(() => {
    if (!character.buffs) {
      updateCharacter(activeCharacter, { buffs: [] });
    }
  }, [character, activeCharacter, updateCharacter]);

  const buffsList = Array.isArray(character.buffs) ? character.buffs : [];

  const [newBuff, setNewBuff] = useState({
    description: "",
  });

  const handleBuffChange = (
    index: number,
    field: keyof typeof newBuff,
    value: string
  ) => {
    const updatedBuffs = [...buffsList];
    updatedBuffs[index] = { ...updatedBuffs[index], [field]: value };
    updateCharacter(activeCharacter, { buffs: updatedBuffs });
  };

  const handleNewBuffChange = (field: keyof typeof newBuff, value: string) => {
    setNewBuff((prev) => ({ ...prev, [field]: value }));
  };

  const addNewBuff = () => {
    if (newBuff.description.trim() !== "") {
      updateCharacter(activeCharacter, {
        buffs: [...buffsList, newBuff],
      });
      setNewBuff({ description: "" });
    }
  };

  const removeBuff = (index: number) => {
    const updatedBuffs = buffsList.filter((_, i) => i !== index);
    updateCharacter(activeCharacter, { buffs: updatedBuffs });
  };

  return (
    <Box sx={{ maxHeight:'28vh', }}>
      <Typography variant="h6">Buffs</Typography>
      <Box  sx={{ maxHeight:'28vh', overflow: "auto", pt: 1, pb:2 }}>
      <Grid container spacing={1}>
        {buffsList.length === 0 && (
          <Typography
            variant="body2"
            sx={{ width: "100%", textAlign: "center", mb: 1 }}
          >
            No buffs yet. Add one below.
          </Typography>
        )}

        {buffsList.map((buff, index) => (
          <Grid key={index} container size={12} alignItems="center" spacing={1}>
            <Grid size={10}>
              <TextField
                value={buff.description}
                onChange={(e) =>
                  handleBuffChange(index, "description", e.target.value)
                }
                fullWidth
                size='small'
                label="Description"
              />
            </Grid>
            <Grid size={2}>
              <IconButton onClick={() => removeBuff(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* New Buff Row */}
        <Grid container size={12} alignItems="center" spacing={1}>
          <Grid size={10}>
            <TextField
              value={newBuff.description}
              onChange={(e) =>
                handleNewBuffChange("description", e.target.value)
              }
              placeholder="Buff Description"
              fullWidth
              size='small'
              label="Description"
            />
          </Grid>
          <Grid size={2}>
            <IconButton
              onClick={addNewBuff}
              disabled={newBuff.description.trim() === ""}
            >
              <AddCircleIcon
                color={newBuff.description.trim() !== "" ? "primary" : "disabled"}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default CharacterBuffTracker;
