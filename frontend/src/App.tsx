import React from 'react';
import './App.css';
import Home from './Home';
import HomeContent from './HomeContent';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Authenticated from './Authenticated';
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

            <Authenticated>
              <Home/>
            </Authenticated>
       
    </div>
  );
}

export default App;
