import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { useCreateMaturities } from "@/queries/maturities";

import MaturityForm from "@/pages/maturities/form";

export default function NewMaturitiesPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createMaturity, isPending: isPending } = useCreateMaturities(auth, queryClient, navigate);

  return (
    <>
      <MaturityForm onSubmit={createMaturity} disabled={isPending} />
    </>
  );
}
