import MovieList from "../components/movie/MovieList";

const HomePage = () => {
    return (
        <>
            {/* Movies list */}
            <section className="pb-20 movies-layout page-container">
                <h2 className="mb-10 text-3xl font-bold text-white capitalize">
                    Now playing
                </h2>
                <MovieList></MovieList>
            </section>

            {/* Top rated */}
            <section className="pb-20 movies-layout page-container">
                <h2 className="mb-10 text-3xl font-bold text-white capitalize">
                    Top rated
                </h2>
                <MovieList type="top_rated"></MovieList>
            </section>

            {/* Trending */}
            <section className="pb-20 movies-layout page-container">
                <h2 className="mb-10 text-3xl font-bold text-white capitalize">
                    Trending
                </h2>
                <MovieList type="popular"></MovieList>
            </section>
        </>
    );
};

export default HomePage;
