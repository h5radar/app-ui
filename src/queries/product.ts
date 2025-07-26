import { QueryClient, keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

import { QUERY_RETRY_COUNT, RADAR_API_URL } from "@/constants/application";
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT } from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { productSchema } from "@/schemas/product";
import { responseSchema } from "@/schemas/response";

import { createQueryParams } from "@/lib/query-params";

export const useCreateProduct = (auth: AuthContextProps, queryClient: QueryClient, navigate: NavigateFunction) => {
  return useMutation<z.infer<typeof productSchema>, Error, z.infer<typeof productSchema>>({
    mutationFn: async (values: z.infer<typeof productSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/products`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return productSchema.parse(data);
    },
    mutationKey: [CREATE_PRODUCT],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS] });
      toast.success("Product has been created successfully");
      navigate("/products");
    },
    onError(error) {
      toast.error("Error creating product", {
        description: error.message,
      });
    },
  });
};

export const useUpdateProduct = (auth: AuthContextProps, queryClient: QueryClient, id: string) => {
  return useMutation<z.infer<typeof productSchema>, Error, z.infer<typeof productSchema>>({
    mutationFn: async (values: z.infer<typeof productSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return productSchema.parse(data);
    },
    mutationKey: [UPDATE_PRODUCT],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT, id] });
      toast.success("Product has been updated successfully");
    },
    onError(error) {
      toast.error("Error updating product", {
        description: error.message,
      });
    },
  });
};
export const useDeleteProduct = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${RADAR_API_URL}/products/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [DELETE_PRODUCT],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT] });
      toast.success("Product has been deleted successfully");
    },
    onError(error) {
      toast.error("Error deleting products", {
        description: error.message,
      });
    },
  });
};

export const useGetProduct = (auth: AuthContextProps, id: string) => {
  return useQuery({
    queryKey: [GET_PRODUCT, id],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/products/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return productSchema.parse(data);
    },
    meta: {
      errorMessage: "Error getting product",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
};

export const useGetProducts = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_PRODUCTS, queryParams],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/products?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return responseSchema(productSchema).parse(data);
    },
    meta: {
      errorMessage: "Error getting products",
    },
    placeholderData: keepPreviousData,
    retry: (count, error) => count < 3 && !(error instanceof ZodError),
  });
};
