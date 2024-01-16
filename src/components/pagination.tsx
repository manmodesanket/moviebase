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
  onPageChange,
}: {
  pages: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  onPageChange?: any;
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
                if (onPageChange) onPageChange(newPage);
              }
            }}
          />
        </PaginationItem>
        {pagesList.map((item) => (
          <PaginationItem>
            <PaginationLink
              isActive={item === pageIndex ? true : false}
              onClick={() => {
                setPageIndex(item);
                if (onPageChange) onPageChange(item);
              }}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              const newPage = pageIndex + 1;
              console.log(newPage);
              if (newPage <= 10 && newPage <= pages) {
                console.log("setting page", newPage, onPageChange);
                setPageIndex(newPage);
                if (onPageChange) onPageChange(newPage);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
