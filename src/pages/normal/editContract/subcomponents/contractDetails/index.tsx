import { Box } from '@mui/material';

import MarkdownEditor from '@components/markdownEditor';
import EditSection from '@components/editSection';

import type { ContractDetailsProps } from './types';

const ContractDetails = ({ formData, onChange }: ContractDetailsProps) => {
  return (
    <EditSection title="Detalhamento do Contrato">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <MarkdownEditor
          value={formData.detailsMarkdown || ''}
          onChange={(val) => onChange('detailsMarkdown', val)}
          height={500}
        />
      </Box>
    </EditSection>
  );
};

export default ContractDetails;