import type { Product, ProductsResponse } from "./types";

const API_BASE = "https://dummyjson.com";

const FIELDS =
  "title,price,description,category,brand,thumbnail,images,rating,stock";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products?limit=0&select=${FIELDS}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: ProductsResponse = await res.json();
  return data.products;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE}/products/category/${encodeURIComponent(category)}?limit=0&select=${FIELDS}`
  );
  if (!res.ok) throw new Error("Failed to fetch products by category");
  const data: ProductsResponse = await res.json();
  return data.products;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE}/products/search?q=${encodeURIComponent(query)}&limit=0&select=${FIELDS}`
  );
  if (!res.ok) throw new Error("Failed to search products");
  const data: ProductsResponse = await res.json();
  return data.products;
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/products/category-list`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
