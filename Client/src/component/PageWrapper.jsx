const PageWrapper = ({ children }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
    <div className="w-full max-w-sm">{children}</div>
  </div>
);

export { PageWrapper };
