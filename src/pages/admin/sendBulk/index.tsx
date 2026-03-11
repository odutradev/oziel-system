import { Send, Group } from '@mui/icons-material';
import { Alert, Button } from '@mui/material';

import Layout from '@components/layout';
import RecipientManager from './subcomponents/recipientManager';
import GlobalVariables from './subcomponents/globalVariables';
import TemplateConfig from './subcomponents/templateConfig';
import { PageContainer, ActionsContainer } from './styles';
import useSendBulk from './hooks';
import metadata from './metadata';

const SendBulkEmail = () => {
  const {
    formData,
    loading,
    handleTriggerChange,
    handleAddRecipient,
    handleRemoveRecipient,
    handleImportRecipients,
    handleAddVariable,
    handleRemoveVariable,
    handleSendBulk,
    handleSendToAll,
    handleCancel
  } = useSendBulk();

  return (
    <Layout {...metadata} loading={loading}>
      <PageContainer>
        <Alert severity="info">
          Configure o template e destinatários antes de enviar. Variáveis globais serão aplicadas a todos os emails.
        </Alert>

        <TemplateConfig
          trigger={formData.trigger}
          onTriggerChange={handleTriggerChange}
        />

        <GlobalVariables
          variables={formData.globalVariables}
          onAddVariable={handleAddVariable}
          onRemoveVariable={handleRemoveVariable}
        />

        <RecipientManager
          recipients={formData.recipients}
          onAddRecipient={handleAddRecipient}
          onRemoveRecipient={handleRemoveRecipient}
          onImportRecipients={handleImportRecipients}
        />

        <ActionsContainer>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel}
            sx={{ flex: 1 }}
          >
            Cancelar
          </Button>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<Group />}
            onClick={handleSendToAll}
            sx={{ flex: 1 }}
          >
            Enviar para Todos
          </Button>
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={handleSendBulk}
            sx={{ flex: 1 }}
            disabled={formData.recipients.length === 0}
          >
            Enviar ({formData.recipients.length})
          </Button>
        </ActionsContainer>
      </PageContainer>
    </Layout>
  );
};

export default SendBulkEmail;