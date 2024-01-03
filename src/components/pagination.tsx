import {
  PaginationContent,
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./shadcn-ui/pagination";

function createArrayWithLoop(limit: number) {
  const result = [];
  for (let i = 1; i <= limit; i++) {
    result.push(i);
  }
  return result;
}

export default function PaginationComponent({
  pages,
  pageIndex,
  setPageIndex,
}: {
  pages: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const pagesList = createArrayWithLoop(pages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              const newPage = pageIndex - 1;
              if (newPage > 0) {
                setPageIndex(newPage);
              }
            }}
          />
        </PaginationItem>
        {pagesList.map((item) => (
          <PaginationItem>
            <PaginationLink
              isActive={item === pageIndex ? true : false}
              onClick={() => setPageIndex(item)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              const newPage = pageIndex + 1;
              console.log(newPage, pages);
              if (newPage <= 10 && newPage <= pages) {
                setPageIndex(newPage);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
