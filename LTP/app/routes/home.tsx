import { useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../lib/api";
import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { Dropdown } from "../components/Dropdown";

const PAGE_SIZE = 9;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LTP Shop" },
    { name: "description", content: "Browse our product catalog." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? "";
  const selectedCategories = category ? category.split(",").filter(Boolean) : [];
  const search = url.searchParams.get("search") ?? "";
  const sort = (url.searchParams.get("sort") as "asc" | "desc" | null) ?? "";

  const [products, categories] = await Promise.all([
    search
      ? searchProducts(search)
      : selectedCategories.length > 0
        ? Promise.all(selectedCategories.map(getProductsByCategory)).then((lists) => {
            const byId = new Map(lists.flat().map((p) => [p.id, p]));
            return Array.from(byId.values());
          })
        : getProducts(),
    getCategories(),
  ]);

  if (sort) {
    products.sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
  }

  return { products, categories, category, search, sort };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products, categories, category, search, sort } = loaderData;
  const selectedCategories = category ? category.split(",").filter(Boolean) : [];
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1") || 1;

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next, { preventScrollReset: true });
  }

  function toggleCategory(c: string) {
    const next = selectedCategories.includes(c)
      ? selectedCategories.filter((item) => item !== c)
      : [...selectedCategories, c];
    updateParam("category", next.join(","));
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next, { preventScrollReset: true });
  }

  const rangeStart = products.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, products.length);

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            value={sort}
            onChange={(value) => updateParam("sort", value)}
            placeholder="Sort by"
            options={[
              { label: "Price: Low to high", value: "asc" },
              { label: "Price: High to low", value: "desc" },
            ]}
          />
          <input
            type="search"
            value={search}
            onChange={(e) => updateParam("search", e.target.value)}
            placeholder="Search products..."
            className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm sm:flex-none"
          />
        </div>
        <p className="text-sm text-slate-500">
          Showing {rangeStart}-{rangeEnd} of {products.length}
        </p>
      </div>

      <div
        className="mb-6 flex gap-2 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none lg:hidden"
      >
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => toggleCategory(c)}
            aria-pressed={selectedCategories.includes(c)}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
              selectedCategories.includes(c)
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-300 text-slate-600 hover:border-slate-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          {paginated.length === 0 ? (
            <p className="py-16 text-center text-slate-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <Pagination page={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </div>

        <aside className="hidden w-full shrink-0 lg:block lg:w-56">
          <h2 className="mb-3 text-sm font-medium text-slate-900">Categories</h2>
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                aria-pressed={selectedCategories.includes(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
                  selectedCategories.includes(c)
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-300 text-slate-600 hover:border-slate-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
