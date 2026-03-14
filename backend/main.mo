import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor SPARKxYUG {

  // ===== TYPES =====

  public type Category = { #tshirt; #hoodie; #other };

  public type Product = {
    id: Nat;
    name: Text;
    description: Text;
    priceInCents: Nat;
    category: Category;
    sizes: [Text];
    stock: Nat;
    imageUrl: Text;
  };

  public type CartItem = {
    productId: Nat;
    size: Text;
    quantity: Nat;
  };

  public type OrderItem = {
    productId: Nat;
    productName: Text;
    size: Text;
    quantity: Nat;
    priceInCents: Nat;
  };

  public type Order = {
    id: Nat;
    buyer: Principal;
    items: [OrderItem];
    totalInCents: Nat;
    createdAt: Int;
  };

  // ===== STATE =====

  stable var nextProductId: Nat = 1;
  stable var nextOrderId: Nat = 1;
  stable var productsEntries: [(Nat, Product)] = [];
  stable var cartEntries: [(Principal, [CartItem])] = [];
  stable var ordersEntries: [(Principal, [Order])] = [];
  stable var adminPrincipal: ?Principal = null;

  var products = HashMap.fromIter<Nat, Product>(productsEntries.vals(), 10, Nat.equal, func(n: Nat): Nat32 { Nat32.fromNat(n % 1000) });
  var carts = HashMap.fromIter<Principal, [CartItem]>(cartEntries.vals(), 10, Principal.equal, Principal.hash);
  var orders = HashMap.fromIter<Principal, [Order]>(ordersEntries.vals(), 10, Principal.equal, Principal.hash);

  system func preupgrade() {
    productsEntries := Iter.toArray(products.entries());
    cartEntries := Iter.toArray(carts.entries());
    ordersEntries := Iter.toArray(orders.entries());
  };

  system func postupgrade() {
    productsEntries := [];
    cartEntries := [];
    ordersEntries := [];
    if (products.size() == 0) { seedProducts() };
  };

  // ===== SEED DATA =====

  func seedProducts() {
    let seed: [Product] = [
      { id = nextProductId; name = "SPARK Classic Tee"; description = "The OG. Oversized unisex tee with bold SPARK print. Pure cotton, drop shoulder fit."; priceInCents = 149900; category = #tshirt; sizes = ["XS","S","M","L","XL","XXL"]; stock = 50; imageUrl = "/assets/generated/product-tee-1.dim_600x600.jpg" },
      { id = nextProductId + 1; name = "YUG Tie-Dye Tee"; description = "Electric purple and yellow tie-dye. Unisex oversized cut. One-of-a-kind vibes."; priceInCents = 179900; category = #tshirt; sizes = ["XS","S","M","L","XL"]; stock = 30; imageUrl = "/assets/generated/product-tee-2.dim_600x600.jpg" },
      { id = nextProductId + 2; name = "Neon Geo Tee"; description = "Abstract neon geometric print on premium black cotton. Streetwear staple."; priceInCents = 169900; category = #tshirt; sizes = ["S","M","L","XL","XXL"]; stock = 40; imageUrl = "/assets/generated/product-tee-3.dim_600x600.jpg" },
      { id = nextProductId + 3; name = "SPARK Heavy Hoodie"; description = "400gsm heavyweight hoodie. Oversized unisex fit. Built for cold fits, not cold vibes."; priceInCents = 349900; category = #hoodie; sizes = ["XS","S","M","L","XL","XXL"]; stock = 25; imageUrl = "/assets/generated/product-hoodie-1.dim_600x600.jpg" },
      { id = nextProductId + 4; name = "YUG Zip-Up Hoodie"; description = "Cream off-white zip-up. Clean, minimal, iconic. Pairs with everything."; priceInCents = 379900; category = #hoodie; sizes = ["S","M","L","XL"]; stock = 20; imageUrl = "/assets/generated/product-hoodie-2.dim_600x600.jpg" },
      { id = nextProductId + 5; name = "Lavender Dream Hoodie"; description = "Soft pastel lavender oversized hoodie. Unisex. The coziest thing you'll own."; priceInCents = 359900; category = #hoodie; sizes = ["XS","S","M","L","XL"]; stock = 15; imageUrl = "/assets/generated/product-hoodie-3.dim_600x600.jpg" }
    ];
    for (p in seed.vals()) {
      products.put(p.id, p);
    };
    nextProductId := nextProductId + 6;
  };

  // ===== PRODUCTS =====

  public query func getAllProducts(): async [Product] {
    Iter.toArray(products.vals())
  };

  public query func getProductsByCategory(category: Category): async [Product] {
    let all = Iter.toArray(products.vals());
    Array.filter(all, func(p: Product): Bool {
      switch (p.category, category) {
        case (#tshirt, #tshirt) true;
        case (#hoodie, #hoodie) true;
        case (#other, #other) true;
        case _ false;
      }
    })
  };

  public query func getProduct(id: Nat): async ?Product {
    products.get(id)
  };

  public shared(msg) func addProduct(name: Text, description: Text, priceInCents: Nat, category: Category, sizes: [Text], stock: Nat, imageUrl: Text): async Nat {
    let id = nextProductId;
    nextProductId += 1;
    let p: Product = { id; name; description; priceInCents; category; sizes; stock; imageUrl };
    products.put(id, p);
    id
  };

  // ===== CART =====

  public shared(msg) func addToCart(productId: Nat, size: Text, quantity: Nat): async Bool {
    let caller = msg.caller;
    let current = Option.get(carts.get(caller), []);
    // Check if item already in cart
    var found = false;
    let updated = Array.map<CartItem, CartItem>(current, func(item) {
      if (item.productId == productId and item.size == size) {
        found := true;
        { productId = item.productId; size = item.size; quantity = item.quantity + quantity }
      } else { item }
    });
    if (found) {
      carts.put(caller, updated);
    } else {
      let newItem: CartItem = { productId; size; quantity };
      carts.put(caller, Array.append(current, [newItem]));
    };
    true
  };

  public shared(msg) func removeFromCart(productId: Nat, size: Text): async Bool {
    let caller = msg.caller;
    let current = Option.get(carts.get(caller), []);
    let updated = Array.filter(current, func(item: CartItem): Bool {
      not (item.productId == productId and item.size == size)
    });
    carts.put(caller, updated);
    true
  };

  public shared(msg) func updateCartQuantity(productId: Nat, size: Text, quantity: Nat): async Bool {
    let caller = msg.caller;
    let current = Option.get(carts.get(caller), []);
    if (quantity == 0) {
      let updated = Array.filter(current, func(item: CartItem): Bool {
        not (item.productId == productId and item.size == size)
      });
      carts.put(caller, updated);
    } else {
      let updated = Array.map<CartItem, CartItem>(current, func(item) {
        if (item.productId == productId and item.size == size) {
          { productId = item.productId; size = item.size; quantity }
        } else { item }
      });
      carts.put(caller, updated);
    };
    true
  };

  public shared query(msg) func getCart(): async [CartItem] {
    Option.get(carts.get(msg.caller), [])
  };

  public shared(msg) func clearCart(): async Bool {
    carts.put(msg.caller, []);
    true
  };

  // ===== ORDERS =====

  public shared(msg) func placeOrder(): async ?Nat {
    let caller = msg.caller;
    let cartItems = Option.get(carts.get(caller), []);
    if (cartItems.size() == 0) return null;

    var total = 0;
    var orderItems: [OrderItem] = [];
    for (item in cartItems.vals()) {
      switch (products.get(item.productId)) {
        case (?p) {
          let oi: OrderItem = {
            productId = item.productId;
            productName = p.name;
            size = item.size;
            quantity = item.quantity;
            priceInCents = p.priceInCents;
          };
          orderItems := Array.append(orderItems, [oi]);
          total += p.priceInCents * item.quantity;
        };
        case null {};
      }
    };

    let orderId = nextOrderId;
    nextOrderId += 1;
    let order: Order = {
      id = orderId;
      buyer = caller;
      items = orderItems;
      totalInCents = total;
      createdAt = Time.now();
    };
    let existing = Option.get(orders.get(caller), []);
    orders.put(caller, Array.append(existing, [order]));
    carts.put(caller, []);
    ?orderId
  };

  public shared query(msg) func getMyOrders(): async [Order] {
    Option.get(orders.get(msg.caller), [])
  };

}
