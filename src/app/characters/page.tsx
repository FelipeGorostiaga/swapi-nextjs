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
import { parseAsInteger, useQueryState } from "nuqs";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { Character } from "@/types";
import { getCharacters } from "@/services";

export default function CharactersPage() {
  const router = useRouter();

  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const debouncedQuery = useDebounce(query, 300);

  const {
    data: characters,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["characters", debouncedQuery, page],
    queryFn: () => getCharacters(page, debouncedQuery),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  const charactersData = characters?.results || [];

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

  const handleSeeDetail = (character: Character) => {
    const characterId = character.url.split("/").slice(-2)[0];
    router.push(`/characters/${characterId}`);
  };

  const hasNextPage = characters?.next != null;
  const hasPrevPage = characters?.previous != null;

  return (
    <main className="flex flex-col items-center max-w-4xl w-full h-full mx-auto gap-6 px-4 pb-4">
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <LoadingSpinner className={""} />}
      {!isLoading && (
        <div className="flex flex-col gap-4 w-full">
          <Table className="bg-neutral-950 border-2 border-neutral-900 rounded-lg w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Eye Color</TableHead>
                <TableHead>Mass</TableHead>
                <TableHead>Hair Color</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {charactersData.map((character) => (
                <TableRow
                  key={character.name}
                  className={`cursor-pointer ${
                    isPlaceholderData ? "opacity-70" : "opacity-100"
                  }`}
                  onClick={() => handleSeeDetail(character)}
                >
                  <TableCell>{character.name}</TableCell>
                  <TableCell>{character.gender}</TableCell>
                  <TableCell>{character.eye_color}</TableCell>
                  <TableCell>{character.mass}</TableCell>
                  <TableCell>{character.hair_color}</TableCell>
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
