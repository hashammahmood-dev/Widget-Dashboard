function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all ${className}`}
    >
      {children}
    </section>
  );
}

export default Card;
