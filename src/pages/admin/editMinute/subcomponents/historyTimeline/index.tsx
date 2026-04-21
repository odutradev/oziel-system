import { useTheme } from "@mui/material/styles";
import MDEditor from "@uiw/react-md-editor";
import { Typography, Box } from "@mui/material";

import { TimelineContainer, HistoryCard, HistoryHeader } from "./styles";
import EditSection from "@components/editSection";

import type { HistoryTimelineProps } from "./types";

const HistoryTimeline = ({ history }: HistoryTimelineProps) => {
    const theme = useTheme();

    if (!history || history.length === 0) return null;

    return (
        <EditSection title="Histórico de Alterações">
            <TimelineContainer>
                {history.slice().reverse().map((item, idx) => (
                    <HistoryCard key={`${item.updatedAt}-${idx}`}>
                        <HistoryHeader>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="subtitle2" fontWeight={600}>{item.updatedBy.name}</Typography>
                                <Typography variant="caption" color="textSecondary">{item.updatedBy.email}</Typography>
                            </Box>
                            <Typography variant="caption" color="textSecondary">
                                {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(item.updatedAt))}
                            </Typography>
                        </HistoryHeader>
                        <Box data-color-mode={theme.palette.mode} width="100%">
                            <MDEditor.Markdown source={item.content} style={{ backgroundColor: "transparent" }} />
                        </Box>
                    </HistoryCard>
                ))}
            </TimelineContainer>
        </EditSection>
    );
};

export default HistoryTimeline;