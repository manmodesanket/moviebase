import { Skeleton } from "./shadcn-ui/skeleton";

const ImageSkeleton = () => {
  return (
    <div className="animate-pulse rounded-md overflow-hidden bg-gray-300 p-2">
      <div className="lg:h-80 h-56 w-52"></div> {/* Adjust height as needed */}
    </div>
  );
};

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-8 mt-8">
      <Skeleton className="h-[315px] w-[210px]" />
      <Skeleton className="h-[315px] w-[210px]" />
      <Skeleton className="h-[315px] w-[210px]" />
      <Skeleton className="h-[315px] w-[210px]" />
      <Skeleton className="h-[315px] w-[210px]" />
      <Skeleton className="h-[315px] w-[210px]" />
      <Skeleton className="h-[315px] w-[210px]" />
      <Skeleton className="h-[315px] w-[210px]" />
    </div>
  );
}
