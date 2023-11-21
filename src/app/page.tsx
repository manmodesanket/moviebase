import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">Discover movies</h1>
      <Link href="discover" className="mt-8 underline">
        Get Started
      </Link>
    </main>
  );
}
