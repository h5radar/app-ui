import type { QueryClient } from "@tanstack/query-core";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

import { QUERY_RETRY_COUNT, RADAR_API_URL } from "@/constants/application";
import "@/constants/query-keys";
import {
  CREATE_MATURITY,
  DELETE_MATURITY,
  GET_MATURITIES,
  GET_MATURITY,
  SEED_MATURITIES,
  UPDATE_MATURITY,
} from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { maturitiesSchema } from "@/schemas/maturity";
import { responseSchema } from "@/schemas/response";

import { createQueryParams } from "@/lib/query-params";

export const useCreateMaturities = (auth: AuthContextProps, queryClient: QueryClient, navigate: NavigateFunction) => {
  return useMutation<z.infer<typeof maturitiesSchema>, Error, z.infer<typeof maturitiesSchema>>({
    mutationFn: async (values: z.infer<typeof maturitiesSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/maturities`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return maturitiesSchema.parse(data);
    },
    mutationKey: [CREATE_MATURITY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_MATURITIES] });
      toast.success("Maturity has been created successfully");
      navigate("/maturities");
    },
    onError(error) {
      toast.error("Error creating maturity", {
        description: error.message,
      });
    },
  });
};

export const useUpdateMaturity = (auth: AuthContextProps, queryClient: QueryClient, id: string) => {
  return useMutation<z.infer<typeof maturitiesSchema>, Error, z.infer<typeof maturitiesSchema>>({
    mutationFn: async (values: z.infer<typeof maturitiesSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/maturities/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return maturitiesSchema.parse(data);
    },
    mutationKey: [UPDATE_MATURITY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_MATURITIES] });
      queryClient.invalidateQueries({ queryKey: [GET_MATURITY, id] });
      toast.success("Maturity has been updated successfully");
    },
    onError(error) {
      toast.error("Error updating maturity", {
        description: error.message,
      });
    },
  });
};

export const useDeleteMaturity = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${RADAR_API_URL}/maturities/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [DELETE_MATURITY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_MATURITIES] });
      toast.success("Maturity has been deleted successfully");
    },
    onError(error) {
      toast.error("Error deleting maturity", {
        description: error.message,
      });
    },
  });
};

export const useGetMaturity = (auth: AuthContextProps, id: string) => {
  return useQuery({
    queryKey: [GET_MATURITY, id],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/maturities/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return maturitiesSchema.parse(data);
    },
    meta: {
      errorMessage: "Error getting maturity",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
};

export const useGetMaturities = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_MATURITIES, queryParams],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/maturities?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return responseSchema(maturitiesSchema).parse(data);
    },
    meta: {
      errorMessage: "Error getting maturities",
    },
    placeholderData: keepPreviousData,
    retry: (count, error) => count < 3 && !(error instanceof ZodError),
  });
};

export const useSeedMaturities = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async () => {
      await fetch(`${RADAR_API_URL}/maturities/seed`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_MATURITIES],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_MATURITIES] });
      toast.success("Maturity has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding maturities", {
        description: error.message,
      });
    },
  });
};
