import { type Table as ReactTable } from "@tanstack/react-table";

export interface TableProps<T> {
  table: ReactTable<T>,
  rowClassName?: string
}
