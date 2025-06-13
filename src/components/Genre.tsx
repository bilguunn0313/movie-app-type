"use client";
import { getGenre } from "@/lib/api/getGenre";
import { GenreResults, GenreType, MovieType } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const Genre = () => {
  const router = useRouter();

  const [showGenre, setShowGenre] = useState<MovieType[]>([]);
  const [selectGenreId, setSelectGenreId] = useState<number[]>([]);
  const [genreName, setGenreName] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenre = async () => {
      const data = await getGenre();
      setShowGenre(data?.genres);
    };
    fetchGenre();
  }, []);

  const toggleGenre = (id: number, name: string) => {
    const updateId = selectGenreId.includes(id)
      ? selectGenreId.filter((e) => e !== id)
      : [...selectGenreId, id];

    setSelectGenreId(updateId);

    const updateName = genreName.includes(name)
      ? genreName.filter((e) => e !== name)
      : [...genreName, name];

    setGenreName(updateName);
    router.push(`/genre?genreId=${updateId}&name=${updateName}`);
  };

  return (
    <div>
      <div className="px-2">
        <h2 className="font-[600] sm:text-[24px] text-[20px] ">Genres</h2>
        <p className="font-[400] text-[16px] ">See lists of movies by genre</p>
      </div>
      <div className="border-1 my-4"></div>
      <div className="flex flex-wrap gap-2  ">
        {showGenre?.map((genre) => {
          const isSelected = selectGenreId.includes(genre.id);
          return (
            <Button
              key={genre.id}
              variant={isSelected ? "default" : "outline"}
              className="rounded-full mx-1 text-[12px] font-[600] cursor-pointer "
              onClick={() => toggleGenre(genre.id, genre.name)}
            >
              {genre.name}
              <ChevronRight />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
