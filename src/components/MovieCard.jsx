import React from 'react'
import { IMAGE_URL } from '../utilis/constants'

const MovieCard = ({ PosterPath }) => {

    return (
        <div className='w-48 pr-4'>
            <img alt="movie card" src={IMAGE_URL + PosterPath} />
        </div>
    )
}
export default MovieCard