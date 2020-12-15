import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CSS from 'csstype';
import { TextField } from '@material-ui/core';

type Props = {
    email: any
}

type Post = {
    readonly title: string;
    readonly body: string;
    readonly date: string;
    readonly type: string;
    readonly email: string;
    readonly id: string;
  };

function CreatePost({email}: Props){

    const ulStyle: CSS.Properties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [date, setDate] = useState("");
    
    const updateTitle=(event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.currentTarget.value;
        setTitle(newTitle);
        
    }
    const updateBody=(event: React.ChangeEvent<HTMLInputElement>) => {
        const newBody = event.currentTarget.value;
        setBody(newBody);
    }
    const updateDate=(event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.currentTarget.value;
        setDate(newDate);
    }



    //function to call create post (takes in title, body, date) 
    const tempID: string = "-1"

    const createPost= async (title: string, body: string, date: string, type: string, email: string, id: string) =>{
        const postBody: Post = {title, body, date, type, email, id};
        const newPost = await axios.post<string>('/createPost', postBody);
    }

    return(
        <div>
            <div>
                <br/>
                <TextField  id="filled-basic" style={{width: 500}} size="small" label="Title" variant="filled" value={title} onChange={updateTitle}></TextField> <br/> <br/>
                <TextField id="standard-multiline-flexible" style={{width: 500}} size="medium" label="Body" multiline rows={4} defaultValue="Default Value" value={body} onChange={updateBody} variant="filled" /> <br/> <br/>
                <TextField id="filled-basic" size="small"  label="MM/DD/YY" variant="filled" value={date} onChange={updateDate}></TextField> <br/>   
            </div>

            {email != null ? <div><br/>Post to...<br/></div>: <div><br/>You must sign in to post.</div>}
            <div style={ulStyle}>
            {email != null ? <div><Button onClick={()=>createPost(title, body, date, "Academics", email, tempID)}>Academics</Button> </div>: <div></div>}
            {email != null ? <div><Button onClick={()=>createPost(title, body, date, "Clubs", email, tempID)}>Clubs</Button> </div>: <div></div>}
            {email != null ? <div><Button onClick={()=>createPost(title, body, date, "Career", email, tempID)}>Career</Button> </div>: <div></div>}
            </div>
            
            
        </div>
    )
}

export default CreatePost;