import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
//import Post from "./Post";

type Post = {title: string, body: string, date: string, type: string, email?: string | null};

type Props = {
    type: String,
    email: string | null
}






const AllPosts = ({type, email}: Props) =>{

    const [posts, setPosts] = useState<Post[]>([]);

    const getPost =() => {
        fetch('/getPosts')
        .then((res) => res.json())
        .then((json) => setPosts(json));
    };
    
    useEffect(() => getPost(), []);
    
    return(
        <div>
            {posts.map(post => (post.type===type) 
            && <p key={post.title}> 
            <div>
            -----------------------------------------------------<br/>
            Title: {post.title} <br/>
            Date: {post.date} <br/>
            Body: {post.body} <br/>
            {email === post.email ? <div><Button>Delete</Button> <br/></div>: <span></span>}
            -----------------------------------------------------
            </div>
            </p>
            )}
        </div>
    )
}

export default AllPosts;