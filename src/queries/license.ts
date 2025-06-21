import type { QueryClient } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";
import { GET_LICENSES, SEED_LICENSES } from "@/constants/query-keys";

import { userSchema } from "@/schemas/user";

export const useSeedLicenses = (
  auth: AuthContextProps,
  queryClient: QueryClient,
  radarUser: z.infer<typeof userSchema> | null,
) => {
  return useMutation({
    mutationFn: async () => {
      if (!radarUser?.id) {
        throw new Error("Radar user id is missing");
      }
      await fetch(`${RADAR_API_URL}/licenses/seed/${radarUser.id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_LICENSES],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_LICENSES] });
      toast.success("Licenses has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding licenses", {
        description: error.message,
      });
    },
  });
};
