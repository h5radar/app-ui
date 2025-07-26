import { IconCircleCheckFilled, IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link } from "react-router";
import { z } from "zod";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { licenseSchema } from "@/schemas/license";

export const useLicenseColumns = (handleDelete: (id: string) => void): ColumnDef<z.infer<typeof licenseSchema>>[] =>
  useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <div className="w-32">{row.original.title}</div>,
        enableHiding: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div className="w-32">{row.original.description}</div>,
      },
      {
        accessorKey: "active",
        header: "Active",
        cell: ({ row }) => (
          <Badge variant="outline" className="text-muted-foreground px-1.5 text-sm">
            {row.original.active ? (
              <>
                <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                Yes
              </>
            ) : (
              <>
                <IconCircleCheckFilled className="fill-grey-500 dark:fill-grey-400" />
                No
              </>
            )}
            {row.original.active}
          </Badge>
        ),
      },
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
              <Link to={`/licenses/edit/${row.id}`}>
                <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [handleDelete],
  );
