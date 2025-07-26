import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";

import { useDeleteLicense, useGetLicenses } from "@/queries/license";

import { DataTable } from "@/components/data-table";

import { useLicenseColumns } from "@/pages/licenses/columns";

export const LicensesPage = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });

  const {
    data: licenses = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetLicenses(auth, queryParams);

  const { mutate: deleteLicense } = useDeleteLicense(auth, queryClient);

  const columns = useLicenseColumns(deleteLicense);

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
        <h1>Error getting licenses</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        pageLink={"licenses"}
        filterPlaceholder="Filter, for example: MIT%..."
        data={licenses.content}
        rowCount={licenses.totalElements}
        pageSize={licenses.pageable.pageSize}
        pageIndex={licenses.pageable.pageNumber}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
        handleDelete={deleteLicense}
      />
    </>
  );
};
