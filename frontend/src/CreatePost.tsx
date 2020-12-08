import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

type Props = {
    email: any
}

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

    return(
        <div>
            <input type="text" placeholder="Title" value={title} onChange={updateTitle}></input><br/>
            <input type="text" placeholder="Body" value={body} onChange={updateBody}></input><br/>
            <input type="text" placeholder="MM/DD/YY" value={date} onChange={updateDate}></input><br/>
            {email != null ? <div><Button>Post</Button> <br/></div>: <div><br/>You must sign in to post.</div>}
        </div>
    )
}

export default CreatePost;