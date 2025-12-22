"use client";

import Form from "next/form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [value, setValue] = useState(initialQuery);

  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query")?.toString().trim() || "";
    const params = new URLSearchParams(searchParams.toString());

    if (typeof query !== "string" || !query.trim()) {
      params.delete("query");
      router.replace(`/products?${params.toString()}`, { scroll: false });
      return;
    }
    params.set("query", query);
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <Form
      action={handleSubmit}
      className="w-full sm:flex-1 sm:w-auto flex justify-end gap-2"
    >
      <input
        type="text"
        name="query"
        placeholder="Search Products..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:ring-2 focus:ring-main-blue border outline-none w-full max-w-lg"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-main-blue text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
    </Form>
  );
};

export default SearchInput;
