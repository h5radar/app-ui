import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { Badge } from "@/ui/badge";

import { technologySchema } from "@/schemas/technology";

export const technologyColumns: ColumnDef<z.infer<typeof technologySchema>>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="w-32">{row.original.title}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => <div className="w-32">{row.original.website}</div>,
  },
  {
    accessorKey: "moved",
    header: "Moved",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.moved}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.active ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.active}
      </Badge>
    ),
  },
];
