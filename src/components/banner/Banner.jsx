import useSWR from "swr";
import fetcher, { tmdbAPI } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const { data, error, isLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=43ebbabb35f6051bc03db38a21f4171c`,
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
        <section className="banner h-[400px] page-container mb-20 overflow-hidden">
            <Swiper grabCursor={true} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <BannerItem movie={movie}></BannerItem>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};

function BannerItem({ movie }) {
    const { backdrop_path, title, id } = movie;
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-full rounded-lg">
            <div className="absolute inset-0 rounded-lg overlay from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] bg-gradient-to-t"></div>
            <img
                className="object-cover w-full h-full rounded-lg"
                src={tmdbAPI.imageOriginal(backdrop_path)}
                alt=""
            />
            <div className="absolute w-full text-white left-5 bottom-5">
                <h2 className="mb-5 text-3xl font-bold">{title}</h2>
                <div className="flex items-center mb-8 gap-x-3">
                    <span className="px-4 py-2 border border-white rounded-md">
                        Adventure
                    </span>
                    <span className="px-4 py-2 border border-white rounded-md">
                        Adventure
                    </span>
                    <span className="px-4 py-2 border border-white rounded-md">
                        Adventure
                    </span>
                </div>
                <Button
                    onClick={() => navigate(`/movie/${id}`)}
                    className="font-medium "
                >
                    Watch Now
                </Button>
            </div>
        </div>
    );
}

export default Banner;
