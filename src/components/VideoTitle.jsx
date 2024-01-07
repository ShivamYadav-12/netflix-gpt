import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video pt-[20%] px-24  absolute text-white bg-gradient-to-r from-black '>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <p className='py-6 w-1/4' > {overview}</p>
            <div>
                <button className='bg-white text-black text-lg p-4 px-12 hover:bg-opacity-80 rounded-lg'>&#xe23a;Play</button>
                <button className='bg-gray-500 mx-2 text-white text-lg p-4 px-10 bg-opacity-50 rounded-lg'>More Info</button>

            </div>
        </div>
    )
}

export default VideoTitle