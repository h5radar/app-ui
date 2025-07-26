import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { useCreateLicense } from "@/queries/license";

import LicenseForm from "@/pages/licenses/form";

export default function NewLicensesPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createLicense, isPending: isPending } = useCreateLicense(auth, queryClient, navigate);

  return (
    <>
      <LicenseForm onSubmit={createLicense} disabled={isPending} />
    </>
  );
}
