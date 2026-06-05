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
// import { useProduct } from "../context/ProductContext";
import { useDispatch } from "react-redux";
// import { searchAll, clearSearch } from "../features/search/searchSlice";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Products", path: "/", icon: Package },
  { label: "Users", path: "/user", icon: Users },
  { label: "Posts", path: "/post", icon: FileText },
  { label: "Comments", path: "/comments", icon: MessageCircle },
];

const navItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const menuVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { searchAll, clearSearch } = useProduct();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchText = query.trim();

    if (!searchText) {
    dispatch(clearSearch());
    navigate("/search");
    return;
  }

     dispatch(searchAll(searchText));
  navigate("/search");
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">
        {/* TOP ROW */}
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <motion.div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Database size={18} aria-hidden="true" />
            </div>

            <h1 className="text-xl font-bold text-slate-900">DataHub</h1>
          </motion.div>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:block flex-1 max-w-xl">
            <form onSubmit={handleSubmit} className="relative">
              <label htmlFor="desktop-search" className="sr-only">
                Search products, users and posts
              </label>

              <input
                id="desktop-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, users, posts..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 pr-12 outline-none focus:border-violet-500"
              />

              {/* <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-200"
              >
                <Search size={18} aria-hidden="true" />
              </button> */}
            </form>
          </div>

          {/* DESKTOP NAV */}
          <motion.nav
            className="hidden md:flex items-center gap-1 rounded-2xl bg-slate-100 p-1"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <motion.div
                  key={link.path}
                  variants={navItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-violet-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`
                    }
                  >
                    <Icon size={16} aria-hidden="true" />
                    {link.label}
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* MOBILE MENU BUTTON */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* MOBILE CONTENT */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mt-4 md:hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              transition={{ duration: 0.2 }}
            >
              {/* MOBILE SEARCH */}
              <form onSubmit={handleSubmit} className="relative mb-4">
                <label htmlFor="mobile-search" className="sr-only">
                  Search products, users and posts
                </label>

                <input
                  id="mobile-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 outline-none"
                />

                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-200"
                >
                  <Search size={18} aria-hidden="true" />
                </button>
              </form>

              {/* MOBILE NAV */}
              <nav className="flex flex-col gap-2">
                {links.map((link) => {
                  const Icon = link.icon;

                  return (
                    <motion.div
                      key={link.path}
                      variants={navItemVariants}
                      whileHover={{ x: 6 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                            isActive
                              ? "bg-white shadow text-violet-600"
                              : "text-slate-600 hover:bg-white"
                          }`
                        }
                      >
                        <Icon size={18} aria-hidden="true" />
                        {link.label}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
