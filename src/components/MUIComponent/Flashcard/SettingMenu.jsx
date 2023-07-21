import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function SettingMenu({ onDelete, onEdit, onRestart }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={onEdit}>Edit</MenuItem>
        <MenuItem onClick={onRestart}>Restart Flashcards</MenuItem>
        <MenuItem
          sx={{
            color: "red",
            border: "1px solid red",
            "&:hover": {
              background: "red",
              color: "white",
            },
          }}
          onClick={onDelete}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
