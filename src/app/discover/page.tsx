import { Sidebar } from "../components";

export default function Discover() {
  return (
    <div className="lg:grid lg:grid-cols-12">
      <nav className="lg:col-span-2">
        <Sidebar />
      </nav>
      <main className="flex min-h-screen flex-col lg:p-24 p-4 lg:col-span-10">
        <h1 className="text-2xl font-semibold tracking-tight">Discover</h1>
      </main>
    </div>
  );
}
