import { Link } from "react-router";
import { useCart } from "../lib/cart-context";
import { useState } from "react";
import type { Route } from "./+types/cart";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart | LTP Shop" }];
}

const SHIPPING = 20;

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState("");

  if (items.length === 0) {
    return (
      <main className="container mx-auto flex flex-col items-center gap-4 px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <Link
          to="/"
          className="rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  const shipping = SHIPPING;
  const total = totalPrice + shipping;

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white px-5">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="line-clamp-2 text-sm text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">${item.price.toFixed(2)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-md border border-slate-300">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="px-2.5 py-1 text-slate-600 transition hover:bg-slate-100"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="px-2.5 py-1 text-slate-600 transition hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                    className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="w-full shrink-0 rounded-lg border border-slate-200 bg-white p-6 lg:w-72">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Cart Summary</h2>
          <dl className="flex flex-col gap-2 text-sm text-slate-500">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${totalPrice.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-900">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>

          <button
            type="button"
            className="mt-4 w-full rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Check out
          </button>
          <button
            type="button"
            className="mt-3 w-full text-center text-xs font-medium text-slate-500 underline-offset-2 transition hover:text-slate-700 hover:underline"
          >
            Or pay with PayPal
          </button>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <label htmlFor="promo" className="mb-1 block text-xs text-slate-500">
              Promo code
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                id="promo"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm"
              />
              <button
                type="button"
                className="shrink-0 rounded-md bg-slate-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Apply
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
