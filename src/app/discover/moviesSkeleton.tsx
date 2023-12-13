const ImageSkeleton = () => {
  return (
    <div className="overflow-hidden p-2">
      <div
        style={{ height: "315px", width: "210px" }}
        className="lg:h-80 bg-gray-300 rounded-md animate-pulse"
      ></div>{" "}
    </div>
  );
};

export default function Loading() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-8">
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
    </div>
  );
}
