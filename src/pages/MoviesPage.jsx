import useSWR from "swr";
import fetcher, { tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;

const MoviesPage = () => {
    const [filter, setFilter] = useState("");
    const [nextPage, setNextPage] = useState(1);

    // Debounce filter
    const filterDebounce = useDebounce(filter, 500);

    // Tạo URL API theo điều kiện lọc
    const url = filterDebounce
        ? tmdbAPI.getMovieSearch(filterDebounce, nextPage)
        : tmdbAPI.getMovieList("popular", nextPage);

    const { data, isLoading } = useSWR(url, fetcher);

    // Tổng số trang
    const pageCount = data?.total_results
        ? Math.ceil(data.total_results / itemsPerPage)
        : 0;

    // Xử lý khi người dùng thay đổi trang
    const handlePageClick = (event) => {
        setNextPage(event.selected + 1);
    };

    // Lấy danh sách phim
    const movies = data?.results || [];

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
            {isLoading && (
                <div className="w-10 h-10 mx-auto border-4 rounded-full border-b-secondary border-t-secondary border-primary animate-spin"></div>
            )}

            {/* Danh sách phim */}
            <div className="grid grid-cols-4 gap-10">
                {!isLoading &&
                    movies.length > 0 &&
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}></MovieCard>
                    ))}
            </div>

            {/* Pagination */}
            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                />
            </div>
        </div>
    );
};

export default MoviesPage;
