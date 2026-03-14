import type { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "VOLT STRIKE TEE",
    description:
      "Bold lightning bolt graphic on premium 240gsm cotton. Oversized fit, unisex.",
    priceInCents: 159900,
    category: "tshirt",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 50,
    imageUrl: "/assets/generated/product-tee-1.dim_600x600.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: "SPARK DISTRESSED TEE",
    description:
      "Distressed SPARK typography on washed black cotton. Raw edges, pure energy.",
    priceInCents: 149900,
    category: "tshirt",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 40,
    imageUrl: "/assets/generated/product-tee-2.dim_600x600.jpg",
    isNew: false,
  },
  {
    id: 3,
    name: "PURPLE FLAME TEE",
    description:
      "Abstract geometric flame pattern in neon purple. Statement piece, unisex cut.",
    priceInCents: 169900,
    category: "tshirt",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 30,
    imageUrl: "/assets/generated/product-tee-3.dim_600x600.jpg",
    isNew: true,
  },
  {
    id: 4,
    name: "OBSIDIAN HOODIE",
    description:
      "Premium heavyweight hoodie with gold embroidered logo. 320gsm fleece, relaxed fit.",
    priceInCents: 299900,
    category: "hoodie",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 25,
    imageUrl: "/assets/generated/product-hoodie-1.dim_600x600.jpg",
    isNew: true,
  },
  {
    id: 5,
    name: "YUG GRAPHIC HOODIE",
    description:
      "Deep purple hoodie with large YUG back graphic. The centerpiece of every drop.",
    priceInCents: 319900,
    category: "hoodie",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 20,
    imageUrl: "/assets/generated/product-hoodie-2.dim_600x600.jpg",
    isNew: false,
  },
  {
    id: 6,
    name: "SPARK ZIP HOODIE",
    description:
      "Zip-up with full-panel explosion print. Statement streetwear, oversized silhouette.",
    priceInCents: 349900,
    category: "hoodie",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 15,
    imageUrl: "/assets/generated/product-hoodie-3.dim_600x600.jpg",
    isNew: true,
  },
];
