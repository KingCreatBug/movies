const fetcher = (...args) => fetch(...args).then((res) => res.json());
const apiKey = "43ebbabb35f6051bc03db38a21f4171c";
const tmdbEndPoint = `https://api.themoviedb.org/3/movie`;
const tmdbEndPointSearch = `https://api.themoviedb.org/3/search/movie`;
const tmdbAPI = {
    getMovieList: (type, page = 1) =>
        `${tmdbEndPoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetail: (movieId) => `${tmdbEndPoint}/${movieId}?api_key=${apiKey}`,
    getMovieMeta: (movieId, type) =>
        `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
    getMovieSearch: (query, page) =>
        `${tmdbEndPointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};

export default fetcher;
export { apiKey, tmdbAPI };
