import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";

import { useDeletePractice, useGetPractices } from "@/queries/practice";

import { DataTable } from "@/components/data-table";

import { usePracticeColumns } from "@/pages/practices/columns";

export const PracticesPage = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });

  const {
    data: practices = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetPractices(auth, queryParams);

  const { mutate: deletePractice } = useDeletePractice(auth, queryClient);

  const columns = usePracticeColumns(deletePractice);

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
        <h1>Error getting practices</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        filterPlaceholder="Filter, for example: Unit tests%..."
        pageLink={"practices"}
        data={practices.content}
        rowCount={practices.totalElements}
        pageSize={practices.pageable.pageSize}
        pageIndex={practices.pageable.pageNumber}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
        handleDelete={deletePractice}
      />
    </>
  );
};
