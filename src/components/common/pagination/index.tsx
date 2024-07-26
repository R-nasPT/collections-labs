"use client";

import { Link, usePathname } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  total: number;
}

export default function Pagination({ hasNextPage, hasPrevPage, total }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  const totalPages = Math.ceil(total / Number(per_page));
  const start = (Number(page) - 1) * Number(per_page) + 1;
  const end = Math.min(Number(page) * Number(per_page), total);

  const prevPageUrl = `${pathname}?page=${Number(page) - 1}&per_page=${per_page}`;
  const nextPageUrl = `${pathname}?page=${Number(page) + 1}&per_page=${per_page}`;

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return pageNumbers
      .map((i) => {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= Number(page) - 1 && i <= Number(page) + 1) ||
          (i === 2 && Number(page) > 4) ||
          (i === totalPages - 1 && Number(page) < totalPages - 3)
        ) {
          return (
            <Link
              key={i}
              href={`${pathname}?page=${i}&per_page=${per_page}`}
              aria-current={Number(page) === i ? "page" : undefined}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                Number(page) === i
                  ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
              }`}
            >
              {i}
            </Link>
          );
        } else if (
          (i === 3 && Number(page) > 4) ||
          (i === totalPages - 2 && Number(page) < totalPages - 3)
        ) {
          return (
            <span
              key={i}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            >
              ...
            </span>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pt-3 sm:px-6">
        {/* --- Mobile --- */}
        <div className="flex flex-1 justify-between items-center sm:hidden">
          <Link
            href={prevPageUrl}
            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              !hasPrevPage ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Previous
          </Link>
          <div>
            <p className="text-sm text-gray-700">
              Page{" "}
              <span className="font-medium">
                {page} / {totalPages}
              </span>
            </p>
          </div>
          <Link
            href={nextPageUrl}
            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              !hasNextPage ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Next
          </Link>
        </div>

        {/* --- Desktop --- */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{start}</span> to{" "}
              <span className="font-medium">{end}</span> of{" "}
              <span className="font-medium">{total}</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <Link
                href={prevPageUrl}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  !hasPrevPage ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <span className="sr-only">Previous</span>
                <IoIosArrowBack aria-hidden="true" className="h-5 w-5" />
              </Link>

              {renderPageNumbers()}

              <Link
                href={nextPageUrl}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  !hasNextPage ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <span className="sr-only">Next</span>
                <IoIosArrowForward aria-hidden="true" className="h-5 w-5" />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
