import type { Route } from "./+types/product";
import { getProduct } from "../lib/api";
import { useCart } from "../lib/cart-context";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Product | LTP Shop" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id);
  return { product };
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  function handleAddToCart() {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-slate-50">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`h-16 w-16 shrink-0 rounded-md border p-1 ${
                    image === selectedImage ? "border-slate-900" : "border-slate-200"
                  }`}
                >
                  <img src={image} alt={product.title} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold text-slate-900">{product.title}</h1>
          <div>
            <p className="text-base font-bold text-slate-900">${product.price.toFixed(2)}</p>
            <p className="mt-1 text-xs text-slate-500">In stock • Free shipping available</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
              Qty
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value) || 1))
                }
                className="w-16 rounded-md border border-slate-300 px-2 py-2 text-sm text-slate-900"
              />
            </label>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 self-end rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              {added ? "Added to cart ✓" : "Add to Cart"}
            </button>
          </div>

          <div className="mt-2 border-t border-slate-200 pt-4">
            <h2 className="mb-2 text-sm font-medium text-slate-900">Product Details</h2>
            <p className="text-sm leading-relaxed text-slate-500">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
