import { type Table as ReactTable } from "@tanstack/react-table";
import { ActivityItem } from "../../types";

export interface ListProps {
  table: ReactTable<ActivityItem>;
}
