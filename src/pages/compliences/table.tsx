import { useComplianceColumns } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";

import { useDeleteCompliance, useGetCompliances } from "@/queries/compliance";

import { DataTable } from "@/components/data-table";

export const CompliancesPage = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });

  const {
    data: compliance = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetCompliances(auth, queryParams);

  const { mutate: deleteCompliance } = useDeleteCompliance(auth, queryClient);

  const columns = useComplianceColumns(deleteCompliance);

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
        <h1>Error getting compliances</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        pageLink={"compliances"}
        filterPlaceholder="Filter, for example: Low%..."
        data={compliance.content}
        rowCount={compliance.totalElements}
        pageSize={compliance.pageable.pageSize}
        pageIndex={compliance.pageable.pageNumber}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
        handleDelete={deleteCompliance}
      />
    </>
  );
};
