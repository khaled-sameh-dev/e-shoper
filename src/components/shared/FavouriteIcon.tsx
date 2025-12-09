import React from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

const FavouriteIcon = () => {
  return (
    <Button variant={"link"} className="hover:text-light-green cursor-pointer">
      <Link href={"favourite"} className="relative group">
        <HeartIcon className="h-8 w-8" />
        <span className=" absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-dark-green text-white flex items-center justify-center text-xs">
          0
        </span>
      </Link>
    </Button>
  );
};

export default FavouriteIcon;
