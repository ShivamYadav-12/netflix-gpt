import React, { useState } from 'react'
import Header from './Header'

export const Login = () => {
    const [isSignIn, setSignIn] = useState(true)
    const toggleSignUp = () => {
        setSignIn(!isSignIn);

    }
    return (
        <div className='relative'>

            <Header />
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/cf244808-d722-428f-80a9-052acdf158ec/IN-en-20231106-popsignuptwoweeks-perspective_alpha_website_large.jpg'
                    alt='logo' />
            </div>

            <form className=' w-3/12 absolute my-36 mx-auto left-0 right-0   p-12 bg-black text-white '>
                <h1 className='text-3xl font-bold py-4'> {isSignIn ? "Sign In" : "Sign Up"}</h1>

                {(!isSignIn) && (<input type="text" placeholder='Fullname' className='my-4 p-4 w-full   bg-gray-700' />)}

                <input type="text" placeholder='Email Address' className='my-4 p-4 w-full   bg-gray-700' />

                <input type="password" placeholder='password' className='my-4 p-4 w-full bg-gray-700' />


                <button type='submit' className=' bg-red-700 p-4 my-6 w-full '>{isSignIn ? "Login in" : "Sign In"}</button>

                <p className='my-2 cursor-pointer' onClick={toggleSignUp}>{isSignIn ? "New to netflix? Sign Up" : "Already Registered? Sign In"}</p>

            </form>
        </div>

    )
}
export default Login
