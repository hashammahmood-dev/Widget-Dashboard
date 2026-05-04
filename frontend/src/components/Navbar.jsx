function Navbar({ title = "Dashboard", tag = "Live Configuration" }) {
  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/90 px-5 py-4 shadow-lg shadow-slate-200/40 backdrop-blur">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">Widget Builder</p>
        <h1 className="text-lg font-semibold text-slate-900 md:text-xl">{title}</h1>
      </div>
      <div className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        {tag}
      </div>
    </header>
  );
}

export default Navbar;
