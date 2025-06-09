type search = {
  query: string;
};
export const getSearch = async (query: search, page = 1) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}search/movie?query=${query}&language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    console.log("search", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
