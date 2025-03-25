import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";
import { useCharacter } from "./CharacterContext";
import { VerticalAlignCenter } from "@mui/icons-material";

const CharacterEndeavorDice = () => {
  const { character, updateCharacter } = useCharacter();
  const theme = useTheme(); // Access theme colors globally
  const handleClick = (value: number) => {
    let newValue = character.endeavorDice;

    if (value === 1) {
      if (newValue === 1) {
        newValue = 0; // Toggle off if already at 1
      } else if (newValue > 1) {
        newValue = 1; // Reduce to 1 if at 2 or 3
      } else {
        newValue = 1; // Otherwise, set to 1
      }
    } else {
      newValue = value; // Clicking 2 or 3 sets it directly
    }

    updateCharacter({ endeavorDice: newValue });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center", // ? Centers vertically
        justifyContent: "center", // ? Centers horizontally
        gap: 2, // Adds spacing between "Endeavor" and the buttons
      }}
    >
      <Typography variant="h4">Endeavor Dice</Typography>
      {[1, 2, 3].map((num) => (
        <IconButton
          key={num}
          onClick={() => handleClick(num)}
          sx={{
            color:
              character.endeavorDice >= num
                ? theme.palette.primary.main // Green when selected
                : theme.palette.grey[500], // Gray when not selected
          }}
        >
          <CircleIcon fontSize="large" />
        </IconButton>
      ))}
    </Box>
  );
};

export default CharacterEndeavorDice;
