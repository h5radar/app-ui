import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

import { useGetLicense, useUpdateLicense } from "@/queries/license";

import LicenseForm from "@/pages/licenses/form";

export default function EditLicensesPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  const { data: license, isLoading: isLoading, isError: isError, error: error } = useGetLicense(auth, id);
  const { mutate: updateLicense, isPending: isPending } = useUpdateLicense(auth, queryClient, id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <>
        <h1>Error getting License</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <LicenseForm defaultDataForm={license} onSubmit={updateLicense} disabled={isPending} />
    </>
  );
}
