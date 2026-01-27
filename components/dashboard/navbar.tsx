import { capitalizeAll } from "@/helpers";
import { Bell } from "lucide-react";
import { CredentialProps } from "@/types";

export const DashboardNavbar = ({
  credential,
  handleLogout,
  handleActivity,
}: {
  credential: CredentialProps;
  handleLogout: () => void;
  handleActivity: () => void;
}) => {
  return (
    <header className="relative border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted mt-1">Welcome, {capitalizeAll(credential.username)}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleActivity}
            className="relative h-10 w-10 flex items-center justify-center text-foreground bg-default hover:bg-default/80 border border-border rounded-lg transition-colors shadow-sm group"
            aria-label="Recent Activity"
          >
            <Bell className="w-5 h-5" />
            {/* Optional notification badge */}
            {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span> */}
          </button>
          <button
            onClick={handleLogout}
            className="h-10 px-5 text-sm font-medium text-black bg-accent hover:bg-accent/90 border border-accent-soft-hover rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
