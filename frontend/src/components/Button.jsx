function Button({
  children,
  type = "button",
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:opacity-95",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:bg-slate-50",
    danger:
      "bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:-translate-y-0.5 hover:bg-rose-700",
    success:
      "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 hover:bg-emerald-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${variants[variant]} ${className} disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {children}
    </button>
  );
}

export default Button;
