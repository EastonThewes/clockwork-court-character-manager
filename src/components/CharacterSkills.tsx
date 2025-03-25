import { useCharacter } from "./CharacterContext";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CharacterSkills = () => {
  const { character, updateCharacter } = useCharacter();
  const [newSkill, setNewSkill] = useState({ skill: "", rank: 1 });

  const handleSkillChange = (index: number, field: "skill" | "rank", value: string | number) => {
    const updatedSkills = [...character.skills.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    updateCharacter({ skills: { ...character.skills, skills: updatedSkills } });
  };

  const handleNewSkillChange = (field: "skill" | "rank", value: string | number) => {
    setNewSkill((prev) => ({ ...prev, [field]: value }));
  };

  const addNewSkill = () => {
    if (newSkill.skill.trim() !== "") {
      updateCharacter({
        skills: { ...character.skills, skills: [...character.skills.skills, newSkill] },
      });
      setNewSkill({ skill: "", rank: 1 }); // Reset input fields
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = character.skills.skills.filter((_, i) => i !== index);
    updateCharacter({ skills: { ...character.skills, skills: updatedSkills } });
  };

  return (
    <Box sx={{ maxHeight: "300px", overflow: "auto", padding: 1 }}>
      <Typography variant="h6">Skills</Typography>
      <Grid container spacing={1}>
        {character.skills.skills.map((skill, index) => (
          <Grid key={index} container size={12} alignItems="center" spacing={1}>
            <Grid size={7}>
              <TextField
                value={skill.skill}
                onChange={(e) => handleSkillChange(index, "skill", e.target.value)}
                fullWidth
                // sx={{ height: "2.5rem" }}
              />
            </Grid>
            <Grid size={3}>
              <TextField
                type="number"
                value={skill.rank}
                onChange={(e) => handleSkillChange(index, "rank", +e.target.value)}
                fullWidth
                sx={{
                  "& input": {
                    textAlign: "center",
                    // height: "2.5rem",
                    MozAppearance: "textfield", // Hides number increment controls
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
            //   sx={{ height: "2.5rem" }}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              type="number"
              value={newSkill.rank}
              onChange={(e) => handleNewSkillChange("rank", +e.target.value)}
              fullWidth
              sx={{
                "& input": {
                  textAlign: "center",
                //   height: "2.5rem",
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
