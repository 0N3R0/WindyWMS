"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface ShipmentsPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export function ShipmentsPagination({
  page,
  totalPages,
  total,
  limit,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onNextPage,
  onPrevPage,
}: ShipmentsPaginationProps) {
  // Calculate visible record range for current page
  const rangeStart = (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);

  // Generate page numbers to display (max 5 visible, sliding window)
  const getVisiblePages = (): number[] => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, page - half);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Don't render pagination if there's only 1 page
  if (totalPages <= 1) return null;

  return (
    <div>
      {/* Page navigation buttons */}
      <div className="flex items-center gap-0.5">
        {/* First page */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10"
          onClick={() => onPageChange(1)}
          disabled={!hasPrevPage}
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </Button>

        {/* Previous page */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10"
          onClick={onPrevPage}
          disabled={!hasPrevPage}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        {/* Page number buttons */}
        {getVisiblePages().map((pageNum) => (
          <Button
            key={pageNum}
            variant="ghost"
            size="icon"
            className={`h-7 w-7 text-xs transition-all duration-200 ${pageNum === page
              ? "bg-primary/20 text-primary border border-primary/30 font-semibold"
              : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        ))}

        {/* Next page */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10"
          onClick={onNextPage}
          disabled={!hasNextPage}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>

        {/* Last page */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10"
          onClick={() => onPageChange(totalPages)}
          disabled={!hasNextPage}
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}