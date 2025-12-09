import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  classname?: string;
}
const Container = ({ children, classname }: ContainerProps) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto", classname)}>{children}</div>
  );
};

export default Container;
