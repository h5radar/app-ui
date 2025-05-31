import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";

import { API_URL } from "@/constants/application";
import { GET_TECHNOLOGIES } from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { createQueryParams } from "@/lib/query-params";

export const useGetTechnologies = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_TECHNOLOGIES, queryParams],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/technologies?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });
};
