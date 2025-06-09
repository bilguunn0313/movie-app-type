"use client";
import { getSearch } from "@/lib/api/getSearch";
import { ArrowRight, Link, Star } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  //   const router = useRouter();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setValue(event.target.event);
      //   router.push(`/search/${query}`);
    }
  };

  useEffect(() => {
    const getDelay = setTimeout(() => {
      const fetchSearch = async () => {
        try {
          const data = await getSearch({ query });
          setResults(data?.results || []);
        } catch (error) {
          console.log("search", error);
        }
      };
      fetchSearch();
    }, 600);
    return () => clearTimeout(getDelay);
  }, [query]);

  return (
    <div>
      {/* <Search className="w-4 h-4 absolute top-7 left-255 right-295 text-[#71717A] " /> */}

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        className="border-8 shadow-lg border-transparent rounded-xl md:pr-40 md:pl-6 relative sm:text-[14px] w-[160px]  sm:w-[400px]"
      />

      {loading && <p>Searching</p>}

      {!loading && results?.length > 2 && (
        <div className="absolute sm:left-210 z-10 bg-white border rounded-xl sm:w-[600px] w-[300px]  ">
          {results.slice(0, 6).map((movie) => {
            // const posterUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}${movie?.poster_path} `;
            return (
              <div key={movie.id} className=" text-sm mx-4 my-2   ">
                <button className=" flex max-w-[577px] gap-4 ">
                  <Link href={`/details/${movie.id}`}>
                    <img
                      //   src={posterUrl}
                      className="w-[67px] h-[100px] rounded-xl cursor-pointer"
                    />
                  </Link>
                  <div className="sm:w-[577px] w-[200px]">
                    <Link href={`/details/${movie.id}`}>
                      <p className="text-[20px] font-[600] flex cursor-pointer">
                        {movie.title}
                      </p>
                    </Link>
                    <div className="flex">
                      <Star
                        color="rgba(253, 224, 71, 1)"
                        fill="rgba(253, 224, 71, 1)"
                        className="w-4"
                      />

                      <p className="font-[600]">
                        {movie.vote_average.toFixed(1)}
                      </p>
                      <p className="text-[#71717a]">/10</p>
                    </div>
                    <div className="sm:flex sm:justify-between py-3">
                      <p>{movie.release_date}</p>
                      <Link href={`/details/${movie.id}`}>
                        <div className="flex cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-150">
                          <p className="text-[14px] font-[500] ">See more</p>
                          <ArrowRight className="w-4 h-5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </button>
                <div className="border-1 my-2"></div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && query && results.length === 0 && <p>No results found</p>}
    </div>
  );
};
