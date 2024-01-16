import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";
import Search from "./search";
import DiscoverMoviesByFilter from "./filter";

export default function Discover() {
  return (
    <div id="page-content" className="flex flex-col">
      <Tabs defaultValue="name" className="">
        <TabsList className="bg-muted w-[300px] mx-auto">
          <TabsTrigger className="w-[150px]" value="name">
            Name
          </TabsTrigger>
          <TabsTrigger className="w-[150px]" value="filters">
            Filters
          </TabsTrigger>
        </TabsList>
        <TabsContent value="name">
          <Search />
        </TabsContent>
        <TabsContent value="filters">
          <DiscoverMoviesByFilter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
