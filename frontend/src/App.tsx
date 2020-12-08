import React from 'react';
import './App.css';
import Home from './Home';
import CSS from 'csstype';


function App() {

  const titleStyle: CSS.Properties = {
    color: 'red',
    fontFamily:'cursive',
    textAlign: 'center',
    fontSize: '3rem'
}

  
  return (

    <div className="App">
          <h1 style={titleStyle}>CUWhisper</h1>
              <Home/>
    </div>
  );
}

export default App;
