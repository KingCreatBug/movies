import useSWR from "swr";
import fetcher, { tmdbAPI } from "../config";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import Button from "../components/button/Button";
import useSWRInfinite from "swr/infinite";

import { v4 } from "uuid";

const itemsPerPage = 20;

const MoviesPageV2 = () => {
    const [filter, setFilter] = useState("");
    const [nextPage, setNextPage] = useState(1);

    // Debounce filter
    const filterDebounce = useDebounce(filter, 500);

    // Tạo URL API theo điều kiện lọc
    const url = filterDebounce
        ? tmdbAPI.getMovieSearch(filterDebounce, nextPage)
        : tmdbAPI.getMovieList("popular", nextPage);

    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) => url.replace("page=1", `page=${index + 1}`),
        fetcher
    );
    // Lấy danh sách phim
    const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
    const isEmpty = data?.[0]?.results.length === 0;
    const isReachingEnd =
        isEmpty ||
        (data && data[data.length - 1]?.results.length < itemsPerPage);
    return (
        <div className="py-10 page-container">
            {/* Tìm kiếm */}
            <div className="flex mb-10">
                <div className="flex-1">
                    <input
                        onChange={(e) => setFilter(e.target.value)}
                        type="text"
                        className="w-full p-4 text-white outline-none bg-slate-800"
                        placeholder="Type here to search..."
                    />
                </div>
                <button className="p-4 text-white bg-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </div>

            {/* Loading */}
            {/* {isLoading && (
                <div className="w-10 h-10 mx-auto border-4 rounded-full border-b-secondary border-t-secondary border-primary animate-spin"></div>
            )} */}
            {isLoading && (
                <div className="grid grid-cols-4 gap-10">
                    {new Array(itemsPerPage).fill(0).map(() => (
                        <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                    ))}
                </div>
            )}

            {/* Danh sách phim */}
            <div className="grid grid-cols-4 gap-10">
                {!isLoading &&
                    movies.length > 0 &&
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}></MovieCard>
                    ))}
            </div>

            {/* Load more */}
            <div className="mt-10 text-center">
                <Button
                    onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
                    disabled={isReachingEnd}
                    className={`${isReachingEnd ? "bg-slate-300" : ""}`}
                >
                    Load more
                </Button>
            </div>
        </div>
    );
};

export default MoviesPageV2;
