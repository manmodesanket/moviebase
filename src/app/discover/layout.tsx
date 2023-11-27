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
      <nav className="hidden lg:block lg:col-span-2">
        <Sidebar />
      </nav>
      {children}
    </div>
  );
}
