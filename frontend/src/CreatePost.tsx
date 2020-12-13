import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

type Props = {
    email: any
}

type Song = {
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
    const [posts, setPosts] = useState("");
    
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
    const updatePosts=(event: React.ChangeEvent<HTMLInputElement>) => {
        const newPost = event.currentTarget.value;
        setPosts(newPost);
    }

    //function to call create post (takes in title, body, date) 
    const tempID: string = "-1"

    const createPost= async (title: string, body: string, date: string, type: string, email: string, id: string) =>{
        const postBody: Song = {title, body, date, type, email, id};
        const newPost = await axios.post<string>('/createPost', postBody);
       // setPosts([...posts, {title, body, date, type, email, id}]);
    }


    /*
    const createPostCareer= {
        //call createPost(title, body, date, type: career)
    }

    const createPostClubs = {
        // call createPost(title, body, date, type: clubs)
    }
    */

    return(
        <div>
            <input type="text" placeholder="Title" value={title} onChange={updateTitle}></input><br/>
            <input type="text" placeholder="Body" value={body} onChange={updateBody}></input><br/>
            <input type="text" placeholder="MM/DD/YY" value={date} onChange={updateDate}></input><br/>

            {email != null ? <div>Post to...<br/></div>: <div><br/>You must sign in to post.</div>}

            {email != null ? <div><Button onClick={createPost(title, body, date, "Academics", email, "-1")}>Academics</Button> <br/></div>: <div></div>}
            {email != null ? <div><Button>Career</Button> <br/></div>: <div></div>}
            {email != null ? <div><Button>Clubs</Button> <br/></div>: <div></div>}

        </div>
    )
}

export default CreatePost;