import { Skeleton } from "@/components/shadcn-ui/skeleton";

export default async function Page({}) {
  return (
    <main className="p-2">
      <section className="lg:grid lg:grid-cols-2 mb-4">
        <Skeleton className="h-[315px] w-[205px]" />
        <div className="mt-4">
          <Skeleton className="h-4 w-[250px]" />
          <div className="mt-4 flex gap-4">
            <Skeleton className="h-4 w-[40px] rounded col-span-2" />
            <Skeleton className="h-4 w-[40px] rounded col-span-2" />
          </div>
          <div className="mt-4 flex gap-4">
            <Skeleton className="h-6 w-[80px] rounded col-span-2" />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Skeleton className="h-2 rounded col-span-2" />
            <Skeleton className="h-2 rounded col-span-2" />
            <Skeleton className="h-2 rounded col-span-2" />
            <Skeleton className="h-2 rounded col-span-2" />
          </div>
        </div>
      </section>
    </main>
  );
}
