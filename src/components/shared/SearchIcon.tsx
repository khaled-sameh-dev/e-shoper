import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const SearchIcon = () => {
  return (
    <Button
      variant={"ghost"}
      className="hover:text-light-green  cursor-pointer"
    >
      <Search className="h-8 w-8" />
    </Button>
  );
};

export default SearchIcon;
