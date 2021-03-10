import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import fb from "../util/firebaseConfig";

export default function Home() {
    // Store page data in state
    const [listData, setListData] = useState([]);

    // Use state to keep track of loading state
    const [isLoading, toggleLoading] = useState(false);

    // Data fetching should be done inside a useEffect hook
    useEffect(() => {
        // Reference to the Firestore collection/doc
        // Read more here: https://firebase.google.com/docs/firestore/query-data/listen
        const toDosCollection = fb.firestore().collection('todos')

        // Add a listener on the "todos" collection
        // This will call setListData() whenever the data changes
        toDosCollection.onSnapshot(snapshot => {
            const items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setListData(items)
        })
    }, [])

    // Adds a document into Firestore
    const insertDocument = (event) => {
        event.preventDefault();

        // Set loading state to `true` before inserting into Firestore
        toggleLoading(true);
        const toDosCollection = fb.firestore().collection('todos')
        toDosCollection.add({
            content: event.target.content.value
        })
            .then(() => {
                toggleLoading(false) // set loading state to `false` when promise is fulfilled
                event.target.reset(); // clear form
            })
            .catch(() => alert("There was a problem adding the doc to Firestore!"));
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <a href="https://firebase.google.com/docs/firestore/quickstart">Cloud Firestore</a>
                </h1>

                <p className={styles.description}>
                    See how this example works at{' '}
                    <code className={styles.code}>pages/firestore.tsx</code>
                </p>

                <div>
                    <ul>
                        {listData.map(item => <li key={item.id} className={styles.toDoItem}>{item.content}</li>)}
                    </ul>
                </div>

                <form onSubmit={insertDocument}>
                    <input required id="content" placeholder="Enter text here" className={styles.toDoInput}/>
                    <button type="submit" className={styles.toDoButton}>Add</button>
                </form>

            </main>
        </div>
    )
}
