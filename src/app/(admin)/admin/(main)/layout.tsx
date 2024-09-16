import AdminSidebar from "@/components/layout/AdminSidebar";
import { auth } from "@/utils/auth/auth";
import { SessionProvider } from "next-auth/react";
export default async function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main className="flex flex-col md:flex-row relative min-h-screen">
        <div className="md:hidden w-full">
          <AdminSidebar />
        </div>
        <div className="hidden md:block sticky top-0 h-screen">
          <AdminSidebar />
        </div>
        <div className="flex-1 flex-grow overflow-auto px-2 md:p-4">
          {children}
        </div>
      </main>
    </SessionProvider>
  );
}
