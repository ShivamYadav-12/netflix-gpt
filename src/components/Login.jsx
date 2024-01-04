import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utilis/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./../utilis/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utilis/userSlice';
export const Login = () => {
    const [isSignIn, setSignIn] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const name = useRef(null)
    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const handleUpClick = () => {
        const msg = checkValidData(email.current.value, password.current.value);
        setErrorMessage(msg)
        if (msg) return

        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                        navigate("/browse");
                    }).catch((error) => {
                        setErrorMessage(error.message)
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate("/browse");


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage)
                });
        }
    }
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

            <form onSubmit={(e) => { e.preventDefault(); }} className=' w-3/12 absolute my-36 mx-auto left-0 right-0   p-12 bg-black text-white '>
                <h1 className='text-3xl font-bold py-4'> {isSignIn ? "Sign In" : "Sign Up"}</h1>

                {(!isSignIn) && (<input type="text" ref={name} placeholder='Fullname' className='my-4 p-4 w-full   bg-gray-700' />)}

                <input ref={email} type="text" placeholder='Email Address' className='my-4 p-4 w-full   bg-gray-700' />

                <input ref={password} type="password" placeholder='password' className='my-4 p-4 w-full bg-gray-700' />

                <p className='text-red-700 font-bold py-2'>{errorMessage}</p>
                <button onClick={handleUpClick} type='submit' className=' bg-red-700 p-4 my-6 w-full '>{isSignIn ? "Login in" : "Sign In"}</button>

                <p className='my-2 cursor-pointer' onClick={toggleSignUp}>{isSignIn ? "New to netflix? Sign Up" : "Already Registered? Sign In"}</p>

            </form>
        </div>

    )
}
export default Login
