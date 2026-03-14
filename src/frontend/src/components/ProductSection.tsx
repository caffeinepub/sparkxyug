import { motion } from "motion/react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  products: Product[];
  activeCategory: "all" | "tees" | "hoodies";
  onCategoryChange: (cat: "all" | "tees" | "hoodies") => void;
  onAddToCart: (product: Product, size: string) => void;
}

const TABS: { key: "all" | "tees" | "hoodies"; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "tees", label: "TEES" },
  { key: "hoodies", label: "HOODIES" },
];

export default function ProductSection({
  products,
  activeCategory,
  onCategoryChange,
  onAddToCart,
}: ProductSectionProps) {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="font-body text-[#a855f7] text-xs tracking-[0.4em] uppercase mb-3">
          — The Collection
        </p>
        <h2 className="font-display font-800 text-[clamp(2rem,6vw,4rem)] uppercase tracking-tight text-white leading-none">
          LATEST <span className="text-[#f5c518]">DROPS</span>
        </h2>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            data-ocid="products.tab"
            onClick={() => onCategoryChange(tab.key)}
            className={`px-6 py-2 font-display font-700 text-sm tracking-[0.2em] uppercase rounded-sm transition-all duration-200 ${
              activeCategory === tab.key
                ? "bg-[#a855f7] text-white shadow-neon"
                : "border border-[#2a2a2a] text-white/50 hover:text-white hover:border-[#a855f7]/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div
          data-ocid="products.empty_state"
          className="text-center py-20 text-white/30 font-body"
        >
          No products found
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index + 1}
              onAddToCart={onAddToCart}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
