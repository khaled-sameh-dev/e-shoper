"use client";
import { headerNavItmes } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-4 text-light-color font-semibold text-sm capitalize">
      {headerNavItmes.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`hover:text-light-green relative group ${
            pathname === item.href ? " text-light-green" : ""
          }`}
        >
          {item.title}
          <span
            className={`absolute -bottom-0.5  h-0.5 bg-light-green  hoverEffect  w-0 left-1/2 group-hover:w-1/2 group-hover:left-0
            ${pathname === item.href && "w-1/2"}
            `}
          />
          <span
            className={`absolute -bottom-0.5  h-0.5 bg-light-green hoverEffect w-0 right-1/2 group-hover:w-1/2 group-hover:right-0
             ${pathname === item.href && " w-1/2"}
            `}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
