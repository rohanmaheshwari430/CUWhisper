import React ,{useState, useEffect} from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

const firebaseConfig = {
    apiKey: "AIzaSyATIHZ0wJeVVoWfAsTj7Ym4-eCIBJ74neQ",
    authDomain: "cuwhisper.firebaseapp.com",
    databaseURL: "https://cuwhisper.firebaseio.com",
    projectId: "cuwhisper",
    storageBucket: "cuwhisper.appspot.com",
    messagingSenderId: "1011031731066",
    appId: "1:1011031731066:web:a106e40a551d641b25c4c3"
  };

  firebase.initializeApp(firebaseConfig);

type Props = {
    children: React.ReactNode;
}

const Authenticated = ({children}: Props) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    const onAuthStateChange = () => {
        return firebase.auth().onAuthStateChanged(user  => {
            setUser(user);
        })
    }

    useEffect(() => onAuthStateChange(), []);

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }

    return (
        <div>
            {user && children}
            {!user && <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>}
        </div>
    );
}


export default Authenticated;