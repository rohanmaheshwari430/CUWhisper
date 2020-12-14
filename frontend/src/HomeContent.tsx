import React from 'react';
import CSS from 'csstype';
import cornell_logo from './cornell_logo.png';
import whisperlogo from './whisperlogo.png';
import 'firebase'
import 'firebase/auth';
function HomeContent() {


    const logoStyle: CSS.Properties = {
        float: 'left',
        margin: '10rem',
        marginLeft: '30rem',
    }

    const whisperLogoStyle: CSS.Properties = {
        float: 'left',
        marginLeft: '2rem',
        marginTop: '5rem'
    }

return (
    
        <div>
            <br/>
        <body>
            Welcome to CUWhisper! This is an interactive and anonymous forum
            where fellow Cornellians can help and learn from each other regarding
            the many opportunities, resources, and events that are available on campus. 
        </body>
        <div >
        <img style={logoStyle} src={cornell_logo} alt=""/>
        <img style={whisperLogoStyle} src={whisperlogo} alt=""/>
        </div>
    </div>
    
    

    );
}

export default HomeContent;



