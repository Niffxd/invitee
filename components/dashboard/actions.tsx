export const DashboardActions = () => {
  return (
    <div className="relative border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="px-8 py-3">
        <div className="grid grid-cols-2 gap-2 max-w-md">
          {/* Top Row */}
          <button className="px-4 py-2 bg-accent text-black rounded-lg font-medium hover:bg-accent/90 transition-all shadow-sm hover:shadow-md border border-accent-soft-hover text-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Invitee
          </button>
          <button className="px-4 py-2 bg-default border border-border text-foreground rounded-lg font-medium hover:bg-default/80 transition-all shadow-sm hover:shadow-md text-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            View All
          </button>

          {/* Bottom Row */}
          <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-black/80 transition-all shadow-sm hover:shadow-md border border-black text-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Black List
          </button>
          <button className="px-4 py-2 bg-default border border-border text-foreground rounded-lg font-medium hover:bg-default/80 transition-all shadow-sm hover:shadow-md text-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export List
          </button>
        </div>
      </div>
    </div>
  );
};
