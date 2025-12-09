"use client";

import { motion, AnimatePresence } from "framer-motion";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AnimatedToggleText from "../../_components/AnimatedToggleText";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface CollapsibleFilterProps {
  children: ReactNode;
  label: string;
}

const CollapsibleFilter = ({ children, label }: CollapsibleFilterProps) => {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full mb-4 cursor-pointer group">
          <h3 className="font-bold">
            <AnimatedToggleText show>{label}</AnimatedToggleText>
          </h3>
          <motion.div
            animate={{ rotate: 0 }}
            className="group-data-[state=open]:rotate-180 transition-transform duration-200"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleFilter;
