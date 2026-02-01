const Card = ({ title, subtitle, children }) => (
  <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 p-6">
    <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
      {title}
    </h1>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
      {subtitle}
    </p>
    <div className="mt-6 space-y-4">{children}</div>
  </div>
);

export { Card };
