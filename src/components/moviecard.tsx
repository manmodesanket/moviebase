import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn-ui/tooltip";

const NoImagePlaceholder = () => {
  const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="215" height="330" role="img" aria-label="No Image Available">
        <rect width="100%" height="100%" fill="transparent" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="gray">
          No Image
        </text>
      </svg>
    `;

  const encodedSvg = encodeURIComponent(svgString);
  const dataUri = `data:image/svg+xml,${encodedSvg}`;

  return (
    <div className="">
      <Image
        className="bg-gray-200 rounded-md overflow-hidden "
        src={dataUri}
        alt="No Image Available"
        width={210}
        height={315}
      />
    </div>
  );
};

export default function MovieCard({ movieData }: { movieData: any }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/movie/${movieData.id}`} key={movieData.id}>
            <article className="p-2">
              {movieData.poster_path ? (
                <Image
                  alt={movieData.title}
                  className="overflow-hidden rounded-md"
                  src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
                  width={210}
                  height={315}
                />
              ) : (
                <NoImagePlaceholder />
              )}
              <div className="font-semibold">{movieData.title}</div>
            </article>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white">
          <p>Rated: {movieData.vote_average.toFixed(2)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
