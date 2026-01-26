import { flexRender, Table } from "@tanstack/react-table";
import { InviteeStats } from "./types";

export const DashboardTable = ({ table }: { table: Table<InviteeStats> }) => {
  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-border bg-default/30">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-2.5 text-left text-xs font-semibold text-foreground"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-border">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-default/20 transition-colors">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 py-3">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};