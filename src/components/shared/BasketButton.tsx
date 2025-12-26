"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { selectCartItemsCount } from "@/store/cartSlice";
import { Button } from "../ui/button";

const BasketButton = () => {
  const cartCount = useSelector(selectCartItemsCount);
  return (
    <Button
      variant={"link"}
      className="relative bg-main-blue px-4 py-2 text-white rounded hover:bg-main-blue/80"
      asChild
    >
      <Link href="/cart" className="flex items-center gap-2">
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -top-1 -right-1 text-xs font-semibold bg-notify-red rounded-full flex items-center justify-center w-5 h-5"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
        <ShoppingBasket className="w-5 h-5" />
        <span className="hidden sm:inline">Basket</span>
      </Link>
    </Button>
  );
};

export default BasketButton;
