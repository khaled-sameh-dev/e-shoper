import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <Header />
      <main className="min-h-screen  py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default layout;
