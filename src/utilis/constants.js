export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_API_KEY
    }
};
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANG = [{ identifer: "en", name: "English" }, { identifer: "hindi", name: "Hindi" }, { identifer: "spanish", name: "Spanish" }]