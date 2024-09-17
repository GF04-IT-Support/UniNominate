import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
