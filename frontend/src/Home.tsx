import React from 'react';
import CSS from 'csstype';
import cornell_logo from './cornell_logo.png';
import whisperlogo from './whisperlogo.png';

function Home() {

    const titleStyle: CSS.Properties = {
        color: 'red',
        fontFamily:'cursive',
        textAlign: 'center',
        fontSize: '3rem'
    }

    const logoStyle: CSS.Properties = {
        float: 'left',
        margin: '10rem',
        marginLeft: '30rem',
    }

    const whisperLogoStyle: CSS.Properties = {
        float: 'right',
        marginLeft: '7.5rem',
        marginTop: '5rem'
    }

    const buttonStyle: CSS.Properties = {
        marginBottom: '1rem',
      
    }

    return (
        
        <div>
            <h1 style={titleStyle}>CUWhisper</h1>
            <body>
                Welcome to CUWhisper! This is an interactive and anonymous forum
                where fellow Cornellians can help and learn from each other regarding
                the many opportunities, resources, and events that are available on campus. 
            </body>
            <div >
             <img style={logoStyle} src={cornell_logo} alt=""/>
             <img style={whisperLogoStyle} src={whisperlogo} alt=""/>
            </div>

            <div>
                <button style={buttonStyle}>Academics</button>  
            </div>
           

            
 
        </div>

       
    );
}

export default Home;