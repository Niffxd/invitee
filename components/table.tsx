import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import { Loading } from "./loading";

export const Table = <T,>({ table, rowClassName = "py-2 px-3" }: { table: ReactTable<T>, rowClassName?: string }) => {
  const meta = table.options.meta as
    | {
      onRowClick?: (row: unknown) => void;
      isLoading?: boolean;
    }
    | undefined;

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-border bg-default/30">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-3 py-2.5 text-left text-xs font-semibold text-foreground"
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
        {table.getRowModel().rows.length === 0 ? (
          <tr>
            <td
              colSpan={table.getAllLeafColumns().length}
              className="px-4 py-6 text-center text-sm text-muted-foreground"
            >
              <Loading />
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-default/20 transition-colors border-b"
              onClick={() => meta?.onRowClick?.(row)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={rowClassName}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
