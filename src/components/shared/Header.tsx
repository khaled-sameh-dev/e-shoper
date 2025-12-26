"use client";

import { motion } from "framer-motion";
import Container from "./Container";
import ClerkController from "./ClerkController";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import BasketButton from "./BasketButton";

const Header = () => {
  return (
    <motion.header
      className="w-full px-8 mx-auto xl:px-0 py-4 bg-white border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <Container classname="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <motion.div
          className="flex-1 flex items-center justify-between gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Logo />

          <motion.div
            className="hidden sm:flex w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <SearchInput />
          </motion.div>

          <div className="flex sm:hidden">
            <div className="flex-1 flex items-center justify-end gap-4 sm:max-w-max">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BasketButton />
              </motion.div>

              <ClerkController />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hidden flex-1 sm:flex items-center justify-end gap-4 sm:max-w-max"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <BasketButton />
          </motion.div>

          <ClerkController />
        </motion.div>

        <motion.div
          className="flex sm:hidden w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <SearchInput />
        </motion.div>
      </Container>
    </motion.header>
  );
};

export default Header;
