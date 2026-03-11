import { AddShoppingCart } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";

import { Container } from "./styles";

import type { HoverMenuProps } from "./types";

const HoverMenu = ({ onBuyClick }: HoverMenuProps) => (
  <Container>
    <Typography variant="subtitle2" color="inherit">
      Saldo de Moedas
    </Typography>
    <Typography variant="caption" color="inherit">
      Utilize moedas para gerar provas e recursos premium.
    </Typography>
    <Button
      startIcon={<AddShoppingCart />}
      variant="contained"
      onClick={onBuyClick}
      color="primary"
      size="small"
      fullWidth
    >
      Adquirir Moedas
    </Button>
  </Container>
);

export default HoverMenu;