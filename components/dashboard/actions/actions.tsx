import { Ban, FileDown, LibraryBig, Plus } from "lucide-react";
import { Button } from "./components";
import { defaultPath } from "./components/consts";

export const DashboardActions = () => {
  return (
    <div className="relative border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="px-8 py-3">
        <div className="grid grid-cols-2 gap-2 max-w-md">
          {/* Top Row */}
          <Button
            className="bg-default"
            to={`${defaultPath}/new-invitee`}
            text="Add Invitee"
            icon={<Plus className="w-4 h-4" />}
          />
          <Button
            to={`${defaultPath}/invitees`}
            className="bg-default"
            text="View All"
            icon={<LibraryBig className="w-4 h-4" />}
          />
          <Button
            to={`${defaultPath}/blacklist`}
            className="bg-default"
            text="Black List"
            icon={<Ban className="w-4 h-4" />}
          />
          <Button
            onClick={() => { }}
            isDisabled
            className="bg-default"
            text="Export List"
            icon={<FileDown className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
};
