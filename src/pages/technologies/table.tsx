import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";

import { useDeleteTechnology, useGetTechnologies } from "@/queries/technology";

import { DataTable } from "@/components/data-table";

import { useTechnologyColumns } from "@/pages/technologies/columns";

export const TechnologiesPage = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });

  const {
    data: technologies = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetTechnologies(auth, queryParams);

  const { mutate: deleteTechnology } = useDeleteTechnology(auth, queryClient);

  const columns = useTechnologyColumns(deleteTechnology);

  const handlePagination = useCallback((page: number, size: number) => {
    setQueryParams((prev) => {
      return { ...prev, page: page + 1, size: size };
    });
  }, []);

  const handleSorting = useCallback((id: string, desc: "asc" | "desc") => {
    return setQueryParams((prev) => {
      return { ...prev, sort: [id, desc], page: 1 };
    });
  }, []);

  const handleFiltering = useCallback((value: string) => {
    return setQueryParams((prev) => {
      return { ...prev, title: value, page: 1 };
    });
  }, []);

  if (isError) {
    return (
      <div>
        <h1>Error getting technologies</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={technologies.content}
        rowCount={technologies.totalElements}
        pageSize={technologies.pageable.pageSize}
        pageIndex={technologies.pageable.pageNumber}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
        handleDelete={deleteTechnology}
      />
    </>
  );
};
