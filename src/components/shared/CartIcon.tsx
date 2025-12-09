import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

const CartIcon = () => {
  return (
    <Button variant={"link"} className="hover:text-light-green cursor-pointer">
      <Link href={"/cart"} className="relative group">
        <ShoppingBag className="h-8 w-8" />
        <span className=" absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-dark-green text-white flex items-center justify-center text-xs">
          0
        </span>
      </Link>
    </Button>
  );
};

export default CartIcon;
