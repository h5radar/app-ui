import { FC } from "react";
import { YMInitializer } from "react-yandex-metrika";

import usePageTracking from "@/hooks/use-page-tracking";

interface AnaliticsProviderProps {
  children: React.ReactNode;
}

const AnaliticsProvider: FC<AnaliticsProviderProps> = (props) => {
  const { children } = props;
  usePageTracking();

  return (
    <>
      <YMInitializer accounts={[parseInt(import.meta.env.VITE_YANDEX_METRICA)]} />
      {children}
    </>
  );
};
export default AnaliticsProvider;
