import Image from "next/image";
import { options } from "@/lib/utils";
import { Badge } from "@/components/shadcn-ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";

const fetcher = (url: string) => {
  if (!url) return null;
  return fetch(url, options).then((res) => res.json());
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const movieData = await fetcher(`https://api.themoviedb.org/3/movie/${id}`);
  const creditData = await fetcher(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
  );

  console.log(movieData);
  if (!movieData.success && !movieData.id) {
    return <div>Something went wrong!</div>;
  }

  const releaseYear = movieData.release_date.split("-")[0];
  const isCreditDataFetchedSuccessfully = creditData.id;

  return (
    <main className="p-2">
      <section className="lg:grid lg:grid-cols-2 mb-4">
        <div>
          <Image
            alt={movieData.title}
            className="overflow-hidden rounded-md mx-auto lg:mx-0"
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            width={210}
            height={315}
          />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {movieData.title} ({releaseYear})
          </h2>
          <ul className="flex text-white gap-2 mt-4">
            {movieData.genres.map((genre: { id: number; name: string }) => (
              <li key={genre.id}>
                <Badge>{genre.name}</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-xl">
              Rated: {movieData.vote_average.toFixed(2)}
            </h3>
          </div>
          <p className="mt-4 mb-10">{movieData.overview}</p>
        </div>
      </section>
      {isCreditDataFetchedSuccessfully && (
        <section>
          <Tabs defaultValue="cast">
            <div className="flex justify-center">
              <TabsList className="bg-muted w-[300px] mx-auto">
                <TabsTrigger className="w-[150px]" value="cast">
                  Cast
                </TabsTrigger>
                <TabsTrigger className="w-[150px]" value="crew">
                  Crew
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              className="grid grid-cols-3 lg:grid-cols-5 gap-4 mt-8"
              value="cast"
            >
              {creditData.cast.map(
                (person: {
                  id: number;
                  name: string;
                  profile_path: string;
                }) => (
                  <div key={person.id} className="flex flex-col gap-2">
                    <Image
                      alt={person.name}
                      className="overflow-hidden rounded-md mx-auto"
                      src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                      width={100}
                      height={100}
                    />
                    <div>
                      <p className="text-center">{person.name}</p>
                    </div>
                  </div>
                ),
              )}
            </TabsContent>
            <TabsContent
              className="grid grid-cols-3 lg:grid-cols-5 gap-4 mt-8"
              value="crew"
            >
              {creditData.crew.map(
                (person: {
                  id: number;
                  name: string;
                  profile_path: string;
                }) => (
                  <div key={person.id} className="flex flex-col gap-2">
                    <Image
                      alt={person.name}
                      className="overflow-hidden rounded-md mx-auto"
                      src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                      width={100}
                      height={100}
                    />
                    <p className="text-center">{person.name}</p>
                  </div>
                ),
              )}
            </TabsContent>
          </Tabs>
        </section>
      )}
    </main>
  );
}
