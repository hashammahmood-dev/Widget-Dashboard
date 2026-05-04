import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const links = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard" },
    { id: "myWidgets", label: "My Widgets", path: "/my-widgets" },
  ];

  return (
    <aside className="flex h-fit flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-200/50">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Menu</p>
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `block rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <Button variant="secondary" onClick={() => navigate("/dashboard")} className="w-full">
          Go To Dashboard
        </Button>
        <Button variant="secondary" onClick={onLogout} className="mt-2 w-full">
          Logout
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
