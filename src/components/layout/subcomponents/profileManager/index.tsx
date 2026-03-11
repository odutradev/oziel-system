import { Box, ListItemButton, Menu, MenuItem, Divider, IconButton, Typography, useTheme, alpha } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import stringService from '@utils/services/stringService';
import ProfileAvatar from '@components/profileAvatar';
import useSystemStore from '@stores/system';
import { profileItemsData } from './data';
import useUserStore from '@stores/user';

import type { ProfileManagerProps } from './types';

const ProfileManager = ({ onNavigate }: ProfileManagerProps) => {
  const { system, updateSystem } = useSystemStore();
  const { user } = useUserStore((x) => x);
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorWidth, setAnchorWidth] = useState(0);
  const open = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    let isOpen = system.menuOpen;
    if (!isOpen){
      updateSystem({ menuOpen: true });
    };
    const el = e.currentTarget;
    setAnchorWidth(isOpen ? el.getBoundingClientRect().width : 200);
    setAnchorEl(el);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    navigate("/logout");
    handleClose();
    onNavigate?.();
  };

  const handleToggleTheme = () => {
    updateSystem({ theme: system.theme === "dark" ? "light" : "dark" });
    handleClose();
  };

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Divider sx={{ my: 1 }} />
      <ListItemButton
        onClick={handleOpen}
        sx={{
          px: system.menuOpen ? 1.5 : 0,
          height: 40,
          borderRadius: 1,
          mx: system.menuOpen ? 0.5 : 0,
          width: system.menuOpen ? "auto" : "100%",
          display: "flex",
          justifyContent: system.menuOpen ? "space-between" : "center",
          alignItems: "center",
          "&:hover": { backgroundColor: theme.palette.action.hover },
        }}
      >
        {system.menuOpen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Typography variant="body2" noWrap sx={{ fontSize: "0.8rem" }}>
              Minha Conta
            </Typography>
            <Typography variant="caption" noWrap sx={{ fontSize: "0.7rem" }}>
              {user?.name
                ? stringService.getFirstAndLastName(user.name)
                : user?._id}
            </Typography>
          </Box>
        )}
        <ProfileAvatar
            text={user?.name || user?._id || ""}
            imageUrl={user?.images?.profile}
            size={28}
            textSize={0.7}
            fontWeight={600}
          />
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: "-8px",
            p: "12px",
            width: anchorWidth,
            bgcolor: theme.palette.background.default,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
            zIndex: theme.zIndex.drawer + 1,
          },
        }}
      >
        {profileItemsData.map(({ name, path }) => (
          <MenuItem
            key={path}
            onClick={() => {
              navigate(path);
              handleClose();
              onNavigate?.();
            }}
            sx={{ px: 1, py: 0.75, fontSize: "0.875rem" }}
          >
            {name}
          </MenuItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{
              px: 1,
              py: 0.75,
              fontSize: "0.875rem",
              borderRadius: "0.15rem",
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.1),
              },
            }}
          >
            Finalizar sessão
          </MenuItem>
          <IconButton
            onClick={handleToggleTheme}
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              p: 0,
            }}
          >
            {system.theme === "dark" ? (
              <Brightness7Icon fontSize="small" />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Menu>
    </Box>
  );
};

export default ProfileManager;