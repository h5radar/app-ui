import { useMaturityColumns } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";

import { useDeleteMaturity, useGetMaturities } from "@/queries/maturity";

import { DataTable } from "@/components/data-table";

export const MaturitiesPage = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });

  const {
    data: maturities = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetMaturities(auth, queryParams);

  const { mutate: deleteMaturity } = useDeleteMaturity(auth, queryClient);

  const columns = useMaturityColumns(deleteMaturity);

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
        <h1>Error getting maturities</h1>
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
        pageLink={"maturities"}
        data={maturities.content}
        rowCount={maturities.totalElements}
        pageSize={maturities.pageable.pageSize}
        pageIndex={maturities.pageable.pageNumber}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
        handleDelete={deleteMaturity}
      />
    </>
  );
};
