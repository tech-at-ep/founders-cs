import { GoogleLogout } from 'react-google-login'; 
import Link from "next/link";
import firebase from '../util/firebaseConfig'

export default function Navbar({ isLanding, isSignedIn, setSignedIn }) {
    // The className string used to style links in the Navbar
    const linkStyling = `text-gray-500 hover:text-red-600 focus:text-red-500 ${!isLanding && "hidden sm:inline"}`

    /**
     * Handler for logout functionality.
     * @param {json} response The response returned by Google upon logout request.
     */
    const logoutGoogle = () => {
        firebase.auth().signOut().then(function() {
            console.log("Sign-out successful.")
            setSignedIn(false)
            // TODO: Figure out how to overwrite auth persistence
            }, function(error) {
            console.log(error)
        })
    }

    return <div className="absolute top-0 right-0 p-4 w-full flex justify-between 
                            items-center font-display bg-white z-50">
        <Link href="/" as={`/`}>
            <a className="font-semibold text-gray-700 text-xl">
                Grapevine
            </a>
        </Link>
        <div className="space-x-4 md:space-x-6">
            <Link href="/about" as={`/about`}>
                <a className={linkStyling}>About</a>
            </Link>
            {/* render the logout button if user is signedin */}
            {isSignedIn ? <div className={'inline font-bold ' + linkStyling}>
                <button onClick={() => logoutGoogle()}> Logout </button>
            </div> : <div/>}
        </div>

    </div>
}