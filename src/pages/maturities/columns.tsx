import { IconDotsVertical } from "@tabler/icons-react";
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

import { maturitiesSchema } from "@/schemas/maturity";

export const useMaturityColumns = (handleDelete: (id: string) => void): ColumnDef<z.infer<typeof maturitiesSchema>>[] =>
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
        accessorKey: "position",
        header: "Position",
        cell: ({ row }) => (
          <div className="w-32">
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              {row.original.position}
            </Badge>
          </div>
        ),
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
          <div className="w-32 flex items-center">
            <div className="z-5 relative w-8 h-8 rounded-full border border-input cursor-pointer overflow-hidden">
              <input
                type="color"
                id={`color-${row.original.id}`}
                value={row.original.color}
                disabled
                aria-label={`Color: ${row.original.color}`}
                className="z-1 absolute w-12 h-12 cursor-pointer -top-2 -left-2 "
              />
            </div>
            <p className="ml-2">{row.original.color}</p>
          </div>
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
              <Link to={`/maturities/edit/${row.id}`}>
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
