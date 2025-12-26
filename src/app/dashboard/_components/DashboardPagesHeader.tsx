"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsRightIcon } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import AnimatedToggleText from "@/components/AnimatedToggleText";

const DashboardHeader = () => {
  const pathname = usePathname();
  const pagesStack = pathname.trim().split("/");

  const currentPage = useMemo(
    () => pagesStack[pagesStack.length - 1],
    [pagesStack]
  );

  return (
    <div className="flex items-center">
      <SidebarTrigger className="hidden sm:block" />
      <span className="w-0.5 h-5 bg-black/30 mr-2" />

      <div className="flex items-center gap-4">
        {pagesStack.map((text) => {
          if (text.trim().length === 0) return;
          return (
            <Link
              href={"/" + text}
              className={`text-sm font-semibold ${
                text === currentPage ? "" : "text-muted-foreground"
              }`}
            >
              <ChevronsRightIcon className="w-4 h-4 inline" />
              <AnimatedToggleText show>{text.toUpperCase()}</AnimatedToggleText>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHeader;
