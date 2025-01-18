import { useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher, { tmdbAPI } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);

    if (!data && !error) return <div>Loading...</div>;
    if (error)
        return <div>Error loading movie details. Please try again later.</div>;

    const {
        title = "No title available",
        profile_path,
        backdrop_path,
        poster_path,
        genres = [],
        overview = "No overview available.",
    } = data || {};
    return (
        <div className="py-10">
            {/* Background */}
            <div className="w-full h-[600px] relative">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div
                    className="w-full h-full bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${tmdbAPI.imageOriginal(
                            backdrop_path
                        )})`,
                    }}
                ></div>
            </div>

            {/* Poster */}
            <div className="w-full h-[400px] -mt-[200px] pb-10 relative z-10">
                <img
                    className="object-cover w-full h-full rounded-xl max-w-[800px] mx-auto"
                    src={tmdbAPI.imageOriginal(poster_path)}
                    alt={title}
                />
            </div>

            {/* Title */}
            <h1 className="mb-10 text-4xl font-bold text-center text-white">
                {title}
            </h1>

            {/* Genres */}
            {genres.length > 0 && (
                <div className="flex items-center justify-center mb-10 gap-x-5">
                    {genres.map((item) => (
                        <span
                            className="px-4 py-2 border rounded text-primary border-primary"
                            key={item.id}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}

            {/* Overview */}
            <p className="text-sm mb-10 text-center leading-relaxed max-w-[600px] mx-auto">
                {overview}
            </p>

            {/* Components */}
            <MovieMeta type="credits"></MovieMeta>
            <MovieMeta type="videos"></MovieMeta>
            <MovieMeta type="similar"></MovieMeta>
        </div>
    );
};

function MovieMeta({ type = "videos" }) {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        tmdbAPI.getMovieMeta(movieId, type),
        fetcher
    );
    if (!data && !error) return <div>Loading...</div>;
    if (error) return <div>Error loading video details.</div>;
    if (type === "credits") {
        const { cast } = data;
        if (!cast || cast.length <= 0) return null;
        return (
            <div className="py-10">
                <h2 className="mb-10 text-3xl text-center">Casts</h2>
                <div className="grid grid-cols-4 gap-5">
                    {cast.slice(0, 4).map((item) => (
                        <div key={item.id} className="cast-item">
                            <img
                                src={tmdbAPI.imageOriginal(item.profile_path)}
                                className="w-full mb-3 h-[350px] object-cover rounded-lg"
                                alt={item.name}
                            />
                            <h3 className="text-xl font-medium text-center">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        const { results } = data;
        if (!results || results.length <= 0) return null;
        if (type === "videos") {
            return (
                <div className="py-10">
                    <div className="flex flex-col gap-10">
                        {results.slice(0, 1).map((item) => (
                            <div className="" key={item.id}>
                                <h3 className="inline-block p-3 mb-5 text-xl font-medium bg-secondary">
                                    {item.name}
                                </h3>
                                <div className="w-full aspect-video">
                                    <iframe
                                        width="1161"
                                        height="653"
                                        src={`https://www.youtube.com/embed/${item.key}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="object-fill w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (type === "similar") {
            return (
                <div className="py-10">
                    <h2 className="text-3xl font-medium">Similar Movies</h2>
                    <div className="movie-list">
                        <Swiper
                            grabCursor={true}
                            spaceBetween={40}
                            slidesPerView={"auto"}
                        >
                            {results.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieCard movie={movie}></MovieCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            );
        }
    }
    return null;
}

export default MovieDetailPage;
