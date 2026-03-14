import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CheckCircle, Minus, Plus, Trash2, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { CartItem } from "../types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (productId: number, size: string) => void;
  onUpdateQuantity: (productId: number, size: string, quantity: number) => void;
  onPlaceOrder: () => void;
  orderPlaced: boolean;
}

export default function CartDrawer({
  open,
  onClose,
  cartItems,
  onRemove,
  onUpdateQuantity,
  onPlaceOrder,
  orderPlaced,
}: CartDrawerProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0,
  );

  const formattedTotal = (total / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        data-ocid="cart.panel"
        side="right"
        className="w-full sm:w-[420px] bg-[#0d0d0d] border-l border-[#1f1f1f] p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-5 border-b border-[#1f1f1f]">
          <SheetTitle className="font-display font-800 text-lg tracking-widest uppercase text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#a855f7]" />
            Your Bag
            {cartItems.length > 0 && (
              <span className="ml-auto text-[#a855f7] text-sm">
                {cartItems.length} item{cartItems.length > 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <AnimatePresence mode="wait">
          {orderPlaced ? (
            <motion.div
              data-ocid="cart.success_state"
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center px-6 text-center"
            >
              <CheckCircle className="w-16 h-16 text-[#a855f7] mb-4 animate-float" />
              <h3 className="font-display font-800 text-xl uppercase tracking-widest text-white mb-2">
                Order Placed!
              </h3>
              <p className="font-body text-white/50 text-sm">
                Your spark is on its way 🔥
              </p>
            </motion.div>
          ) : cartItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center px-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#a855f7]/10 flex items-center justify-center mb-4 animate-float">
                <Zap className="w-8 h-8 text-[#a855f7]/50" />
              </div>
              <p className="font-display font-700 text-white/30 tracking-widest uppercase text-sm">
                Your bag is empty
              </p>
              <p className="font-body text-white/20 text-xs mt-1">
                Add some spark ✦
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="items"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <ScrollArea className="flex-1">
                <div className="px-6 py-4 space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.productId}-${item.size}`}
                      data-ocid={`cart.item.${index + 1}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3 bg-[#111] rounded-sm p-3 border border-[#1f1f1f]"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-sm flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-700 text-xs tracking-widest uppercase text-white truncate">
                          {item.productName}
                        </p>
                        <p className="font-body text-white/40 text-xs mb-2">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.productId,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="w-6 h-6 rounded-sm border border-[#2a2a2a] flex items-center justify-center text-white/50 hover:text-white hover:border-[#a855f7] transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-display text-sm text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.productId,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="w-6 h-6 rounded-sm border border-[#2a2a2a] flex items-center justify-center text-white/50 hover:text-white hover:border-[#a855f7] transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="ml-auto font-body text-[#f5c518] text-sm font-600">
                            {(
                              (item.priceInCents * item.quantity) /
                              100
                            ).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        data-ocid={`cart.delete_button.${index + 1}`}
                        onClick={() => onRemove(item.productId, item.size)}
                        className="text-white/20 hover:text-red-400 transition-colors self-start mt-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-[#1f1f1f] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-white/50 text-sm tracking-wider uppercase">
                    Total
                  </span>
                  <span className="font-display font-800 text-xl text-[#f5c518]">
                    {formattedTotal}
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="cart.checkout_button"
                  onClick={onPlaceOrder}
                  className="w-full py-4 btn-primary font-display font-700 text-sm tracking-[0.2em] uppercase text-white rounded-sm flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  CHECKOUT
                </button>
                <button
                  type="button"
                  data-ocid="cart.close_button"
                  onClick={onClose}
                  className="w-full py-2 font-display text-xs tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
