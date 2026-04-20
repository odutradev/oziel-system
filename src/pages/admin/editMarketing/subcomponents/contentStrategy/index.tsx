import { Typography, Box } from "@mui/material";

import MarkdownEditor from "@components/markdownEditor";
import EditSection from "@components/editSection";
import { ContentContainer } from "./styles";

import type { ContentStrategyProps } from "./types";

const ContentStrategy = ({ formData, onChange }: ContentStrategyProps) => (
    <EditSection title="Conteúdo e Estratégia">
        <ContentContainer>
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="subtitle2" color="textSecondary">
                    Estratégia (Markdown)
                </Typography>
                <MarkdownEditor
                    value={formData.strategy || ""}
                    onChange={(val) => onChange("strategy", val)}
                    preview="live"
                    height={300}
                />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="subtitle2" color="textSecondary">
                    Conteúdo / Legenda (Markdown)
                </Typography>
                <MarkdownEditor
                    value={formData.content || ""}
                    onChange={(val) => onChange("content", val)}
                    preview="live"
                    height={400}
                />
            </Box>
        </ContentContainer>
    </EditSection>
);

export default ContentStrategy;