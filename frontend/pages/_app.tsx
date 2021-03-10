import '../styles/globals.css'
import {useEffect, useState} from "react";
import fb from "../util/firebaseConfig";
import AuthContext from "../util/AuthContext";
import Head from "next/head";

function MyApp({Component, pageProps}) {
    const [sessionLoaded, toggleSessionLoaded] = useState(false)
    const [isAuthenticated, toggleAuthenticated] = useState(false)
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                setUserProfile(user)
                toggleAuthenticated(true)
                toggleSessionLoaded(true)
            } else {
                // User is signed out.
                toggleAuthenticated(false)
                setUserProfile({})
                toggleSessionLoaded(true)
            }
        });
    }, [])

    // Waits until the session is loaded before loading the page
    if (!sessionLoaded) return null

    return (<AuthContext.Provider value={{isAuthenticated, userProfile}}>
        <Head>
            <title>Grapevine</title>
        </Head>
        <Component {...pageProps} />
    </AuthContext.Provider>)
}

export default MyApp
