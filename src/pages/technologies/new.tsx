import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { API_URL } from "@/constants/application";
import { CREATE_TECHNOLOGY, GET_TECHNOLOGIES } from "@/constants/query-keys";

import { technologySchema } from "@/schemas/technology";

import TechnologyForm from "@/pages/technologies/form";

export default function NewTechnologyPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createTechnology, isPending: isPending } = useMutation<
    z.infer<typeof technologySchema>,
    Error,
    z.infer<typeof technologySchema>
  >({
    mutationFn: async (values: z.infer<typeof technologySchema>) => {
      const response = await fetch(`${API_URL}/technologies`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: [CREATE_TECHNOLOGY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGIES] });
      toast.success("Technology has been created successfully");
      navigate("/technologies");
    },
    onError(error) {
      toast.error("Error creating technology", {
        description: error.message,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof technologySchema>) => {
    createTechnology(values);
  };

  return (
    <>
      <TechnologyForm onSubmit={onSubmit} disabled={isPending} />
    </>
  );
}
