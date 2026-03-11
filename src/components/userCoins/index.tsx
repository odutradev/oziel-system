import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

import HoverMenu from "./subcomponents/HoverMenu";
import CoinBadge from "./subcomponents/CoinBadge";
import useUserStore from "@stores/user";

import type { UserCoinsProps } from "./types";

const UserCoins = ({ enableHoverMenu = false }: UserCoinsProps) => {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);

  if (!user) return null;

  const handleBuyCredits = () => navigate("/dashboard/plans");

  const badge = <CoinBadge amount={user.coins || 0} />;

  if (!enableHoverMenu) return badge;

  return (
    <Tooltip
      title={<HoverMenu onBuyClick={handleBuyCredits} />}
      placement="bottom-end"
      leaveDelay={200}
      arrow
    >
      <div>{badge}</div>
    </Tooltip>
  );
};

export default UserCoins;