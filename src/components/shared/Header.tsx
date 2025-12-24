"use client";
import Container from "./Container";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { PackageIcon, ShoppingBag, ShoppingBasket } from "lucide-react";

import SearchInput from "./SearchInput";
import Link from "next/link";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "@/store/cartSlice";

const CartIcon = () => {
  const cartCount = useSelector(selectCartItemsCount);

  return (
    <Button variant={"link"} className="hover:text-light-green cursor-pointer">
      <Link href={"/cart"} className="relative group">
        <ShoppingBag className="h-8 w-8" />
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-dark-green text-white flex items-center justify-center text-xs font-bold">
          {cartCount}
        </span>
      </Link>
    </Button>
  );
};

const Header = () => {
  const { user } = useUser();
  const cartCount = useSelector(selectCartItemsCount);

  return (
    <header className="w-full px-8 mx-auto xl:px-0 py-4 bg-white">
      <Container classname="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex-1 flex items-center justify-between gap-8">
          <Logo />
          <SearchInput />
        </div>

        <div className="flex-1 flex items-center justify-center gap-4 sm:max-w-max">
          <Button
            variant={"link"}
            className="relative bg-main-blue px-4 py-2 text-white rounded hover:bg-main-blue/80 flex-1"
          >
            <span className=" absolute -top-1 -right-1 text-xs font-semibold bg-notify-red rounded-full flex items-center justify-center w-4 h-4">
              {cartCount}
            </span>
            <Link href={"/cart"} className="flex items-center gap-2">
              <ShoppingBasket className="w-5 h-5" />
              <span>My Basket</span>
            </Link>
          </Button>

          <ClerkLoaded>
            <SignedIn>
              <Button
                variant={"link"}
                className="bg-main-blue px-4 py-2 text-white rounded hover:bg-main-blue/80 flex-1"
              >
                <Link href={"/"} className="flex items-center gap-2">
                  <PackageIcon className="w-5 h-5" />
                  <span>My Orders</span>
                </Link>
              </Button>
            </SignedIn>

            {user ? (
              <div className="flex items-center gap-4">
                <UserButton />

                <div className="hidden md:block ">
                  <p className="font-bold">Welcom Back!</p>
                  <p className="font-semibold text-gray-500">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <SignInButton mode="modal">
                  <Button className="w-full">Login</Button>
                </SignInButton>
              </div>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
