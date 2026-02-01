import { type Dispatch, type SetStateAction } from "react";

export interface FiltersProps {
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
}
