import { Link } from "react-router";
import { useCart } from "../lib/cart-context";

const NAV_LINKS = ["Home", "Shop", "About", "Contact", "Blog"];

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="text-sm font-bold uppercase tracking-widest text-slate-900"
        >
          The Online Store
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-600 sm:flex">
          {NAV_LINKS.map((label) => (
            <Link
              key={label}
              to={label === "Home" ? "/" : "/"}
              className="transition hover:text-slate-900"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-slate-600">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full p-1.5 transition hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Account"
            className="rounded-full p-1.5 transition hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path strokeLinecap="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" />
            </svg>
          </button>
          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative rounded-full p-1.5 transition hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.94-4.708 2.435-7.183.108-.54-.316-1.037-.866-1.037H5.106M7.5 14.25L5.106 5.25M9.75 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
