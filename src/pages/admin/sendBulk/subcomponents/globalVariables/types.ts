export interface GlobalVariablesProps {
  variables: Record<string, string>;
  onAddVariable: (key: string, value: string) => void;
  onRemoveVariable: (key: string) => void;
}