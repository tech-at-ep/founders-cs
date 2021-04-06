import { useState} from 'react'
import Link from 'next/link'
import Navbar from './navbar'
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login';
import firebase from '../util/firebaseConfig'
import Onboarding from 'react-onboarding-pro';
import "react-onboarding-pro/build/index.css";

let userInfo = {
  FirstName: "",
  LastName: "",
  Concentration: "",
  Year: "",
  Status: 0,
  Link1: "",
  Link2: "",
  Link3: "",
  Photo: "",
  Resume: "",
  Question1: "",
  Question2: "",
  Question3: ""
}

export default function Landing(props) {

  /**
   * Hanlder method for login functionality
   * @param {json} response Response returned by Google upon login request.
   */
  const loginGoogle = (response) => {
    if (response["tokenId"] != undefined) {
      console.log("Successfully logged in via Google")
      props.setSignedIn(true)
      let profileObj = response["profileObj"]
      let name = profileObj["name"]
      let email = profileObj["email"]
      let googleId = profileObj["googleId"]
      props.setName(name); props.setEmail(email); props.setGoogleId(googleId);
      console.log(response["profileObj"])
    }
    else {
      alert("Google login unsuccessful. Please make sure that you are using an @brown.edu email.")
    }

  }

  /* ---------------- alternative solution to loggin in ------------------- */

  /**
   * Function to handle login to firebase via Google. The hosted domain
   * is restricted to @brown.edu. Any newly logged in user is automatically
   * added to the firebase users
   */
  const googleAuthFirebase = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) // persistence settings are NONE, LOCAL, or SESSION
        .then(() => {
          // provider object to help with firebase authentication
          const provider = new firebase.auth.GoogleAuthProvider();
          provider.setCustomParameters({
            'hd': 'brown.edu'
          });
          return firebase.auth().signInWithPopup(provider)
              .then((result) => {
                // make sure that @brown.edu was used
                if(result["additionalUserInfo"]["profile"]["hd"] === "brown.edu") {
                  var credential = result.credential
                  var user = result.user
                  // set the hooks for the user main page
                  props.setGoogleId(user.uid)
                  props.setEmail(user.email)
                  props.setName(user.name)
                  props.setSignedIn(true)
                  props.setUser(user)
                } else {
                  alert("Login Unsuccessful. Please make sure that you are using an @brown.edu email")
                }
              }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
              })
        });
  }


  function checkLoginStatus() {
    if(firebase.auth().currentUser != null){
      var user = firebase.auth().currentUser;
      // set the hooks for the user main page
      props.setGoogleId(user.uid)
      props.setEmail(user.email)
      props.setName(user.name)
      props.setSignedIn(true)
      props.setUser(user)
    }
  }

  function submitName() {
    let input = document.getElementsByClassName("rop-input");
    userInfo["FirstName"] = input[0].value;
    userInfo["LastName"] = input[1].value;
    userInfo["Concentration"] = input[2].value;
    userInfo["Year"] = input[3].value;
    
  }

  function submitStatus() {
    let input = document.getElementsByClassName("rop-input");
    if(input[0].checked === true) {
      userInfo["Status"] = true;
    } else {
      userInfo["Status"] = false;
    }
  }

  function submitLinks() {
    let input = document.getElementsByClassName("rop-input");
    userInfo["FirstLink"] = input[0].value;
    userInfo["SecondLink"] = input[1].value;
    userInfo["ThirdLink"] = input[2].value;
    console.log(userInfo);  
  }

  function submitFiles() {

  }

  function submitQuestions() {

  }

  // Config for the onboarding flow
const config = {
  steps: [
    {
      title: 'Welcome to BrunoBeyond',
      description: 'Let\'s get you signed up.'
    },
    {
      title: 'Who are you?',
      description: 'Help the community identify you',
      type: 'form', // Have an embedded form
      fields: [
        {
          label: 'First Name',
          name: 'first_name',
          type: 'text',
          placeholder: 'John',
          validation: '[a-zA-Z]' // Regex expression to test for
        },
        {
          label: 'Last Name',
          name: 'last_name',
          type: 'text',
          placeholder: 'Doe',
          validation: '[a-zA-Z]'
        },
        {
          label: 'Concentration',
          name: 'concentration',
          type: 'text',
          placeholder: 'Computer Science',
          validation: '[a-zA-Z]'
        },
        {
          label: 'Graduation Year',
          name: 'year',
          type: 'year',
          placeholder: '2023',
          validation: '(?:(?:20)[0-9][0-9])$'
        },
      ],
      onSubmit: submitName // Function to be called when the form is submitted
    },
    {
      title: 'Why are you using this website?',
      description: 'Let us know what you\'re looking for',
      type: 'form', // Have an embedded form
      fields: [
        {
          label: 'I am currently searching for an opportunity',
          name: 'status',
          type: 'radio',
          defaultChecked: false,
          validation: '' // Regex expression to test for
        },
        {
          label: 'I am looking to network',
          name: 'status',
          type: 'radio',
          defaultChecked: false,
          validation: '' // Regex expression to test for
        }
      ],
      onSubmit: submitStatus // Function to be called when the form is submitted
    },
    {
      title: 'Do you have any personal links?',
      description: 'Drop your LinkedIn, Portfolio, etc.',
      type: 'form', // Have an embedded form
      fields: [
        {
          label: 'First Link',
          name: 'first_link',
          type: 'text',
          placeholder: 'https://your-link-here.com',
          validation: '' // Regex expression to test for
        },
        {
          label: 'Second Link',
          name: 'second_link',
          type: 'text',
          placeholder: 'https://your-link-here.com',
          validation: ''
        },
        {
          label: 'Third Link',
          name: 'third_link',
          type: 'text',
          placeholder: 'https://your-link-here.com',
          validation: ''
        },
      ],
      onSubmit: submitLinks // Function to be called when the form is submitted
    },
    {
      title: 'Upload your files',
      description: 'A nice photo and your resume will do',
      type: 'form', // Have an embedded form
      fields: [
        {
          label: 'Photo',
          name: 'photo',
          type: 'file',
          validation: '' // Regex expression to test for
        },
        {
          label: 'Resume',
          name: 'resume',
          type: 'file',
          validation: ''
        }
      ],
      onSubmit: submitFiles // Function to be called when the form is submitted
    },
    {
      title: 'More about you',
      description: 'Tell us just a little more',
      type: 'form', // Have an embedded form
      fields: [
        {
          label: 'Photo',
          name: 'photo',
          type: 'text',
          validation: '' // Regex expression to test for
        }
      ],
      onSubmit: submitQuestions // Function to be called when the form is submitted
    },
    {
      title: 'Thanks!',
      description: 'You\'re all set!'
    },
  ],
  overlayClose: false // Should enable closing the popup when the overlay is clicked
};


  checkLoginStatus()
  return (<div className="h-full w-screen grid grid-rows-5">
    <Navbar isLanding={true} />
    <div id='landing-text-wrapper' className='row-start-2 m-auto font-extrabold text-4xl'>
      Landing Page To Do
    </div>
    <div id='landing-button-wrapper' className='row-start-3 flex grid justify-center'>
      <div id='google-oauth' className="inline grid items-center">
      {!props.isSignedIn ? <div className={'inline font-bold '}>
        <button onClick={() => googleAuthFirebase()}>Login via Google</button>
        <button onClick={() => {
          // Display popup
          Onboarding(config);
        }}>Onboarding Flow</button>
            </div> : <div/>}
      </div>

    </div>

  </div>)
}