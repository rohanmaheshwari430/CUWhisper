import React , {useEffect, useState} from 'react';
import CSS from 'csstype';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Academics from './Academics';
import Clubs from './Clubs';
import Career from './Career';
import HomeContent from './HomeContent';
import CreatePost from './CreatePost';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import 'firebase/auth';
import { FirebaseAuth } from 'react-firebaseui';

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

function Home() {
    const ulStyle: CSS.Properties = {
        marginTop: '5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

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
            <Router>
                <div style={ulStyle}>
                    <Button component={Link} to="/">Home</Button>
                    <Button component={Link} to="/Academics">Academics</Button>
                    <Button component={Link} to="/Clubs">Clubs</Button>                          
                    <Button component={Link} to="/Career">Career</Button> 
                    <Button component={Link} to="/CreatePost">Post</Button>
                    {!user && <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>}
                    {user ? <div><Button onClick={() => firebase.auth().signOut()}>Sign Out</Button> <br/> </div> : <span></span> }
                    
                 </div>
                <Switch>
                    <Route path="/Academics">
                        <Academics
                        email={user?.email}
                        />
                    </Route>
                    <Route path="/Clubs">
                        <Clubs
                        email={user?.email}
                        />
                    </Route>
                    <Route path="/Career">
                        <Career
                        email={user?.email}
                        />
                    </Route>
                    <Route path="/CreatePost">
                        <CreatePost
                        email={user?.email}
                        />
                    </Route>
                    <Route path="/">
                      <HomeContent/>
                    </Route>
                </Switch>
           </Router>

        </div>
                       
           
       
    );
}

export default Home;