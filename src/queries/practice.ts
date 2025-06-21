import type { QueryClient } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";
import { GET_PRACTICES, SEED_PRACTICES } from "@/constants/query-keys";

import { userSchema } from "@/schemas/user";

export const useSeedPractices = (
  auth: AuthContextProps,
  queryClient: QueryClient,
  radarUser: z.infer<typeof userSchema> | null,
) => {
  return useMutation({
    mutationFn: async () => {
      if (!radarUser?.id) {
        throw new Error("Radar user id is missing");
      }
      await fetch(`${RADAR_API_URL}/practices/seed/${radarUser?.id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_PRACTICES],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICES] });
      toast.success("Practices has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding practices", {
        description: error.message,
      });
    },
  });
};
