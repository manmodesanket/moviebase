import { HamburgerMenu, Sidebar } from "../components";

export default function Discover() {
  return (
    <div id="page" className="min-h-screen lg:grid lg:grid-cols-12">
      <nav className="lg:hidden">
        <HamburgerMenu pageWrapId="page-content" outerContainerId="page" />
      </nav>
      <nav className="hidden lg:block  lg:col-span-2">
        <Sidebar />
      </nav>
      <main
        id="page-content"
        className="flex flex-col lg:p-24 p-4 lg:col-span-10"
      >
        <h1 className="text-2xl font-semibold tracking-tight">Discover</h1>
      </main>
    </div>
  );
}
