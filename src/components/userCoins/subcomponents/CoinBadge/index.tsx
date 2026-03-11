import { MonetizationOn } from "@mui/icons-material";
import { Typography } from "@mui/material";

import getCurrentTheme from "@styles/theme";
import { Container } from "./styles";

import type { CoinBadgeProps } from "./types";

const CoinBadge = ({ amount, transparent }: CoinBadgeProps) => (
  <Container transparent={transparent}>
    <MonetizationOn
      sx={{ color: getCurrentTheme().colors.gold }}
      fontSize="small"
    />
    <Typography variant="subtitle2" fontWeight={600}>
      {amount}
    </Typography>
  </Container>
);

export default CoinBadge;