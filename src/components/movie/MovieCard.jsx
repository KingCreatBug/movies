import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";

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

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        id: PropTypes.number,
    }),
};

function FallbackComponent() {
    return (
        <p className="text-red-400 bg-red-50">
            Something went wrong with this component
        </p>
    );
}

export default withErrorBoundary(MovieCard, {
    FallbackComponent,
});

export const MovieCardSkeleton = () => {
    return (
        <div className="flex flex-col h-full p-3 rounded-lg select-none movie-card bg-slate-800">
            <LoadingSkeleton
                width="100%"
                height="250px"
                radius="8px"
                className="mb-5"
            ></LoadingSkeleton>
            <div className="flex flex-col flex-1">
                <h3 className="mb-3 text-xl font-bold text-white">
                    <LoadingSkeleton
                        width="100%"
                        height="20px"
                    ></LoadingSkeleton>
                </h3>
                <div className="flex items-center justify-between mb-10 text-sm text-white opacity-50">
                    <span>
                        <LoadingSkeleton
                            width="50px"
                            height="10px"
                        ></LoadingSkeleton>
                    </span>
                    <span>
                        <LoadingSkeleton
                            width="50px"
                            height="10px"
                        ></LoadingSkeleton>
                    </span>
                </div>
                <LoadingSkeleton
                    width="100%"
                    height="40px"
                    radius="6px"
                ></LoadingSkeleton>
            </div>
        </div>
    );
};
