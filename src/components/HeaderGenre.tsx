import { ChevronDown, ChevronRight, Divide } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";
import { getGenre } from "@/lib/api/getGenre";
import { GenreType, MovieType } from "@/types";

export const HeaderGenre = () => {
  const [showGenre, setShowGenre] = useState<GenreType[]>([]);

  useEffect(() => {
    const fetchGenre = async () => {
      const data = await getGenre();
      console.log("dadsdsad", data);
      setShowGenre(data.genres);
    };
    fetchGenre();
  }, []);

  return (
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className=" ">
            <ChevronDown /> <p className="hidden sm:block ">Genre</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="sm:w-[700px] min-w-[320px] sm:h-full ">
          <div className="px-2">
            <h2 className="font-[600] sm:text-[24px] text-[20px] ">Genres</h2>
            <p className="font-[400] text-[16px] ">
              See lists of movies by genre
            </p>
          </div>
          <div className="border-1 my-4"></div>
          <div className="flex flex-wrap gap-2  ">
            {showGenre.map((genre) => (
              <Link href={`/genre/${genre.id}`} key={genre.id}>
                <Button
                  variant="outline"
                  className="rounded-full mx-1 text-[12px] font-[600] cursor-pointer  "
                >
                  {genre.name}
                  <ChevronRight />
                </Button>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
