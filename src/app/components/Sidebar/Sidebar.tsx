export default function Sidebar({}) {
  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="space-y-1">
          <button className="w-full justify-start">Discover</button>
          <button className="w-full justify-start">Trending</button>
          <button className="w-full justify-start">Upcoming</button>
        </div>
      </div>
    </div>
  );
}
