export interface Product {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  category: "tshirt" | "hoodie" | "other";
  sizes: string[];
  stock: number;
  imageUrl: string;
  isNew?: boolean;
}

export interface CartItem {
  productId: number;
  productName: string;
  size: string;
  quantity: number;
  priceInCents: number;
  imageUrl: string;
}
