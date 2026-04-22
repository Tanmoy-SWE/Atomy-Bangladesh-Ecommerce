import { Suspense } from "react";
import { ProductsBrowser } from "@/components/ProductsBrowser";

export const metadata = {
  title: "Shop all products — Atomy Bangladesh",
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<div className="h-96" />}>
        <ProductsBrowser />
      </Suspense>
    </div>
  );
}
