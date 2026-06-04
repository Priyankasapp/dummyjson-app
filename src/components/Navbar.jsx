import { NavLink, useNavigate } from "react-router-dom";
import {
  Database,
  Users,
  FileText,
  MessageCircle,
  Package,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useProduct } from "../context/ProductContext";

const links = [
  { label: "Products", path: "/", icon: Package },
  { label: "Users", path: "/user", icon: Users },
  { label: "Posts", path: "/post", icon: FileText },
  { label: "Comments", path: "/comments", icon: MessageCircle },
];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { searchAll, clearSearch } = useProduct();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchText = query.trim();

    if (!searchText) {
      clearSearch();
      navigate("/search");
      return;
    }

    await searchAll(searchText);
    navigate("/search");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">

        {/* TOP ROW */}
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Database size={18} />
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              DataHub
            </h1>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:block flex-1 max-w-xl">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, users, posts..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 pr-12 outline-none focus:border-violet-500"
              />

              <button
                type="submit"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-200"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-violet-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon size={16} />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE CONTENT */}
        {menuOpen && (
          <div className="mt-4 md:hidden">

            {/* MOBILE SEARCH */}
            <form onSubmit={handleSubmit} className="relative mb-4">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Search size={18} />
              </button>
            </form>

            {/* MOBILE NAV */}
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-violet-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}