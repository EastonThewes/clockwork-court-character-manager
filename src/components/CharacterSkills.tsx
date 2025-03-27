import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton, Grid2 } from "@mui/material";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterSkills = () => {
  const { characters, activeCharacter, updateCharacter } = useCharacter();
  const character = characters[activeCharacter] || {}; // Ensure character is never undefined

  useEffect(() => {
    if (!Array.isArray(character.skills)) {
      updateCharacter(activeCharacter, { skills: [] });
    }
  }, [character.skills, activeCharacter, updateCharacter]);

  const skillsList = Array.isArray(character.skills) ? character.skills : []; // Ensure it's an array
  const [newSkill, setNewSkill] = useState({ skill: "", rank: 1 });

  const handleSkillChange = (index: number, field: "skill" | "rank", value: string | number) => {
    if (!Array.isArray(skillsList)) return; // Extra safety check
    const updatedSkills = [...skillsList];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    updateCharacter(activeCharacter, { skills: updatedSkills });
  };

  const handleNewSkillChange = (field: "skill" | "rank", value: string | number) => {
    setNewSkill((prev) => ({ ...prev, [field]: value }));
  };

  const addNewSkill = () => {
    if (newSkill.skill.trim()) {
      updateCharacter(activeCharacter, { skills: [...skillsList, newSkill] });
      setNewSkill({ skill: "", rank: 1 });
    }
  };

  const removeSkill = (index: number) => {
    if (!Array.isArray(skillsList)) return;
    const updatedSkills = skillsList.filter((_, i) => i !== index);
    updateCharacter(activeCharacter, { skills: updatedSkills });
  };

  return (
    <Box sx={{ maxHeight:'45vh' }}>
      <Typography variant="h6" mb={1}>Skills</Typography>
      <Box sx={{maxHeight:'40vh',overflow:'auto', pt:1}}>
      <Grid2 container spacing={1}>
        {skillsList.length === 0 && (
          <Typography variant="body2" sx={{ width: "100%", textAlign: "center", mb: 1 }}>
            No skills yet. Add one below.
          </Typography>
        )}

        {skillsList.map((skill, index) => (
          <Grid2 key={index} container  size={12} spacing={1} >
            <Grid2  size={7}>
              <TextField
                value={skill.skill}
                onChange={(e) => handleSkillChange(index, "skill", e.target.value)}
                fullWidth
                label="Skill"
                size="small"
              />
            </Grid2>
            <Grid2  size={3}>
              <TextField
                type="number"
                value={skill.rank}
                onChange={(e) => handleSkillChange(index, "rank", +e.target.value)}
                fullWidth
                label="Rank"
                size="small"
                sx={{
                  "& input": {
                    textAlign: "center",
                    MozAppearance: "textfield",
                    WebkitAppearance: "textfield",
                  },
                }}
              />
            </Grid2>
            <Grid2  size={2}>
              <IconButton onClick={() => removeSkill(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid2>
          </Grid2>
        ))}

        <Grid2 container size={12}  spacing={1}>
          <Grid2  size={7}>
            <TextField
              value={newSkill.skill}
              onChange={(e) => handleNewSkillChange("skill", e.target.value)}
              fullWidth
              label="Skill"
              size="small"
            />
          </Grid2>
          <Grid2  size={3}>
            <TextField
              type="number"
              value={newSkill.rank}
              onChange={(e) => handleNewSkillChange("rank", +e.target.value)}
              fullWidth
              label="Rank"
              size="small"
              sx={{
                "& input": {
                  textAlign: "center",
                  MozAppearance: "textfield",
                  WebkitAppearance: "textfield",
                },
              }}
            />
          </Grid2>
          <Grid2  size={2}>
            <IconButton onClick={addNewSkill} disabled={!newSkill.skill.trim()}>
              <AddCircleIcon color={newSkill.skill.trim() ? "primary" : "disabled"} />
            </IconButton>
          </Grid2>
        </Grid2>
      </Grid2>
      </Box>
    </Box>
  );
};

export default CharacterSkills;
