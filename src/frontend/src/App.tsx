import { Toaster } from "@/components/ui/sonner";
import { useRef, useState } from "react";
import AboutSection from "./components/AboutSection";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductSection from "./components/ProductSection";
import { PRODUCTS } from "./data/products";
import type { CartItem, Product } from "./types";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "tees" | "hoodies"
  >("all");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          size,
          quantity: 1,
          priceInCents: product.priceInCents,
          imageUrl: product.imageUrl,
        },
      ];
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  };

  const updateQuantity = (
    productId: number,
    size: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const placeOrder = () => {
    setCartItems([]);
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 5000);
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showNewDrops = () => {
    setActiveCategory("all");
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === "tees") return p.category === "tshirt";
    if (activeCategory === "hoodies") return p.category === "hoodie";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onCategoryChange={setActiveCategory}
        scrollToProducts={scrollToProducts}
      />

      <HeroSection onShopNow={scrollToProducts} onNewDrops={showNewDrops} />

      <div ref={productsRef}>
        <ProductSection
          products={filteredProducts}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddToCart={addToCart}
        />
      </div>

      <AboutSection />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onPlaceOrder={placeOrder}
        orderPlaced={orderPlaced}
      />

      <Toaster />
    </div>
  );
}
