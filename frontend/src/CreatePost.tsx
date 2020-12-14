import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
            <input type="text" placeholder="Title" value={title} onChange={updateTitle}></input><br/>
            <input type="text" placeholder="Body" value={body} onChange={updateBody}></input><br/>
            <input type="text" placeholder="MM/DD/YY" value={date} onChange={updateDate}></input><br/>

            {email != null ? <div><br/>Post to...<br/></div>: <div><br/>You must sign in to post.</div>}

            {email != null ? <div><Button onClick={()=>createPost(title, body, date, "Academics", email, tempID)}>Academics</Button> </div>: <div></div>}
            {email != null ? <div><Button onClick={()=>createPost(title, body, date, "Career", email, tempID)}>Career</Button> </div>: <div></div>}
            {email != null ? <div><Button onClick={()=>createPost(title, body, date, "Clubs", email, tempID)}>Clubs</Button> </div>: <div></div>}
        </div>
    )
}

export default CreatePost;