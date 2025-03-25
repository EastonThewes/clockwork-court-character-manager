import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterWeapons = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter]; // Get the active character

  // Ensure character.weapons exists
  useEffect(() => {
    if (!character.weapons) {
      updateCharacter(activeCharacter, { weapons:  []  });
    }
  }, [character, activeCharacter, updateCharacter]);

  const weaponsList = Array.isArray(character.weapons) ? character.weapons : [];

  const [newWeapon, setNewWeapon] = useState({
    qualities: "",
    modifiers: "",
    attack: "",
    damage: "",
  });

  const handleWeaponChange = (
    index: number,
    field: keyof typeof newWeapon,
    value: string
  ) => {
    const updatedWeapons = [...weaponsList];
    updatedWeapons[index] = { ...updatedWeapons[index], [field]: value };
    updateCharacter(activeCharacter, { weapons: updatedWeapons  });
  };

  const handleNewWeaponChange = (
    field: keyof typeof newWeapon,
    value: string
  ) => {
    setNewWeapon((prev) => ({ ...prev, [field]: value }));
  };

  const addNewWeapon = () => {
    // Using "qualities" as a required field, adjust if needed
    if (newWeapon.qualities.trim() !== "") {
      updateCharacter(activeCharacter, {
        weapons: [...weaponsList, newWeapon] ,
      });
      setNewWeapon({ qualities: "", modifiers: "", attack: "", damage: "" });
    }
  };

  const removeWeapon = (index: number) => {
    const updatedWeapons = weaponsList.filter((_, i) => i !== index);
    updateCharacter(activeCharacter, { weapons:  updatedWeapons  });
  };

  return (
    <Box sx={{ maxHeight: "300px", overflow: "auto", padding: 1 }}>
      <Typography variant="h6">Weapons</Typography>
      <Grid container spacing={1}>
        {weaponsList.length === 0 && (
          <Typography
            variant="body2"
            sx={{ width: "100%", textAlign: "center", mb: 1 }}
          >
            No weapons yet. Add one below.
          </Typography>
        )}

        {weaponsList.map((weapon, index) => (
          <Grid key={index} container size={12} alignItems="center" spacing={1}>
            <Grid size={3}>
              <TextField
                value={weapon.qualities}
                onChange={(e) =>
                  handleWeaponChange(index, "qualities", e.target.value)
                }
                fullWidth
                label="Qualities"
              />
            </Grid>
            <Grid size={3}>
              <TextField
                value={weapon.modifiers}
                onChange={(e) =>
                  handleWeaponChange(index, "modifiers", e.target.value)
                }
                fullWidth
                label="Modifiers"
              />
            </Grid>
            <Grid size={3}>
              <TextField
                value={weapon.attack}
                onChange={(e) =>
                  handleWeaponChange(index, "attack", e.target.value)
                }
                fullWidth
                label="Attack"
              />
            </Grid>
            <Grid size={2}>
              <TextField
                value={weapon.damage}
                onChange={(e) =>
                  handleWeaponChange(index, "damage", e.target.value)
                }
                fullWidth
                label="Damage"
              />
            </Grid>
            <Grid size={1}>
              <IconButton onClick={() => removeWeapon(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* New Weapon Row */}
        <Grid container size={12} alignItems="center" spacing={1}>
          <Grid size={3}>
            <TextField
              value={newWeapon.qualities}
              onChange={(e) =>
                handleNewWeaponChange("qualities", e.target.value)
              }
              placeholder="Qualities"
              fullWidth
              label="Qualities"
            />
          </Grid>
          <Grid size={3}>
            <TextField
              value={newWeapon.modifiers}
              onChange={(e) =>
                handleNewWeaponChange("modifiers", e.target.value)
              }
              placeholder="Modifiers"
              fullWidth
              label="Modifiers"
            />
          </Grid>
          <Grid size={3}>
            <TextField
              value={newWeapon.attack}
              onChange={(e) =>
                handleNewWeaponChange("attack", e.target.value)
              }
              placeholder="Attack"
              fullWidth
              label="Attack"
            />
          </Grid>
          <Grid size={2}>
            <TextField
              value={newWeapon.damage}
              onChange={(e) =>
                handleNewWeaponChange("damage", e.target.value)
              }
              placeholder="Damage"
              fullWidth
              label="Damage"
            />
          </Grid>
          <Grid size={1}>
            <IconButton
              onClick={addNewWeapon}
              disabled={newWeapon.qualities.trim() === ""}
            >
              <AddCircleIcon
                color={newWeapon.qualities.trim() !== "" ? "primary" : "disabled"}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterWeapons;
