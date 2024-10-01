import React, { useRef } from 'react'
import lang from '../utilis/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utilis/openai';
import { API_OPTIONS } from '../utilis/constants';
import { addGptMovieResult } from '../utilis/gptSlice';

const GptSearchbar = () => {
    const dispatch = useDispatch()
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const searchTmdbMovies = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json()
        return json.results
    };
    const handleGptSearchClick = async () => {
        const gptQuery = "act as a movie recommendation system and suggest some movies for query " + searchText.current.value + "give five movies name,comma separated as shown in example. Example result: Sholay , gadar ,3 idiots , pathan , Dunki"
        const gptResult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });
        if (!gptResult) {
            console.log('error')
        }
        const gptMovies = gptResult.choices?.[0]?.message?.content.split(',');
        const promiseArray = gptMovies.map((movie) => searchTmdbMovies(movie))
        const tmdbMovies = await Promise.all(promiseArray);
        console.log(tmdbMovies)
        dispatch(addGptMovieResult({ moviesName: gptMovies, moviesResult: tmdbMovies }))
    }
    return (
        <div className=' pt-[10%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12 ' onSubmit={(e) => e.preventDefault()}>
                <input className="m-4 p-4 col-span-9 " ref={searchText} type='text' placeholder={lang[langKey].gptSearchPlaceholder}></input>
                <button className='px-4 py-2 m-4 bg-red-600 rounded-lg col-span-3' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
            </form>
        </div>

    )
}

export default GptSearchbar