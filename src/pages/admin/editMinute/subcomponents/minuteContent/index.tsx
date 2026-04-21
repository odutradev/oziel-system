import { Typography, Box } from "@mui/material";

import MarkdownEditor from "@components/markdownEditor";
import EditSection from "@components/editSection";
import { ContentContainer } from "./styles";

import type { MinuteContentProps } from "./types";

const MinuteContent = ({ formData, onChange }: MinuteContentProps) => (
    <EditSection title="Conteúdo da Ata">
        <ContentContainer>
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="subtitle2" color="textSecondary">
                    Redação (Markdown) - Novas alterações serão salvas como uma nova versão no histórico
                </Typography>
                <MarkdownEditor
                    value={formData.content || ""}
                    onChange={(val) => onChange("content", val)}
                    preview="live"
                    height={500}
                />
            </Box>
        </ContentContainer>
    </EditSection>
);

export default MinuteContent;