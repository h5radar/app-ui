import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";

import { TechnologyTable } from "@/components/technologies/table";

import { useGetTechnologies } from "@/queries/technology";

export const TechnologiesPage = () => {
  const auth = useAuth();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });
  const {
    data: technologiesData = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetTechnologies(auth, queryParams);

  if (isError) {
    toast.error("Error getting technologies", {
      description: error.message,
    });
  }

  const handleFilterParams = useCallback((value: string) => {
    return setQueryParams((prev) => {
      return { ...prev, title: value, page: 1 };
    });
  }, []);
  const handleSortingParams = useCallback((id: string, desc: "asc" | "desc") => {
    return setQueryParams((prev) => {
      return { ...prev, sort: [id, desc], page: 1 };
    });
  }, []);
  const handlePaginationParams = useCallback((page: number, size: number) => {
    setQueryParams((prev) => {
      return { ...prev, page: page + 1, size: size };
    });
  }, []);

  return (
    <>
      <TechnologyTable
        isLoading={isLoading}
        data={technologiesData.content}
        rowCount={technologiesData.totalElements}
        pageSize={technologiesData.pageable.pageSize}
        pageIndex={technologiesData.pageable.pageNumber}
        handlePagination={handlePaginationParams}
        handleSorting={handleSortingParams}
        handleFilter={handleFilterParams}
      />
    </>
  );
};

export default TechnologiesPage;
