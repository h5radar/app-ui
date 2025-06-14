import type { QueryClient } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";
import { CREATE_RADAR_USER, GET_RADAR_USERS } from "@/constants/query-keys";

import { userSchema } from "@/schemas/user.tsx";

export const useCreateRadarUser = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation<z.infer<typeof userSchema>, Error, z.infer<typeof userSchema>>({
    mutationFn: async (values: z.infer<typeof userSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/radar-users`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: [CREATE_RADAR_USER],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_RADAR_USERS] });
      toast.success("Radar user has been created successfully");
    },
    onError(error) {
      toast.error("Error creating account user", {
        description: error.message,
      });
    },
  });
};
