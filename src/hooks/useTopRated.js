import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utilis/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utilis/constants";


const useTopRated = () => {
    const dispatch = useDispatch()
    const getTopRated = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addTopRatedMovies(json.results))
    };

    useEffect(() => {
        getTopRated();
    }, []);
}
export default useTopRated;