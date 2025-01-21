"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
import { Film } from "@/types/Films";

// How many items to show per page
const ITEMS_PER_PAGE = 10;

const filmsUrl = "https://swapi.dev/api/films";

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const res = await fetch(filmsUrl);
        const data = await res.json();
        setFilms(data.results);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }
    fetchFilms();
  }, []);

  // Derived values for pagination
  const pageCount = Math.ceil(films.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = films.slice(startIndex, endIndex);

  const handleNext = () => {
    if (page < pageCount) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSeeDetail = (filmId: number) => {
    console.log("film id", filmId);
  };

  return (
    <main className="flex flex-col items-center max-w-4xl w-full h-full mx-auto gap-6">
      <Table className="bg-neutral-950 border-2 border-neutral-900 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Director</TableHead>
            <TableHead>Producer</TableHead>
            <TableHead>Release Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((film) => (
            <TableRow
              key={film.episode_id}
              className="cursor-pointer"
              onClick={() => handleSeeDetail(film.episode_id)}
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
            <PaginationPrevious onClick={handlePrev} />
          </PaginationItem>
          {Array.from({ length: pageCount }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink onClick={() => setPage(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
