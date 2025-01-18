import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "../movie/MovieCard";
import useSWR from "swr";
import fetcher, { tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieList = ({ type }) => {
    const { data, isLoading } = useSWR(tmdbAPI.getMovieList(type), fetcher);

    const movies = data?.results || [];

    return (
        <div className="movie-list">
            {isLoading && (
                <>
                    <Swiper
                        grabCursor={true}
                        spaceBetween={40}
                        slidesPerView={"auto"}
                    >
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                    </Swiper>
                </>
            )}

            {!isLoading && (
                <Swiper
                    grabCursor={true}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                >
                    {movies.length > 0 &&
                        movies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <MovieCard movie={movie}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            )}
        </div>
    );
};

MovieList.propTypes = {
    type: PropTypes.string.isRequired,
};

function FallbackComponent() {
    return (
        <p className="text-red-400 bg-red-50">
            Something went wrong with this component
        </p>
    );
}

export default withErrorBoundary(MovieList, {
    FallbackComponent,
});
