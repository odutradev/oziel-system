import { Drawer, IconButton, Box, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';

import BreadcrumbsDisplay from '../breadcrumbsDisplay';

import type { LayoutDrawerProps } from './types';

const LayoutDrawer = ({ breadcrumbs, children, isMobile, onClose, width, open }: LayoutDrawerProps) => {
    const theme = useTheme();

    if (isMobile) {
        return (
            <Drawer
                PaperProps={{
                    sx: {
                        width: '100%',
                        display: 'flex',
                        boxSizing: 'border-box',
                        flexDirection: 'column'
                    }
                }}
                variant="temporary"
                onClose={onClose}
                open={open}
            >
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1, mr: 2, minWidth: 0, overflow: 'hidden' }}>
                        <BreadcrumbsDisplay
                            items={breadcrumbs}
                            maxItems={3}
                            onItemClick={onClose}
                            sx={{ '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' } }}
                            itemSx={{
                                maxWidth: '100%',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                display: 'block',
                                fontSize: '0.85rem'
                            }}
                        />
                    </Box>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
                {children}
            </Drawer>
        );
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                display: 'flex',
                flexDirection: 'column',
                '& .MuiDrawer-paper': {
                    width,
                    p: 1,
                    display: 'flex',
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                    flexDirection: 'column',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            }}
        >
            {children}
        </Drawer>
    );
};

export default LayoutDrawer;