import { Sidebar } from "@/components";
import NavMobile from "@/components/MobileMenu";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="page" className="min-h-screen lg:grid lg:grid-cols-12">
      <nav className="lg:hidden">
        <NavMobile />
      </nav>
      <nav className="hidden lg:block lg:col-span-2 border-r border-slate-300">
        <Sidebar />
      </nav>
      <main className="lg:px-12 lg:pt-20 pt-4 lg:col-span-10">{children}</main>
    </div>
  );
}
