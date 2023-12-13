import Search from "./search";

export default function Discover() {
  return (
    <div id="page-content" className="flex flex-col">
      <h2 className="text-2xl p-2 lg:p-0 font-semibold tracking-tight">
        Discover
      </h2>
      <Search />
    </div>
  );
}
