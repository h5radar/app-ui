import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

import { useGetCompliance, useUpdateCompliance } from "@/queries/compliance";

import ComplianceForm from "@/pages/compliences/form";

export default function EditCompliancesPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  const { data: compliance, isLoading: isLoading, isError: isError, error: error } = useGetCompliance(auth, id);
  const { mutate: updateCompliance, isPending: isPending } = useUpdateCompliance(auth, queryClient, id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <>
        <h1>Error getting compliance</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <ComplianceForm defaultDataForm={compliance} onSubmit={updateCompliance} disabled={isPending} />
    </>
  );
}
