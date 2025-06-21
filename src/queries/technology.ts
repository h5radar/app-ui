import type { QueryClient } from "@tanstack/query-core";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

import { QUERY_RETRY_COUNT, RADAR_API_URL } from "@/constants/application";
import {
  CREATE_TECHNOLOGY,
  DELETE_TECHNOLOGY,
  GET_TECHNOLOGIES,
  GET_TECHNOLOGY,
  SEED_TECHNOLOGIES,
  UPDATE_TECHNOLOGY,
} from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { responseSchema } from "@/schemas/response";
import { technologySchema } from "@/schemas/technology";
import { userSchema } from "@/schemas/user";

import { createQueryParams } from "@/lib/query-params";

export const useCreateTechnology = (auth: AuthContextProps, queryClient: QueryClient, navigate: NavigateFunction) => {
  return useMutation<z.infer<typeof technologySchema>, Error, z.infer<typeof technologySchema>>({
    mutationFn: async (values: z.infer<typeof technologySchema>) => {
      const response = await fetch(`${RADAR_API_URL}/technologies`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return technologySchema.parse(data);
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
};

export const useUpdateTechnology = (auth: AuthContextProps, queryClient: QueryClient, id: string) => {
  return useMutation<z.infer<typeof technologySchema>, Error, z.infer<typeof technologySchema>>({
    mutationFn: async (values: z.infer<typeof technologySchema>) => {
      const response = await fetch(`${RADAR_API_URL}/technologies/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return technologySchema.parse(data);
    },
    mutationKey: [UPDATE_TECHNOLOGY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGIES] });
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGY, id] });
      toast.success("Technology has been updated successfully");
    },
    onError(error) {
      toast.error("Error updating technology", {
        description: error.message,
      });
    },
  });
};
export const useDeleteTechnology = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${RADAR_API_URL}/technologies/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [DELETE_TECHNOLOGY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGIES] });
      toast.success("Technology has been deleted successfully");
    },
    onError(error) {
      toast.error("Error deleting technology", {
        description: error.message,
      });
    },
  });
};

export const useGetTechnology = (auth: AuthContextProps, id: string) => {
  return useQuery({
    queryKey: ["get technology", id],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/technologies/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return technologySchema.parse(data);
    },
    meta: {
      errorMessage: "Error getting technology",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
};

export const useGetTechnologies = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_TECHNOLOGIES, queryParams],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/technologies?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return responseSchema(technologySchema).parse(data);
    },
    meta: {
      errorMessage: "Error getting technologies",
    },
    placeholderData: keepPreviousData,
    retry: (count, error) => count < 3 && !(error instanceof ZodError),
  });
};

export const useSeedTechnologies = (
  auth: AuthContextProps,
  queryClient: QueryClient,
  radarUser: z.infer<typeof userSchema> | null,
) => {
  return useMutation({
    mutationFn: async () => {
      if (!radarUser?.id) {
        throw new Error("Radar user id is missing");
      }
      await fetch(`${RADAR_API_URL}/technologies/seed/${radarUser.id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_TECHNOLOGIES],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGIES] });
      toast.success("Technologies has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding technologies", {
        description: error.message,
      });
    },
  });
};
