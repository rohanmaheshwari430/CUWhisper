import React from 'react';
import CSS from 'csstype';
import cornell_logo from './cornell_logo.png';
import whisperlogo from './whisperlogo.png';
import Authenticated from './Authenticated';
import 'firebase'
import 'firebase/auth';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';

function HomeContent() {

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
        float: 'left',
        marginLeft: '2rem',
        marginTop: '5rem'
    }

    const ulStyle: CSS.Properties = {
        marginTop: '5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
       
    }

return (
    
        <div>
        <h1 style={titleStyle}>CUWhisper</h1>
        <Button>Sign in</Button> <br/>
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



