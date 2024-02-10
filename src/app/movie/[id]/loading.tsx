export default async function Page({}) {
  return (
    <main className="p-2">
      <section className="lg:grid lg:grid-cols-2 mb-4">
        <div className="animate-pulse">
          <div className="rounded-md bg-slate-400 h-[315px] w-[210px] mx-auto lg:mx-0"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="h-4 bg-slate-400 rounded col-span-2"></div>
          <div className="mt-4 flex gap-4">
            <div className="h-4 w-[40px] bg-slate-400 rounded col-span-2"></div>
            <div className="h-4 w-[40px] bg-slate-400 rounded col-span-2"></div>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="h-4 w-[80px] bg-slate-400 rounded col-span-2"></div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
