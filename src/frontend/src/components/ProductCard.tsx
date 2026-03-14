import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductCard({
  product,
  index,
  onAddToCart,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const price = (product.priceInCents / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
    toast.success(`${product.name} (${selectedSize}) added to cart!`, {
      style: {
        background: "#1a1a1a",
        border: "1px solid #a855f7",
        color: "#fff",
      },
    });
  };

  return (
    <motion.div
      data-ocid={`product.item.${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="product-card neon-border bg-[#0f0f0f] rounded-sm overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-[#f5c518] text-[#080808] text-xs font-display font-700 tracking-widest uppercase px-2 py-1 rounded-sm">
            NEW
          </div>
        )}
        <div className="absolute inset-0 bg-[#a855f7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-700 text-sm tracking-widest uppercase text-white mb-1 truncate">
          {product.name}
        </h3>
        <p className="font-body text-[#f5c518] font-600 text-base mb-3">
          {price}
        </p>

        {/* Size selector */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-1 text-xs font-display font-700 tracking-wide rounded-sm transition-all duration-150 ${
                selectedSize === size
                  ? "bg-[#a855f7] text-white"
                  : "border border-[#2a2a2a] text-white/40 hover:border-[#a855f7]/50 hover:text-white/70"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to cart */}
        <button
          type="button"
          data-ocid={`product.add_button.${index}`}
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#a855f7]/10 border border-[#a855f7]/30 text-[#a855f7] font-display font-700 text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[#a855f7] hover:text-white hover:shadow-neon transition-all duration-300"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          ADD TO CART
        </button>
      </div>
    </motion.div>
  );
}
