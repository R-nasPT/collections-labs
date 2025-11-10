import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/Select';
import { Button } from '@/shared/components/ui/Button';

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  total: number;
  onPerPageChange: (newPerPage: number) => void;
  onPageChange: (newPage: number) => void;
}

export default function PaginationControl({
  hasNextPage,
  hasPrevPage,
  total,
  onPerPageChange,
  onPageChange,
}: PaginationProps) {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = Number(searchParams.get('page') ?? '1');
  const per_page = Number(searchParams.get('per_page') ?? '10');

  const [localPerPage, setLocalPerPage] = useState(per_page);

  const totalPages = Math.ceil(total / per_page);
  const start = (page - 1) * per_page + 1;
  const end = Math.min(page * per_page, total);

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNum.toString());
    return `${location.pathname}?${params.toString()}`;
  };

  const handlePerPageChange = (value: string) => {
    const newPerPage = Number(value);
    setLocalPerPage(newPerPage);
    onPerPageChange(newPerPage);
  };

  // ==== Logic for page numbers ====
  const showEllipsisStart = page > 3;
  const showEllipsisEnd = page < totalPages - 2;
  const startPage = Math.max(2, page - 1);
  const endPage = Math.min(totalPages - 1, page + 1);
  const middlePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex flex-col gap-3 border-t bg-background px-4 py-4 sm:px-6">
      {/* --- Mobile View --- */}
      <div className="flex items-center justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          asChild={hasPrevPage}
        >
          {hasPrevPage ? (
            <Link to={createPageUrl(page - 1)}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Link>
          ) : (
            <>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </>
          )}
        </Button>

        <span className="text-sm text-muted-foreground">
          Page <span className="font-medium text-foreground">{page}</span> of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          asChild={hasNextPage}
        >
          {hasNextPage ? (
            <Link to={createPageUrl(page + 1)}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          ) : (
            <>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* --- Desktop View --- */}
      <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Results info */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="text-muted-foreground">Showing</span>
          <span className="font-medium text-foreground">{start}</span>
          <span className="text-muted-foreground">–</span>
          <span className="font-medium text-foreground">{end}</span>
          <span className="text-muted-foreground">of</span>
          <span className="font-medium text-foreground">{total}</span>
          <span className="text-muted-foreground">results</span>
        </div>

        {/* Center - Pagination */}
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href={createPageUrl(page - 1)}
                onClick={() => onPageChange(page - 1)}
                className={!hasPrevPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* First Page */}
            <PaginationItem>
              <PaginationLink
                href={createPageUrl(1)}
                onClick={() => onPageChange(1)}
                isActive={page === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Ellipsis Start */}
            {showEllipsisStart && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Middle Pages */}
            {middlePages.map((i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={createPageUrl(i)}
                  onClick={() => onPageChange(i)}
                  isActive={page === i}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Ellipsis End */}
            {showEllipsisEnd && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Last Page */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={createPageUrl(totalPages)}
                  onClick={() => onPageChange(totalPages)}
                  isActive={page === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href={createPageUrl(page + 1)}
                onClick={() => onPageChange(page + 1)}
                className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Items per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Per page</span>
          <Select value={localPerPage.toString()} onValueChange={handlePerPageChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
