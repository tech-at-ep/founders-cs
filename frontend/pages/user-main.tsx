import Navbar from '../components/navbar'
import { useState, useEffect } from 'react'
import Landing from '../components/landing'
import firebase from '../util/firebaseConfig'

export default function Usermain(props) {
    // react hook to keep track of login status of user
    const [isSignedIn, setIsSignedIn] = useState(false);

    // react hooks to keep track of the loggedin user's info
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [googleId, setGoogleId] = useState("")

    //react hook to track firebase authentication
    const [user, setUser] = useState(null)


    const containerStyleString = "h-screen w-screen" + (isSignedIn ? " grid grid-rows-5" : "");
    return (<div className={containerStyleString}>
        {!isSignedIn ?
            <Landing 
                isSignedIn={isSignedIn} 
                setSignedIn={setIsSignedIn}
                setName={setName}
                setEmail={setEmail}
                setGoogleId={setGoogleId}
                setUser={setUser} />
            :
            <div className='row-start-2 m-auto font-extrabold text-4xl'> 
                <Navbar isLanding={false} isSignedIn={isSignedIn} setSignedIn={setIsSignedIn}/>
                Google Login Successful: User Main Page To Do 
            </div>
        }
    </div>)
}