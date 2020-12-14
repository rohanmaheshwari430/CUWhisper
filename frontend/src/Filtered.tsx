import Button from '@material-ui/core/Button';
import axios from 'axios';
import React, { useEffect } from 'react';
import {useState} from 'react'



type Props = {
    type: String,
    search: string,
    email: string | null
}



const Filtered = ({type, search, email}: Props) =>{

    type Post = {title: string, body: string, date: string, type: string, email?: string, id: string};


    const [posts, setPosts] = useState<readonly Post[]>([]);


    const getPosts = () => {
        fetch('/getPosts')
            .then(res => res.json())
            .then(json => setPosts(json));
        

        fetch('/getPosts')
            .then(res => res.text())
            .then(text => console.log(text))

        /*
        const res: readonly Post[] = await axios.get('/getPosts');
        setPosts(res);
        */
        
    };

    useEffect(() => getPosts());

    const deletePost = async (id: string) => {
        await axios.delete<string>('/deletePost', {data: {id: id}});
        
    }


    return(
        <div>
            {posts.map(post => 
                ((post.type===type) && 
                (post.title.toLowerCase().includes(search.toLowerCase()) || post.body.toLowerCase().includes(search.toLowerCase()))) 
                && <p key={post.title}> 
                    -----------------------------------------------------<br/>
                    Title: {post.title} <br/>
                    Date: {post.date} <br/>
                    Body: {post.body} <br/>                    
                    {email === post.email ? <div><Button onClick={() => deletePost(post.id)}>Delete</Button></div>: <span></span>}
                    -----------------------------------------------------
                </p>
            )}

        </div>
    )
}

export default Filtered;