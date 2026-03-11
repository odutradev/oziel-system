import { useTheme } from '@mui/material/styles';
import MDEditor from '@uiw/react-md-editor';

import { EditorContainer } from './styles';

import type { MarkdownEditorProps } from './types';

const MarkdownEditor = ({ value, onChange, height = 400, ...rest }: MarkdownEditorProps) => {
  const theme = useTheme();

  return (
    <EditorContainer data-color-mode={theme.palette.mode}>
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        height={height}
        preview="live"
        {...rest}
      />
    </EditorContainer>
  );
};

export default MarkdownEditor;