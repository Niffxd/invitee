import { type Dispatch, type SetStateAction } from "react";
import { Filter } from "lucide-react";
import { Select } from "@/components";

export const Filters = ({
  filter,
  setFilter,
}: {
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <div className="relative border-b border-bordedivg-surface/80 backdrop-blur-sm">
      <div className="container mx-auto px-8 py-4 flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted" />
        <Select
          selectionMode="multiple"
          className="w-full max-h-6"
          options={[
            { id: "invite", content: "Invites" },
            { id: "confirm", content: "Confirmed" },
            { id: "decline", content: "Declined" },
            { id: "export", content: "Exports" }]}
          value={filter}
          onChange={(value) => {
            if (value === null) {
              setFilter([]);
            } else if (Array.isArray(value)) {
              setFilter(value.map((v) => String(v)));
            } else {
              setFilter([String(value)]);
            }
          }}
        />
      </div>
    </div>
  );
};
