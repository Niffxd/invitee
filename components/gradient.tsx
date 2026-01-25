export const GradientBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 20%, transparent), color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }}
    />
  );
};
