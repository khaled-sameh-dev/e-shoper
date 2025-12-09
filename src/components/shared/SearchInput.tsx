import Form from "next/form";

const SearchInput = () => {
  return (
    <Form
      action={"/products"}
      className="w-full sm:flex-1 sm:w-auto flex justify-end"
    >
      <input
        type="text"
        placeholder="Search Products..."
        name="query"
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:ring-2 focus:ring-main-blue border outline-none w-full max-w-lg"
      />
    </Form>
  );
};

export default SearchInput;
