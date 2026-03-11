import type { MDEditorProps } from '@uiw/react-md-editor';

export interface MarkdownEditorProps extends Omit<MDEditorProps, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}