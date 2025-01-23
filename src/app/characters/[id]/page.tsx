"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { getCharacter } from "@/services";
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

const CharacterDetailPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const characterId = params.id;

  const {
    data: character,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["films", params.id],
    queryFn: () => getCharacter(Number(characterId)),
    enabled: !!characterId && !isNaN(Number(characterId)),
    select: (data) => data.data,
  });

  const showError = !isLoading && (isError || !character);

  if (isLoading) {
    return (
      <div className="w-full flex flex-row justify-center">
        {isLoading && <LoadingSpinner />}
      </div>
    );
  }

  if (showError) {
    return (
      <ErrorCard msg="Failed to load character, an error it is. Watch it, you shall not!" />
    );
  }

  return (
    <div className="max-w-4xl w-full h-full mx-auto gap-6 px-6">
      {!isLoading && character && (
        <div className="flex flex-col items-start justify-center">
          <div className="flex flex-row items-center justify-start gap-8">
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <div
                  className="cursor-pointer"
                  onClick={() => router.push("/characters")}
                >
                  <BackArrow />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to characters</p>
              </TooltipContent>
            </Tooltip>

            <h1
              className={`scroll-m-20 text-xl md:text-3xl font-extrabold tracking-tight lg:text-4xl self-center mb-2 ${pressStart2P.className}`}
            >
              {character.name}
            </h1>
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <p className="leading-7">
              <b>Gender:</b> {character.gender}
            </p>
            <p className="leading-7 ">
              <b>Birth year:</b> {character.birth_year}
            </p>
            <p className="leading-7">
              <b>Eye color:</b> {character.eye_color}
            </p>
            <p className="leading-7">
              <b>Skin color:</b> {character.skin_color}
            </p>
            <p className="leading-7">
              <b>Height:</b> {character.height}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetailPage;
