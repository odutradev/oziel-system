import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const EditorContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  '--md-editor-background-color': theme.palette.background.paper,
  '--md-editor-text-color': theme.palette.text.primary,
  '--md-editor-border-color': theme.palette.divider,
  '& .w-md-editor': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
    overflow: 'hidden',
    transition: theme.transitions.create(['border-color']),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '&:focus-within': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .w-md-editor-toolbar': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.action.hover : theme.palette.grey[50],
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    flexShrink: 0,
    '& ul li button': {
      color: theme.palette.text.secondary,
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.selected,
      },
      '&.active': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.action.selected,
      },
    },
  },
  '& .w-md-editor-content': {
    backgroundColor: theme.palette.background.paper,
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
  },
  '& .w-md-editor-area': {
    flex: '1 1 auto',
    display: 'flex',
    height: '100% !important',
    minHeight: 0,
  },
  '& .w-md-editor-input': {
    height: '100% !important',
    width: '50%',
    padding: 0,
    overflow: 'hidden',
  },
  '& .w-md-editor-text': {
    minHeight: '100% !important',
    width: '100% !important',
  },
  '& .w-md-editor-fullscreen': {
    zIndex: theme.zIndex.modal + 1,
  },
  '& textarea': {
    backgroundColor: `${theme.palette.background.paper} !important`,
    color: `${theme.palette.text.primary} !important`,
    caretColor: `${theme.palette.text.primary} !important`,
    fontFamily: '"Roboto Mono", monospace !important',
    fontSize: '0.875rem !important',
    lineHeight: '1.5 !important',
    padding: `${theme.spacing(2)} !important`,
    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    height: '100% !important',
    minHeight: '100% !important',
    overflowY: 'auto !important',
  },
  '& .wmde-markdown': {
    backgroundColor: 'transparent !important',
    minHeight: '100% !important',
    '& hr': {
      height: '1px !important',
      backgroundColor: `${theme.palette.divider} !important`,
      border: 'none !important',
    },
  },
  '& .w-md-editor-preview': {
    backgroundColor: `${theme.palette.background.paper} !important`,
    color: `${theme.palette.text.primary} !important`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    boxShadow: 'none',
    height: '100% !important',
    overflowY: 'auto',
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      borderBottomColor: theme.palette.divider,
      color: theme.palette.text.primary,
    },
    '& p, & li': {
      color: theme.palette.text.primary,
      lineHeight: 1.6,
      whiteSpace: 'pre-wrap !important',
    },
    '& a': {
      color: theme.palette.primary.main,
    },
    '& code': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.secondary.main,
      borderRadius: 4,
      padding: '2px 4px',
      fontFamily: '"Roboto Mono", monospace',
    },
    '& pre': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.action.hover : theme.palette.grey[100],
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      '& code': {
        backgroundColor: 'transparent',
        color: 'inherit',
        padding: 0,
      },
    },
    '& blockquote': {
      borderLeftColor: theme.palette.divider,
      color: theme.palette.text.secondary,
    },
  },
}));