import { FC } from "react";

import usePageTracking from "@/hooks/use-page-tracking";

interface AnaliticsProviderProps {
  children: React.ReactNode;
}

const AnaliticsProvider: FC<AnaliticsProviderProps> = (props) => {
  const { children } = props;
  usePageTracking();
  return <>{children}</>;
};
export default AnaliticsProvider;
