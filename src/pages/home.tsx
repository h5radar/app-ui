import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { useSeedCompliances } from "@/queries/compliance";
import { useSeedLicenses } from "@/queries/license";
import { useSeedMaturities } from "@/queries/maturity";
import { useSeedPractices } from "@/queries/practice";
import { useSeedTechnologies } from "@/queries/technology";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { mutate: seedLicenses, isPending: isPending1 } = useSeedLicenses(auth, queryClient);
  const { mutate: seedPractices, isPending: isPending2 } = useSeedPractices(auth, queryClient);
  const { mutate: seedTechnologies, isPending: isPending3 } = useSeedTechnologies(auth, queryClient);
  const { mutate: seedMaturities, isPending: isPending4 } = useSeedMaturities(auth, queryClient);
  const { mutate: seedCompliances, isPending: isPending5 } = useSeedCompliances(auth, queryClient);

  useEffect(() => {
    seedCompliances();
    seedLicenses();
    seedPractices();
    seedTechnologies();
    seedMaturities();
  }, [auth, seedLicenses, seedMaturities, seedPractices, seedTechnologies, seedCompliances]);

  if (isPending1 || isPending2 || isPending3 || isPending4 || isPending5) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
