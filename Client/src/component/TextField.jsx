const TextField = ({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  className,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    className={`w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
  />
);

export { TextField };
