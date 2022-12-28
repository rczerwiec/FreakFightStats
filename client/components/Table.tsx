import { useState, useReducer } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

type Player = {
  name: string;
  wins: number;
  draws: number;
  loses: number;
  matches: number;
  points: number;
  federations: string;
  lastMatch: string;
  last: any;
  debiut: string;
};

const columnHelper = createColumnHelper<Player>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Zawodnik",
  }),
  columnHelper.accessor("matches", {
    header: () => "Walki",
  }),
  columnHelper.accessor("wins", {
    header: () => "Wygrane",
  }),
  columnHelper.accessor("draws", {
    header: () => "Remisy",
  }),
  columnHelper.accessor("loses", {
    header: () => "Przegrane",
  }),
  columnHelper.accessor("points", {
    header: () => "Punkty",
    enableSorting: true,
  }),
  columnHelper.accessor("federations", {
    header: () => "Federacje",
  }),
  columnHelper.accessor("lastMatch", {
    header: () => "Ostatnia walka",
  }),
  columnHelper.accessor("debiut", {
    header: () => "Debiut",
  }),
  columnHelper.accessor("last", {
    header: () => "",
  }),
];

export default function Table({ players }) {
  const [data, setData] = useState(() => [...players]);
  const [sorting, setSorting] = useState<SortingState>([{desc: true, id:"points"}]);
    console.log(sorting);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
}
