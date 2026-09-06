interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageItems(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const middle = new Set([page - 1, page, page + 1].filter((p) => p > 1 && p < totalPages));
  const pages = [1, ...middle, totalPages].sort((a, b) => a - b);

  const items: (number | "...")[] = [];
  let prev: number | undefined;
  for (const p of pages) {
    if (prev !== undefined && p - prev > 1) items.push("...");
    items.push(p);
    prev = p;
  }
  return items;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageItems(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-end gap-1 py-6"
    >
      {page > 1 && (
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
        >
          ‹
        </button>
      )}
      {items.map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-7 w-7 items-center justify-center text-xs text-slate-500"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition ${
              item === page
                ? "bg-emerald-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        )
      )}
      {page < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
        >
          ›
        </button>
      )}
    </nav>
  );
}
