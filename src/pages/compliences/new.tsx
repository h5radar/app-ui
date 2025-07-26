import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { useCreateCompliance } from "@/queries/compliance";

import ComplianceForm from "@/pages/compliences/form";

export default function NewCompliancesPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createCompliance, isPending: isPending } = useCreateCompliance(auth, queryClient, navigate);

  return (
    <>
      <ComplianceForm onSubmit={createCompliance} disabled={isPending} />
    </>
  );
}
