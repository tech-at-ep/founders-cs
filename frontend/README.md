# No BS Boilerplate
## Getting Started

* First, create a Firebase project in the [console](https://console.firebase.google.com/) if you haven't already done so.

* Then, create a new app inside the [Firebase Console](https://console.firebase.google.com/) and copy the credentials over to `.env` 
(copy the contents of `example.env` into a new file called `.env`).

* Run the development server to work on your site locally.
```bash
npm run dev
# or
yarn dev
```

* Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Using Firebase

To access the authentication state and the current user (if one is logged in):

- Access `isAuthenticated` and `userProfile` by using the `useContext()` hook:
```javascript
const {isAuthenticated, userProfile} = useContext(AuthContext);
```

- isAuthenticated: Boolean indicating whether there is a current user logged in.
- userProfile: the [Firebase User](https://firebase.google.com/docs/reference/js/firebase.User) object of the current user.

To use other Firebase features, access the Firebase class by importing `fb`.
- Instead of using...
```javascript
const citiesRef = firebase.firestore().collection('cities');
```
- Use this instead...
```javascript
const citiesRef = fb.firestore().collection('cities');
```
- Using `fb` instead of `firebase` will import the `Firebase` object initialized with the credentials you provided.


## Learn More

To learn more about this boilerplate, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Firebase](https://firebase.google.com/docs/auth) - documentation about Firebase products.
- [Firebase Auth](https://firebase.google.com/docs/auth) - documentation about the Firebase Authentication system.
- [Cloud Firestore](https://firebase.google.com/docs/firestore) - documentation about the Cloud Firestore database.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), a free hosting platform from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
