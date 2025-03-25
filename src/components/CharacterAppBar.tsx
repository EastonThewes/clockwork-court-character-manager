import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import { useCharacterTabs } from "./CharacterTabsContext";

const CharacterAppBar = () => {
  const { addNewCharacter, updateCharacterFromFile } = useCharacterTabs();

  const handleExport = () => {
    const character = localStorage.getItem("currentCharacter");
    if (!character) return;

    const blob = new Blob([character], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "character.json";
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
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Character Manager
        </Typography>
        <input
          type="file"
          accept="application/json"
          hidden
          id="import-character"
          onChange={handleImport}
        />
        <label htmlFor="import-character">
          <IconButton color="inherit" component="span">
            <FileUploadIcon />
          </IconButton>
        </label>
        <IconButton color="inherit" onClick={handleExport}>
          <FileDownloadIcon />
        </IconButton>
        <IconButton color="inherit" onClick={addNewCharacter}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CharacterAppBar;
