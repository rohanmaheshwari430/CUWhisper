import React from 'react';
import CSS from 'csstype';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Academics from './Academics';
import Clubs from './Clubs';
import Career from './Career';
import Button from '@material-ui/core/Button';

function Home() {


    const ulStyle: CSS.Properties = {
        marginTop: '5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
       
    }



    return (
        <div>
            
            <Router>
                <div style={ulStyle}>
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
                </Switch>
           </Router>

            

          
       
        </div>
                       
           
       
    );
}

export default Home;