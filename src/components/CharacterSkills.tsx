import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterSkills = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter];

  // Ensure character.skills exists
  useEffect(() => {
    if (!character.skills) {
      updateCharacter(activeCharacter, { skills: { skills: [] } });
    }
  }, [character, activeCharacter, updateCharacter]);

  const skillsList = character.skills?.skills || [];

  const [newSkill, setNewSkill] = useState({ skill: "", rank: 1 });

  const handleSkillChange = (index: number, field: "skill" | "rank", value: string | number) => {
    const updatedSkills = [...skillsList];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    updateCharacter(activeCharacter, { skills: { skills: updatedSkills } });
  };

  const handleNewSkillChange = (field: "skill" | "rank", value: string | number) => {
    setNewSkill((prev) => ({ ...prev, [field]: value }));
  };

  const addNewSkill = () => {
    if (newSkill.skill.trim() !== "") {
      updateCharacter(activeCharacter, { skills: { skills: [...skillsList, newSkill] } });
      setNewSkill({ skill: "", rank: 1 });
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skillsList.filter((_, i) => i !== index);
    updateCharacter(activeCharacter, { skills: { skills: updatedSkills } });
  };

  if (!character || !character.traits) {
    return <div>Loading character...</div>; // Handle missing data gracefully
  }

  return (
    <Box sx={{ maxHeight: "300px", overflow: "auto", padding: 1 }}>
      <Typography variant="h6">Skills</Typography>
      <Grid container spacing={1}>
        {skillsList.length === 0 && (
          <Typography variant="body2" sx={{ width: "100%", textAlign: "center", mb: 1 }}>
            No skills yet. Add one below.
          </Typography>
        )}

        {skillsList.map((skill, index) => (
          <Grid key={index} container size={12} alignItems="center" spacing={1}>
            <Grid size={7}>
              <TextField
                value={skill.skill}
                onChange={(e) => handleSkillChange(index, "skill", e.target.value)}
                fullWidth
                label="Skill"
              />
            </Grid>
            <Grid size={3}>
              <TextField
                type="number"
                value={skill.rank}
                onChange={(e) => handleSkillChange(index, "rank", +e.target.value)}
                fullWidth
                label="Rank"
                sx={{
                  "& input": {
                    textAlign: "center",
                    MozAppearance: "textfield",
                    WebkitAppearance: "textfield",
                  },
                }}
              />
            </Grid>
            <Grid size={2}>
              <IconButton onClick={() => removeSkill(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* New Skill Row */}
        <Grid container size={12} alignItems="center" spacing={1}>
          <Grid size={7}>
            <TextField
              value={newSkill.skill}
              onChange={(e) => handleNewSkillChange("skill", e.target.value)}
              placeholder="New Skill"
              fullWidth
              label="Skill"
            />
          </Grid>
          <Grid size={3}>
            <TextField
              type="number"
              value={newSkill.rank}
              onChange={(e) => handleNewSkillChange("rank", +e.target.value)}
              fullWidth
              label="Rank"
              sx={{
                "& input": {
                  textAlign: "center",
                  MozAppearance: "textfield",
                  WebkitAppearance: "textfield",
                },
              }}
            />
          </Grid>
          <Grid size={2}>
            <IconButton onClick={addNewSkill} disabled={newSkill.skill.trim() === ""}>
              <AddCircleIcon color={newSkill.skill.trim() !== "" ? "primary" : "disabled"} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterSkills;
