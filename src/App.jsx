import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import Banner from "./components/banner/Banner";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
    return (
        <>
            <Routes>
                <Route element={<Main></Main>}>
                    <Route
                        path="/"
                        element={
                            <>
                                <>
                                    <Banner></Banner>
                                    <HomePage></HomePage>
                                </>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/movies"
                        element={<MoviesPage></MoviesPage>}
                    ></Route>
                    <Route
                        path="/movie/:movieId"
                        element={<MovieDetailPage></MovieDetailPage>}
                    ></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
