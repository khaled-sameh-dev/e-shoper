import Container from "@/components/shared/Container";

const SalesBanner = () => {
  return (
    <div className="w-full min-h-max bg-gradient-to-r from-slate-800 to-slate-500 px-8 py-16 rounded-lg">
      <Container classname="flex flex-col gap-2 text-white">
        <h2 className="text-xl font-bold">Black Friday</h2>
        <p className="font-semibold">Welcome to this year largest sale!</p>
        <button className="max-w-max bg-white my-2 py-2 px-4 rounded cursor-pointer hover:scale-105">
          <p className="text-lg font-semibold text-black">
            Use code <span className="text-slate-500">BeFriday</span>
          </p>
        </button>
      </Container>
    </div>
  );
};

export default SalesBanner;
