"use client";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { motion } from "framer-motion";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";

import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import NavigationLinks from "./NavigationLinks";

const DashboardNavbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <header className="sm:hidden bg-white shadow-sm w-full py-4 px-6">
      <Container classname="flex justify-between items-center">
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <MenuIcon className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <UserDropdown avatarOnly/>
        </div>
      </Container>

      {openMenu && (
        <Container>
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full border-t border-black/10 mt-4 overflow-hidden pt-2 space-y-1"
          >
            <NavigationLinks showText/>
          </motion.nav>
        </Container>
      )}
    </header>
  );
};

export default DashboardNavbar;
