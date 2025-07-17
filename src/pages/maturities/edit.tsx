import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

import { useGetMaturity, useUpdateMaturity } from "@/queries/maturities";

import MaturityForm from "@/pages/maturities/form";

export default function EditMaturityPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  const { data: maturity, isLoading: isLoading, isError: isError, error: error } = useGetMaturity(auth, id);
  const { mutate: updateMaturity, isPending: isPending } = useUpdateMaturity(auth, queryClient, id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <>
        <h1>Error getting maturity</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <MaturityForm defaultDataForm={maturity} onSubmit={updateMaturity} disabled={isPending} />
    </>
  );
}
