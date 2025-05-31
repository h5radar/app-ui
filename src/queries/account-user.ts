import type { QueryClient } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { API_URL } from "@/constants/application";
import { CREATE_ACCOUNT_USER, GET_ACCOUNT_USERS } from "@/constants/query-keys";

import { userSchema } from "@/schemas/user.tsx";

export const useCreateAccountUser = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation<z.infer<typeof userSchema>, Error, z.infer<typeof userSchema>>({
    mutationFn: async (values: z.infer<typeof userSchema>) => {
      const response = await fetch(`${API_URL}/account_users`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: [CREATE_ACCOUNT_USER],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_ACCOUNT_USERS] });
      toast.success("Account user has been created successfully");
    },
    onError(error) {
      toast.error("Error creating account user", {
        description: error.message,
      });
    },
  });
};
