import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
}
const Logo = ({ className }: LogoProps) => {
  return (
    <Link href={"/"}>
      <h2 className={cn("text-2xl font-black text-main-blue tracking-wider" , className)}>
        ESHOP<span className="text-dark-blue">r</span>
      </h2>
    </Link>
  );
};

export default Logo;
