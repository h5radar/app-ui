import { IconDotsVertical } from "@tabler/icons-react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { API_URL } from "@/constants/application";
import { DELETE_TECHNOLOGY, GET_TECHNOLOGIES } from "@/constants/query-keys";

import { technologySchema } from "@/schemas/technology";

import { createQueryParams } from "@/lib/params";

import { technologyColumns } from "@/components/columns/technology-columns";
import { DataTable } from "@/components/data-table";

export const TechnologiesPage = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });

  const columns: ColumnDef<z.infer<typeof technologySchema>>[] = [
    ...technologyColumns,
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <Link to={`/technologies/edit/${row.id}`}>
              <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => deleteTechnology(row.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  const {
    data: technologiesData = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isFetchingTechnologiesData,
    isError: isErrorDataList,
    error: errorDataList,
  } = useQuery({
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

  const { mutate: deleteTechnology } = useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${API_URL}/technologies/${rowId}`, {
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
  if (isErrorDataList) {
    toast.error("Error getting technologies", {
      description: errorDataList.message,
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
      <DataTable
        data={technologiesData.content}
        columns={columns}
        handlePagination={handlePaginationParams}
        handleSorting={handleSortingParams}
        handleFilter={handleFilterParams}
        handleDelete={deleteTechnology}
        rowCount={technologiesData.totalElements}
        isLoading={isFetchingTechnologiesData}
        pageSize={technologiesData.pageable.pageSize}
        pageIndex={technologiesData.pageable.pageNumber}
      />
    </>
  );
};
