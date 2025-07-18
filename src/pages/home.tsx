import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { useSeedCompliances } from "@/queries/compliance";
import { useSeedLicenses } from "@/queries/license";
import { useSeedPractices } from "@/queries/practice";
import { useSeedTechnologies } from "@/queries/technology";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { mutate: seedCompliances, isPending: isPending1 } = useSeedCompliances(auth, queryClient);
  const { mutate: seedLicenses, isPending: isPending2 } = useSeedLicenses(auth, queryClient);
  const { mutate: seedPractices, isPending: isPending3 } = useSeedPractices(auth, queryClient);
  const { mutate: seedTechnologies, isPending: isPending4 } = useSeedTechnologies(auth, queryClient);

  useEffect(() => {
    seedCompliances();
    seedLicenses();
    seedPractices();
    seedTechnologies();
  }, [auth, seedCompliances, seedLicenses, seedPractices, seedTechnologies]);

  if (isPending1 || isPending2 || isPending3 || isPending4) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
