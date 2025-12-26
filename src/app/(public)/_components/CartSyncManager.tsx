"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import {
  hydrateCart,
  loadCartFromDB,
  syncCartToDB,
  mergeCartsOnLogin,
  selectCartItems,
  selectIsCartHydrated,
} from "@/store/cartSlice";

export default function CartSyncManager() {
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser();
  const cartItems = useSelector(selectCartItems);
  const isHydrated = useSelector(selectIsCartHydrated);
  const hasInitialized = useRef(false);
  const lastSyncedItems = useRef<string>("");

  // 1. Hydrate cart from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      dispatch(hydrateCart());
    }
  }, [dispatch, isHydrated]);

  // 2. Handle user login/logout
  useEffect(() => {
    if (!isLoaded || hasInitialized.current) return;

    const initializeCart = async () => {
      if (user) {
        // User just logged in
        const localCartItems = cartItems;

        if (localCartItems.length > 0) {
          // Merge local cart with database cart
          // @ts-ignore
          await dispatch(mergeCartsOnLogin(localCartItems));
        } else {
          // Load cart from database
          // @ts-ignore
          await dispatch(loadCartFromDB());
        }
      }

      hasInitialized.current = true;
    };

    initializeCart();
  }, [user, isLoaded, dispatch, cartItems]);

  // 3. Sync cart to database when items change (for logged-in users)
  useEffect(() => {
    if (!user || !isHydrated) return;

    const currentItems = JSON.stringify(cartItems);

    // Only sync if items actually changed
    if (currentItems !== lastSyncedItems.current) {
      lastSyncedItems.current = currentItems;

      // Debounce sync to avoid too many requests
      const timeoutId = setTimeout(() => {
        // @ts-ignore
        dispatch(syncCartToDB(cartItems));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [cartItems, user, isHydrated, dispatch]);

  // This component doesn't render anything
  return null;
}
