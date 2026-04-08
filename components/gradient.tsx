export const GradientBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 50% -20%, color-mix(in oklch, var(--palette-papaya) 55%, transparent), transparent 55%),
          radial-gradient(ellipse 90% 60% at 100% 40%, color-mix(in oklch, var(--palette-sage) 18%, transparent), transparent 50%),
          radial-gradient(ellipse 70% 50% at 0% 80%, color-mix(in oklch, var(--palette-bronze) 12%, transparent), transparent 45%),
          linear-gradient(to bottom, color-mix(in oklch, var(--palette-beige) 35%, transparent), transparent 42%)
        `,
      }}
    />
  );
};
