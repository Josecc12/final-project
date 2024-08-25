import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));

type PaginationButtonProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">;

const PaginationButton = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationButtonProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationButton>
);

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationButton>
);

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

interface PaginationComponentProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function PaginationComponent({
  page,
  totalPages,
  onPageChange,
}: PaginationComponentProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange?.(page - 1)}
            disabled={page === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationButton
            onClick={() => onPageChange?.(1)}
            isActive={page === 1}
          >
            1
          </PaginationButton>
        </PaginationItem>
        {page > 3 && <PaginationEllipsis />}
        {page > 2 && (
          <PaginationItem>
            <PaginationButton onClick={() => onPageChange?.(page - 1)}>
              {page - 1}
            </PaginationButton>
          </PaginationItem>
        )}
        {page !== 1 && page !== totalPages && (
          <PaginationItem>
            <PaginationButton isActive>{page}</PaginationButton>
          </PaginationItem>
        )}
        {page < totalPages - 1 && (
          <PaginationItem>
            <PaginationButton onClick={() => onPageChange?.(page + 1)}>
              {page + 1}
            </PaginationButton>
          </PaginationItem>
        )}
        {page < totalPages - 2 && <PaginationEllipsis />}
        <PaginationItem>
          <PaginationButton
            onClick={() => onPageChange?.(totalPages)}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            disabled={page === totalPages}
            onClick={() => onPageChange?.(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
