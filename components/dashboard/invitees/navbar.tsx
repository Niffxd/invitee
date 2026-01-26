import { ArrowLeft } from "lucide-react";

export const InviteesNavbar = ({
  handleBack,
}: {
  handleBack: () => void;
}) => {
  return (
    <header className="relative border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="h-10 w-10 flex items-center justify-center text-foreground bg-default hover:bg-default/80 border border-border rounded-lg transition-colors shadow-sm"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invitees</h1>
            <p className="text-sm text-muted mt-1">Manage your guest list</p>
          </div>
        </div>
      </div>
    </header>
  );
};
