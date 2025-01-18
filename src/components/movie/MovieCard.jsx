import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config";

const MovieCard = ({ movie }) => {
    const { title, poster_path, vote_average, release_date, id } = movie;
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full p-3 rounded-lg select-none movie-card bg-slate-800">
            <img
                className="w-full h-[250px] object-cover rounded-lg mb-3"
                src={tmdbAPI.image500(poster_path)}
                alt=""
            />
            <div className="flex flex-col flex-1">
                <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
                <div className="flex items-center justify-between mb-10 text-sm text-white opacity-50">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span>{vote_average}</span>
                </div>
                <Button
                    bgColor="secondary"
                    onClick={() => navigate(`/movie/${id}`)}
                    full
                >
                    What now
                </Button>
            </div>
        </div>
    );
};

export default MovieCard;
