"use client";

import { COLOR_EXTENSION_MAP } from "@/constant";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { defaultStyles, FileIcon } from "react-file-icon";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            // @ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="text-blue-500 hover:text-blue-600 hover:underline"
        >
          Download
        </a>
      );
    },
  },
];
