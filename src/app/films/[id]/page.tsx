"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { getFilm } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { Press_Start_2P } from "next/font/google";
import BackArrow from "@/components/ui/BackArrow";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ErrorCard from "@/components/ErrorCard";
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const FilmDetailPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const filmId = params.id;

  const {
    data: film,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["films", params.id],
    queryFn: () => getFilm(Number(filmId)),
    enabled: !!filmId && !isNaN(Number(filmId)),
    select: (data) => data.data,
  });

  console.log(isLoading);

  const showError = !isLoading && (isError || !film);

  if (isLoading) {
    return (
      <div className="w-full flex flex-row justify-center">
        {isLoading && <LoadingSpinner />}
      </div>
    );
  }

  if (showError) {
    return (
      <ErrorCard msg="Failed to load film, an error it is. Watch it, you shall not!" />
    );
  }

  return (
    <div className="max-w-4xl w-full h-full mx-auto gap-6 px-6">
      {!isLoading && film && (
        <div className="flex flex-col items-start justify-center">
          <div className="flex flex-row items-center justify-start gap-8">
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <div
                  className="cursor-pointer"
                  onClick={() => router.push("/films")}
                >
                  <BackArrow />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to films</p>
              </TooltipContent>
            </Tooltip>

            <h1
              className={`scroll-m-20 text-xl md:text-3xl font-extrabold tracking-tight lg:text-4xl self-center mb-2 ${pressStart2P.className}`}
            >
              {film.title}
            </h1>
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <p className="leading-7">
              <b>Director:</b> {film.director}
            </p>
            <p className="leading-7 ">
              <b>Producer:</b> {film.producer}
            </p>
            <p className="leading-7">
              <b>Release Date:</b> {film.release_date}
            </p>
          </div>

          <p className="text-xl text-muted-foreground mt-8 text-neutral-300">
            {film.opening_crawl}
          </p>
        </div>
      )}
    </div>
  );
};

export default FilmDetailPage;
