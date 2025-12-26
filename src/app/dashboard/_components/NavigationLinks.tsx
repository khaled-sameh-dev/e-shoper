"use client";
import AnimatedToggleText from "@/components/AnimatedToggleText";
import { motion } from "framer-motion";
import {
  BoxIcon,
  DollarSign,
  Home,
  ListCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Orders", href: "/dashboard/orders", icon: BoxIcon },
  { title: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { title: "Sales", href: "/dashboard/sales", icon: DollarSign },
  { title: "Categories", href: "/dashboard/categories", icon: ListCheck },
  { title: "Customers", href: "/dashboard/customers", icon: Users },
];

const NavigationLinks = ({ showText }: { showText: boolean }) => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.09 }}
        >
          <Link
            href={link.href}
            key={link.href}
            className={`py-2 px-3 hover:bg-gray-100 rounded  ${
              link.href === pathname
                ? "text-foreground bg-gray-200"
                : "text-muted-foreground"
            } cursor-pointer w-full inline-block`}
          >
            <div className="flex items-center gap-2 font-semibold">
              <link.icon className="w-5 h-5" />

              <AnimatedToggleText show={showText}>
                {link.title}
              </AnimatedToggleText>
            </div>
          </Link>
        </motion.div>
      ))}
    </>
  );
};

export default NavigationLinks;
