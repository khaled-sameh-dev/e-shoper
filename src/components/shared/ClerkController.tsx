import { Skeleton } from "../ui/skeleton";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

const ClerkController = () => {
  const { user, isLoaded } = useUser();
  return (
    <div>
      <ClerkLoading>
        <Skeleton className="w-24 h-10" />
      </ClerkLoading>

      <ClerkLoaded>
        <SignedIn>
          <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            
          >
            <Button
              variant={"link"}
              className="bg-main-blue px-4 py-2 text-white rounded hover:bg-main-blue/80 hidden sm:flex"
              asChild
            >
              <Link href="/orders" className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>Orders</span>
              </Link>
            </Button>
          </motion.div>

          {/* User Info & Button */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
              afterSignOutUrl="/"
            />

            {isLoaded && user && (
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <p className="font-bold text-sm">Welcom Back!</p>
                <p className="font-semibold text-gray-500 text-xs">
                  {user.username || user.email}
                </p>
              </motion.div>
            )}
          </motion.div>
            </div>
        </SignedIn>

        <SignedOut>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="outline" size="sm">
              <Link href="/sign-in">Sign In</Link>
            </Button>

            <Button size="sm" className="hidden lg:block">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </motion.div>
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
};

export default ClerkController;
