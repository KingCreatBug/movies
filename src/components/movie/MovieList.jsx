import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../movie/MovieCard";
import useSWR from "swr";
import fetcher, { tmdbAPI } from "../../config";

const MovieList = ({ type = "now_playing" }) => {
    const { data, error, isLoading } = useSWR(
        tmdbAPI.getMovieList(type),
        fetcher
    );
    const movies = data?.results || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading movies. Please try again later.</div>;
    }

    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <MovieCard movie={movie}></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
