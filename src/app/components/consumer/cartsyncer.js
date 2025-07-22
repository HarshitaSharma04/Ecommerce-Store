"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "@/app/store/cartSlice";
import { setSyncDone } from "@/app/store/authSlice";

const CartSyncer = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("🔁 CartSyncer useEffect ran");
    const syncGuestCart = async () => {
      if (!user?.id) {
        console.log("⛔ No user ID, aborting sync");
        dispatch(setSyncDone(true));
        return;
      }

      const storedCart = localStorage.getItem("cart");
      if (!storedCart) {
        console.log("📭 No stored cart found");
        dispatch(setSyncDone(true));
        return;
      }

      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          for (const item of parsedCart) {
            const itemWithUser = { ...item, userId: user.id };
            await fetch("/api/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(itemWithUser),
            });
            // Optional: update Redux
            dispatch(addToCart(itemWithUser));
          }
          localStorage.removeItem("cart");
          toast.success("Cart synced after login ✅");
        }
      } catch (err) {
        console.error("Cart sync failed:", err);
      } finally {
        dispatch(setSyncDone(true)); // ✅ call when done (success or error)
      }
    };

    syncGuestCart();
  }, [user?.id]);

  return null;
};

export default CartSyncer;
