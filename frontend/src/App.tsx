import React from 'react';
import './App.css';
import Home from './Home';
import HomeContent from './HomeContent';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Clubs from './Clubs';
import Academics from './Academics';
import Career from './Career';
import Button from '@material-ui/core/Button';
import CSS from 'csstype';


function App() {

  const ulStyle: CSS.Properties = {
    marginTop: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
   
}
  
  return (

    <div className="App">

            <Router>
                <div style={ulStyle}>
                    <Button component={Link} to="/">Home</Button>
                    <Button component={Link} to="/Academics">Academics</Button>
                    <Button component={Link} to="/Clubs">Clubs</Button>                          
                    <Button component={Link} to="/Career">Career</Button>    
                    
                 </div>
                <Switch>
                    <Route path="/Academics">
                        <Academics/>
                    </Route>
                    <Route path="/Clubs">
                        <Clubs/>
                    </Route>
                    <Route path="/Career">
                        <Career/>
                    </Route>
                    <Route path="/">
                      <HomeContent/>
                    </Route>
                </Switch>
           </Router>
       
    </div>
  );
}

export default App;
