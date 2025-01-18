import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "swiper/scss";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPageV2 = lazy(() => import("./pages/MoviesPageV2"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));

function App() {
    return (
        <>
            <Suspense fallback={<></>}>
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
                            element={<MoviesPageV2></MoviesPageV2>}
                        ></Route>
                        <Route
                            path="/movie/:movieId"
                            element={<MovieDetailPage></MovieDetailPage>}
                        ></Route>
                        <Route path="*" element={<>Not found</>}></Route>
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
