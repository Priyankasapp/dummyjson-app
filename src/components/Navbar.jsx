

import { NavLink, useNavigate } from "react-router-dom";
import { Database, Users, FileText, MessageCircle, Package, Search } from "lucide-react";
import { useState } from "react";
import { useProduct } from '../context/ProductContext'
const links = [
  { label: "Products", path: "/", icon: Package },
  { label: "Users", path: "/user", icon: Users },
  { label: "Posts", path: "/post", icon: FileText },
 { label: "Comments", path: "/comments", icon:  MessageCircle, },
];

export default function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { searchAll, clearSearch } = useProduct()

  const handleSubmit = async (event) => {  
    event.preventDefault()
    const searchText = query.trim()

    if (!searchText) {
      clearSearch()
      navigate('/search')
      return
    }

    await searchAll(searchText)
    navigate('/search')
  }


  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex items-center justify-between gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Database size={18} />
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              DataHub
            </h1>
          </div>

          {/* CENTER SEARCH */}
          <div className="flex-1 max-w-xl">
            <form onSubmit={handleSubmit} className="relative">
               <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, users, posts..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 pr-12 outline-none focus:border-violet-500"
            />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
              >
                <Search size={18} />
              </button>
            </form>
           
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            <nav className="flex items-center gap-2">
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

          </div>
        </div>
      </div>
    </header>
  );
}
