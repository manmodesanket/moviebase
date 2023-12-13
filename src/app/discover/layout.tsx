import { HamburgerMenu, Sidebar } from "@/components";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="page" className="min-h-screen lg:grid lg:grid-cols-12">
      <nav className="lg:hidden">
        <HamburgerMenu pageWrapId="page-content" outerContainerId="page" />
      </nav>
      <nav className="hidden lg:block lg:col-span-2 border-r border-slate-300">
        <Sidebar />
      </nav>
      <main className="lg:px-12 pt-20 lg:col-span-10">{children}</main>
    </div>
  );
}
