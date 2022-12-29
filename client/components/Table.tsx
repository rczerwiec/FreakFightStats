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
  rank: number;
  name: string;
  wins: number;
  draws: number;
  loses: number;
  matches: number;
  points: number;
  federations: string;
  lastMatch: string;
  debiut: string;
  lastRank: any;
  currentRank: number;
  rankDif: number;
};

const columnHelper = createColumnHelper<Player>();

const columns = [
  columnHelper.accessor("currentRank", {
    header: () => "Rk",
  }),

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
  columnHelper.accessor("lastRank", {
    header: () => "Ostatnio",
  }),
  columnHelper.accessor("rankDif", {
    header: () => "+/-",
  }),
];

export default function Table({ players }) {
  const [data, setData] = useState(() => [...players]);
  const [sorting, setSorting] = useState<SortingState>([
    { desc: true, id: "points" },
  ]);
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
    <div className="flex flex-wrap border border-red-600 rounded-lg drop-shadow-2xl">
      <table className="bg-neutral-900 rounded-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="p-2 text-red-500 border-b border-red-600 hover:rounded-lg hover:bg-gray-200 hover:cursor-pointer"
                >
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
            <tr key={row.id} className="border-b border-red-600">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className=" p-2 pb-5 pt-5 text-white">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
