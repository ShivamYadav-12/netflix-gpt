import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../utilis/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utilis/userSlice';
import { toggleGptSearchView } from '../utilis/gptSlice';
import { SUPPORTED_LANG } from '../utilis/constants';
import { changeLang } from '../utilis/configSlice';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
    const handleSignOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            navigate("/error")
        });

    };

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                navigate("/browse")

            } else {
                dispatch(removeUser());
                navigate("/")

            }
        });
        // unsubscribe when component unmount
        return () => unsubscribe
    }, []);
    const handleGptSearchClick = () => {
        console.log("first")
        dispatch(toggleGptSearchView())
    };
    const handleLangChanges = (e) => {
        dispatch(changeLang(e.target.value))
        console.log(e.target.value)
    }
    return (

        <div className="absolute  flex w-screen px-8 py-2 bg-gradient-to-b from-black  z-10 justify-between ">
            <img className='w-44' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
                alt='logo' />

            {user && <div className='flex p-2'>
                {showGptSearch && <select className='p-2 m-2 bg-gray-900 text-white ' onChange={handleLangChanges}>
                    {SUPPORTED_LANG.map(lang => <option value={lang.identifer} key={lang.identifer}> {lang.name}</option>)}
                </select>}
                <button className='px-4  py-2 bg-purple-800 text-white mx-4 my-2  rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" : "GPT-Search"}</button>
                <img
                    className='w-12 h-12'
                    src={user?.photoURL}

                    alt="userIcon" />
                <button
                    className='font-bold text-white' onClick={handleSignOut}>(Signout)</button>
            </div>}

        </div>



    )
}

export default Header