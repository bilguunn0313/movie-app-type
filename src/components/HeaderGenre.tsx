import { ChevronDown, ChevronRight, Divide } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";
import { getGenre } from "@/lib/api/getGenre";
import { GenreType, MovieType } from "@/types";
import { GenreSelect } from "@/app/genre/components/GenreSelect";
import { Genre } from "./Genre";

export const HeaderGenre = () => {
  const [showGenre, setShowGenre] = useState<GenreType[]>([]);

  useEffect(() => {
    const fetchGenre = async () => {
      const data = await getGenre();
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
          <Genre />
        </PopoverContent>
      </Popover>
    </div>
  );
};
