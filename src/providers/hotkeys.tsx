import { FC } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { BILLING_ENABLED, NOTIFICATIONS_ENABLED } from "@/constants/application.ts";

interface HotkeysProviderProps {
  children: React.ReactNode;
}

export const HotkeysProvider: FC<HotkeysProviderProps> = (props) => {
  const { children } = props;

  const auth = useAuth();
  const navigate = useNavigate();

  useHotkeys("ctrl+shift+u, meta+shift+u", () => auth.signoutRedirect(), [auth]);
  useHotkeys("ctrl+shift+o, meta+shift+o", () => navigate("/account"), [navigate]);
  useHotkeys("ctrl+shift+r, meta+shift+r", () => navigate("/"), [navigate]);

  useHotkeys(
    "ctrl+shift+f, meta+shift+f",
    () => {
      if (NOTIFICATIONS_ENABLED === "true") {
        navigate("/notifications");
      }
    },
    [navigate],
  );

  useHotkeys(
    "ctrl+shift+l, meta+shift+l",
    () => {
      if (BILLING_ENABLED === "true") {
        navigate("/billing");
      }
    },
    [navigate],
  );

  return <>{children}</>;
};

export default HotkeysProvider;
