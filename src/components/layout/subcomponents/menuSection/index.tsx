import { ListItemButton, ListItemIcon, ListItemText, Typography, ListItem, useTheme, Tooltip, List, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import useSystemStore from '@stores/system';

import type { LayoutMenuSectionProps } from './types';

const MenuSection = ({ section, onNavigate }: LayoutMenuSectionProps) => {
  const { system } = useSystemStore(x => x);
  const theme = useTheme();
  const location = useLocation();

  const iconAlign = system.menuOpen ? {} : { justifyContent: 'center', alignItems: 'center' };

  return (
    <Box sx={{ mt: system.menuOpen ? 1.5 : 1 }}>
      {system.menuOpen && (
        <Typography variant="overline" color="text.secondary" sx={{ mx: 1, mb: 0.5, display: 'block', fontSize: '0.625rem' }}>
          {section.sectionName}
        </Typography>
      )}
      <List disablePadding>
        {section.items.map(item => {
          const isSelected = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

          const listItemButton = (
            <ListItemButton
              component="a"
              href={item.path}
              selected={isSelected}
              onClick={onNavigate}
              sx={{
                ...iconAlign,
                px: 1,
                height: 28,
                borderRadius: 1,
                mx: system.menuOpen ? 0.5 : 0,
                width: system.menuOpen ? 'auto' : '100%',
                '&:hover': { backgroundColor: theme.palette.action.hover },
                '& svg': { fontSize: '1rem' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: system.menuOpen ? 1 : 0, justifyContent: 'center', '& svg': { fontSize: '1rem' } }}>
                {item.icon}
              </ListItemIcon>
              {system.menuOpen && (
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ variant: 'body2', noWrap: true, fontSize: '0.75rem' }}
                />
              )}
            </ListItemButton>
          );

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              {system.menuOpen ? listItemButton : (
                <Tooltip title={item.name} placement="right">
                  {listItemButton}
                </Tooltip>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default MenuSection;