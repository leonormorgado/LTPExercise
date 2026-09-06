import { Link } from "react-router";
import type { Product } from "../lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group flex flex-col gap-3">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-slate-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain transition group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <h2 className="line-clamp-2 text-sm text-slate-900">{product.title}</h2>
        <p className="text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
