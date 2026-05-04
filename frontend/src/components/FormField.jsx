// function FormField({
//   label,
//   name,
//   value,
//   onChange,
//   error,
//   type = "text",
//   as = "input",
//   options = [],
//   placeholder,
// }) {
//   const baseClass =
//     "mt-2 w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2";
//   const stateClass = error
//     ? "border-red-300 focus:border-red-400 focus:ring-red-200"
//     : "border-slate-300 focus:border-indigo-400 focus:ring-indigo-200";

//   return (
//     <label className="block text-sm font-medium text-slate-700">
//       {label}
//       {as === "textarea" ? (
//         <textarea
//           name={name}
//           value={value}
//           onChange={onChange}
//           rows={4}
//           placeholder={placeholder}
//           className={`${baseClass} ${stateClass} resize-none`}
//         />
//       ) : null}
//       {as === "select" ? (
//         <select name={name} value={value} onChange={onChange} className={`${baseClass} ${stateClass}`}>
//           <option value="">Select platform</option>
//           {options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       ) : null}
//       {as === "input" ? (
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`${baseClass} ${stateClass}`}
//         />
//       ) : null}
//       {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
//     </label>
//   );
// }

// export default FormField;
function FormField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
  options = [],
  placeholder,
}) {
  const baseClass =
    "mt-2 w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:ring-2";

  const stateClass = error
    ? "border-red-400 focus:ring-red-300"
    : "border-slate-300 focus:border-indigo-400 focus:ring-indigo-200";

  let field;

  if (as === "textarea") {
    field = (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className={`${baseClass} ${stateClass} resize-none`}
      />
    );
  } else if (as === "select") {
    field = (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseClass} ${stateClass}`}
      >
        <option value="">{placeholder || "Select option"}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    field = (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseClass} ${stateClass}`}
      />
    );
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {field}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default FormField;
