import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import { useCharacter } from "./CharacterContext"; // Use correct context
import { useRef } from "react";

const CharacterAppBar = () => {
  const { characters, activeCharacter, addCharacter, updateCharacterFromFile } = useCharacter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (characters.length === 0) return;
  
    const character = characters[activeCharacter];
    const characterName = character.name ? character.name.replace(/\s+/g, "_") : `character_${activeCharacter + 1}`; // Ensure a safe filename
    const characterData = JSON.stringify(character, null, 2);
    const blob = new Blob([characterData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${characterName}.json`;
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        updateCharacterFromFile(data);
      } catch (error) {
        console.error("Invalid JSON file.");
      }
    };
    reader.readAsText(file);

    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Clockwork Court Character Manager
        </Typography>
        <input
          type="file"
          accept="application/json"
          hidden
          ref={fileInputRef}
          onChange={handleImport}
        />
        <IconButton color="inherit" onClick={() => fileInputRef.current?.click()}>
          <FileUploadIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleExport}>
          <FileDownloadIcon />
        </IconButton>
        <IconButton color="inherit" onClick={addCharacter}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CharacterAppBar;
