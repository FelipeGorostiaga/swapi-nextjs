"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFilms } from "@/services";
import { parseAsInteger, useQueryState } from "nuqs";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { Film } from "@/types";

export default function FilmsPage() {
  const router = useRouter();

  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const debouncedQuery = useDebounce(query, 300);

  const {
    data: films,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["films", debouncedQuery, page],
    queryFn: () => getFilms(page, debouncedQuery),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  const filmsData = films?.results || [];

  const handleNext = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (hasPrevPage) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSeeDetail = (film: Film) => {
    const filmId = film.url.split("/").slice(-2)[0];
    router.push(`/films/${filmId}`);
  };

  const hasNextPage = films?.next != null;
  const hasPrevPage = films?.previous != null;

  return (
    <main className="flex flex-col items-center max-w-4xl w-full h-full mx-auto gap-6 px-4">
      <Input
        value={query}
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <LoadingSpinner className={""} />}
      {!isLoading && (
        <div className="flex flex-col gap-4 w-full">
          <Table className="bg-neutral-950 border-2 border-neutral-900 rounded-lg w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Director</TableHead>
                <TableHead>Producer</TableHead>
                <TableHead>Release Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filmsData
                ?.sort((a, b) => a.episode_id - b.episode_id)
                .map((film) => (
                  <TableRow
                    key={film.episode_id}
                    className={`cursor-pointer ${
                      isPlaceholderData ? "opacity-70" : "opacity-100"
                    }`}
                    onClick={() => handleSeeDetail(film)}
                  >
                    <TableCell>{film.title}</TableCell>
                    <TableCell>{film.director}</TableCell>
                    <TableCell>{film.producer}</TableCell>
                    <TableCell>{film.release_date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrev}
                  className={`${
                    !hasPrevPage ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  Previous
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
              {hasNextPage && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  className={`${
                    !hasNextPage ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  Next
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
}
