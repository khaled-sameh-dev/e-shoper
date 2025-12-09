import { ReactNode } from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardNavbar from "./_components/DashboardNavbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardPagesHeader from "./_components/DashboardPagesHeader";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-[2fr_5fr] md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_5fr]"></div>
    <div className=" bg-gray-100">
      <DashboardNavbar />
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full my-6 sm:my-10 px-6 sm:px-8 md:px-10">
          <DashboardPagesHeader />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
